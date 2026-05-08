"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** Sharp 4096×2048 day texture when GPU cap is 4096–8192 (HD NASA would be clamped / invalid). */
const EARTH_MAP_4K =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r170/examples/textures/planets/earth_day_4096.jpg";
const EARTH_MAP_FALLBACK =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r170/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_NORMAL =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r170/examples/textures/planets/earth_normal_2048.jpg";
/** R=bump G=roughness B=cloud mask — same encoding as three.js `webgpu_tsl_earth` (4096², sharp clouds). */
const EARTH_BUMP_ROUGHNESS_CLOUDS =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r170/examples/textures/planets/earth_bump_roughness_clouds_4096.jpg";
const EARTH_CLOUDS_FALLBACK =
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r170/examples/textures/planets/earth_clouds_1024.png";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function configureTexture(
  tex: THREE.Texture,
  maxAniso: number,
  colorSpace: THREE.ColorSpace,
) {
  tex.colorSpace = colorSpace;
  tex.anisotropy = maxAniso;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
}

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

async function createGrayscaleCanvasTexture(
  src: HTMLImageElement,
  maxAniso: number,
): Promise<THREE.CanvasTexture> {
  const canvas = document.createElement("canvas");
  const w = src.naturalWidth || src.width;
  const h = src.naturalHeight || src.height;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");
  ctx.drawImage(src, 0, 0, w, h);
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i] / 255;
    const g = d[i + 1] / 255;
    const b = d[i + 2] / 255;
    // Luminance + a touch of “ceramic” lift/contrast.
    const lum = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const boosted = clamp01(lum * 1.18 + 0.05);
    const out = Math.round(boosted * 255);
    d[i] = out;
    d[i + 1] = out;
    d[i + 2] = out;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  configureTexture(tex, maxAniso, THREE.SRGBColorSpace);
  return tex;
}

/** Linear data map (packed channels); strong aniso keeps grazing angles cleaner without huge blur. */
function configureDataTexture(tex: THREE.Texture, maxAniso: number) {
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = maxAniso;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
}

function loadTexture(
  loader: THREE.TextureLoader,
  url: string,
  maxAniso: number,
  colorSpace: THREE.ColorSpace,
): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (tex) => {
        configureTexture(tex, maxAniso, colorSpace);
        resolve(tex);
      },
      undefined,
      () => reject(new Error(`texture failed: ${url}`)),
    );
  });
}

function loadDataTexture(
  loader: THREE.TextureLoader,
  url: string,
  maxAniso: number,
): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (tex) => {
        configureDataTexture(tex, maxAniso);
        resolve(tex);
      },
      undefined,
      () => reject(new Error(`texture failed: ${url}`)),
    );
  });
}

function diffuseUrlsForGpu(maxTextureSize: number): string[] {
  const out: string[] = [];
  if (maxTextureSize >= 4096) out.push(EARTH_MAP_4K);
  out.push(EARTH_MAP_FALLBACK);
  return out;
}

function getGlobePixelRatio(reduceMotion: boolean): number {
  const dpr = window.devicePixelRatio || 1;
  if (reduceMotion) return Math.min(dpr, 1.5);
  if (window.matchMedia("(pointer: coarse)").matches) return Math.min(dpr, 2);
  /* Desktops / trackpads: a bit above 2× helps crawl the “screen door” on large globes. */
  return Math.min(dpr, 2.75);
}

export function HomeGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const reduceMotionRef = useRef(false);
  const [globeReady, setGlobeReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setGlobeReady(false);
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100,
    );
    camera.position.z = 3.65;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    const resizeRenderer = () => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      renderer.setPixelRatio(getGlobePixelRatio(reduceMotionRef.current));
      renderer.setSize(w, h);
    };

    resizeRenderer();
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.88;
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.background = "transparent";
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.zIndex = "0";
    container.prepend(canvas);

    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    // Environment map for metallic/studio look (used in light mode).
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const ambient = new THREE.AmbientLight(0xffffff, 0.22);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xfff5e8, 1.05);
    key.position.set(4, 2.2, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xa8c8ff, 0.36);
    rim.position.set(-3.5, -1.2, -4);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0x456090, 0.14);
    fill.position.set(0, -2, 6);
    scene.add(fill);

    const group = new THREE.Group();
    group.scale.setScalar(0.88);
    scene.add(group);

    const geometry = new THREE.SphereGeometry(1, 144, 144);
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    let disposed = false;

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.52,
      metalness: 0.06,
      clearcoat: 0.28,
      clearcoatRoughness: 0.42,
      envMapIntensity: 0,
      normalScale: new THREE.Vector2(0.32, 0.32),
    });

    // Light mode: metallic studio render (still grayscale via map swap).
    const lightMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.22,
      metalness: 0.9,
      clearcoat: 0.62,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.35,
      normalScale: new THREE.Vector2(0.45, 0.45),
      transparent: true,
      opacity: 0.82,
    });

    let themeUniform: { value: number } | null = null;
    let desiredLightTheme = false;
    let diffuseOriginal: THREE.Texture | null = null;
    let diffuseGray: THREE.Texture | null = null;

    const syncDiffuseMapToTheme = () => {
      if (desiredLightTheme) {
        if (diffuseGray) material.map = diffuseGray;
        else if (diffuseOriginal) material.map = diffuseOriginal;
        lightMaterial.map = diffuseGray ?? diffuseOriginal ?? null;
      } else {
        // Dark mode is a black-metal render: avoid the colorful diffuse texture.
        material.map = null;
        lightMaterial.map = diffuseGray ?? diffuseOriginal ?? null;
      }
      material.needsUpdate = true;
      lightMaterial.needsUpdate = true;
    };

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uLightTheme = { value: 0 };
      themeUniform = shader.uniforms.uLightTheme as { value: number };
      themeUniform.value = desiredLightTheme ? 1 : 0;
      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",
        `
        uniform float uLightTheme;
        void main() {`,
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <opaque_fragment>",
        `
        if (uLightTheme < 0.5) {
          vec3 alb = diffuseColor.rgb;
          float ocean = smoothstep(0.035, 0.2, alb.b - alb.r)
            * smoothstep(-0.02, 0.14, alb.b - alb.g * 0.92);
          vec3 waterTone = vec3(0.62, 0.7, 0.8);
          outgoingLight *= mix(vec3(1.0), waterTone, ocean * 0.78);
        }
        #include <opaque_fragment>`,
      );

      // After lighting, push a bright modern grayscale look in light mode.
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <dithering_fragment>",
        `
        if (uLightTheme > 0.5) {
          // Bright “ceramic” grayscale base (reference-like: white/light-grey).
          float lum = dot(outgoingLight, vec3(0.2126, 0.7152, 0.0722));
          vec3 baseWhite = vec3(0.95);
          vec3 ceramic = mix(baseWhite, vec3(lum), 0.20);

          // Stylized outlines + subtle grid.
          float outline = 0.0;
          #ifdef USE_MAP
            // MeshPhysicalMaterial uses vMapUv (not vUv).
            vec2 uv = vMapUv;
            vec2 dx = dFdx(uv);
            vec2 dy = dFdy(uv);
            float c = texture2D(map, uv).r;
            float cx = texture2D(map, uv + dx * 2.0).r;
            float cy = texture2D(map, uv + dy * 2.0).r;
            float e = abs(c - cx) + abs(c - cy);
            outline = smoothstep(0.025, 0.11, e);
          #endif

          float grid = 0.0;
          #ifdef USE_MAP
            float u = uv.x;
            float v = uv.y;
            float gu = 1.0 - smoothstep(0.0, 0.06, abs(fract(u * 18.0) - 0.5));
            float gv = 1.0 - smoothstep(0.0, 0.06, abs(fract(v * 9.0) - 0.5));
            grid = max(gu, gv) * 0.12;
          #endif

          vec3 ink = vec3(0.18);
          vec3 styled = ceramic;
          styled = mix(styled, ink, outline * 0.85);
          styled = mix(styled, vec3(0.72), grid);

          outgoingLight = clamp(styled * 1.14 + vec3(0.03), 0.0, 0.998);
        }
        #include <dithering_fragment>`,
      );
    };
    material.customProgramCacheKey = () => "globe-ocean-darken-v3-gray";

    const earth = new THREE.Mesh(geometry, material);
    group.add(earth);

    const cloudGeo = new THREE.SphereGeometry(1.012, 144, 144);
    const sunDir = new THREE.Vector3(4, 2.2, 5).normalize();
    const cloudMat = new THREE.ShaderMaterial({
      uniforms: {
        cloudMap: { value: null as THREE.Texture | null },
        uOpacity: { value: 0.72 },
        uUsePacked: { value: 1 },
        sunDirection: { value: sunDir.clone() },
      },
      transparent: true,
      depthWrite: false,
      toneMapped: true,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        void main() {
          vUv = uv;
          vNormalWorld = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D cloudMap;
        uniform float uOpacity;
        uniform float uUsePacked;
        uniform vec3 sunDirection;
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        void main() {
          vec4 samp = texture2D(cloudMap, vUv);
          float lum = dot(samp.rgb, vec3(0.299, 0.587, 0.114));
          float mask = uUsePacked > 0.5
            ? smoothstep(0.17, 0.94, samp.b)
            : smoothstep(0.03, 0.92, max(lum, samp.a));
          if (mask < 0.008) discard;
          float lit = max(0.42, dot(vNormalWorld, normalize(sunDirection)));
          vec3 base = vec3(0.94, 0.97, 1.0) * lit;
          gl_FragColor = vec4(base, mask * uOpacity);
        }
      `,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    group.add(clouds);

    const atmosphereInnerGeo = new THREE.SphereGeometry(1.03, 80, 80);
    const atmosphereInnerMat = new THREE.MeshBasicMaterial({
      color: 0x5a9fe8,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const atmosphereInner = new THREE.Mesh(atmosphereInnerGeo, atmosphereInnerMat);
    group.add(atmosphereInner);

    const atmosphereOuterGeo = new THREE.SphereGeometry(1.06, 64, 64);
    const atmosphereOuterMat = new THREE.MeshBasicMaterial({
      color: 0x6ca8ff,
      transparent: true,
      opacity: 0.045,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const atmosphereOuter = new THREE.Mesh(atmosphereOuterGeo, atmosphereOuterMat);
    group.add(atmosphereOuter);

    const textureDisposables: THREE.Texture[] = [];

    const maxTextureSize = renderer.capabilities.maxTextureSize;

    const boot = async () => {
      try {
        let diffuse: THREE.Texture | null = null;
        for (const url of diffuseUrlsForGpu(maxTextureSize)) {
          try {
            diffuse = await loadTexture(
              loader,
              url,
              maxAniso,
              THREE.SRGBColorSpace,
            );
            break;
          } catch {
            /* next candidate */
          }
        }

        if (disposed) {
          diffuse?.dispose();
          return;
        }

        if (diffuse) {
          textureDisposables.push(diffuse);
          diffuseOriginal = diffuse;

          // Generate a true grayscale map for light mode (matches the reference look reliably).
          const img = diffuse.image as unknown;
          if (img && typeof (img as HTMLImageElement).naturalWidth === "number") {
            try {
              diffuseGray = await createGrayscaleCanvasTexture(
                img as HTMLImageElement,
                maxAniso,
              );
              textureDisposables.push(diffuseGray);
            } catch {
              // optional; fall back to shader-only grayscale
            }
          }
          syncDiffuseMapToTheme();
        } else if (!disposed) {
          material.color.set(0x1a3a52);
        }

        try {
          const normal = await loadTexture(
            loader,
            EARTH_NORMAL,
            maxAniso,
            THREE.NoColorSpace,
          );
          if (disposed) {
            normal.dispose();
            return;
          }
          textureDisposables.push(normal);
          material.normalMap = normal;
          material.needsUpdate = true;

          // Light mode: exaggerate surface relief while keeping it “clean”.
          lightMaterial.normalMap = normal;
          lightMaterial.normalScale.set(0.62, 0.62);
          lightMaterial.needsUpdate = true;
        } catch {
          /* optional */
        }

        try {
          const cloudTex = await loadDataTexture(
            loader,
            EARTH_BUMP_ROUGHNESS_CLOUDS,
            maxAniso,
          );
          if (disposed) {
            cloudTex.dispose();
            return;
          }
          textureDisposables.push(cloudTex);
          cloudMat.uniforms.cloudMap.value = cloudTex;
          cloudMat.uniforms.uUsePacked.value = 1;

          // Reuse packed data for subtle relief in light mode (raw model feel).
          lightMaterial.bumpMap = cloudTex;
          lightMaterial.bumpScale = 0.11;
          lightMaterial.roughnessMap = cloudTex;
          // Push 3D form: small displacement adds “edgy” contour without looking noisy.
          lightMaterial.displacementMap = cloudTex;
          lightMaterial.displacementScale = 0.018;
          lightMaterial.needsUpdate = true;

          // Dark mode: use the same packed map for metallic surface detail.
          material.bumpMap = cloudTex;
          material.bumpScale = 0.06;
          material.roughnessMap = cloudTex;
          material.needsUpdate = true;
        } catch {
          try {
            const cloudTex = await loadTexture(
              loader,
              EARTH_CLOUDS_FALLBACK,
              maxAniso,
              THREE.SRGBColorSpace,
            );
            if (disposed) {
              cloudTex.dispose();
              return;
            }
            textureDisposables.push(cloudTex);
            cloudMat.uniforms.cloudMap.value = cloudTex;
            cloudMat.uniforms.uUsePacked.value = 0;
          } catch {
            /* optional */
          }
        }
      } finally {
        if (disposed) return;
        /* Two passes so GPU uploads are sampled before fade-in (avoids grey flash). */
        renderer.render(scene, camera);
        requestAnimationFrame(() => {
          if (disposed) return;
          // Shader uniforms exist after the first render; re-apply theme so light mode takes effect.
          applyThemeTuning(isLightTheme());
          syncDiffuseMapToTheme();
          renderer.render(scene, camera);
          setGlobeReady(true);
        });
      }
    };

    void boot();

    const starsGeo = new THREE.BufferGeometry();
    const starCount = 2200;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 18 + Math.random() * 32;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xc8d8f0,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    const isLightTheme = () => document.documentElement.classList.contains("light");
    const applyThemeTuning = (light: boolean) => {
      desiredLightTheme = light;
      // Dark is the current baseline; light mode needs more contrast and fewer "space" cues.
      renderer.toneMappingExposure = light ? 1.14 : 0.88;

      ambient.intensity = light ? 0.42 : 0.22;
      key.color.set(light ? 0xffffff : 0xfff5e8);
      key.intensity = light ? 1.22 : 1.05;
      rim.intensity = light ? 0.22 : 0.36;
      fill.intensity = light ? 0.09 : 0.14;

      atmosphereInnerMat.color.set(light ? 0xe9eef5 : 0x5a9fe8);
      atmosphereOuterMat.color.set(light ? 0xf4f6fb : 0x6ca8ff);
      atmosphereInnerMat.opacity = light ? 0.035 : 0.08;
      atmosphereOuterMat.opacity = light ? 0.02 : 0.045;

      starsMat.opacity = light ? 0.14 : 0.55;
      starsMat.color.set(light ? 0xaab7c8 : 0xc8d8f0);
      starsMat.needsUpdate = true;

      cloudMat.uniforms.uOpacity.value = light ? 0.16 : 0.72;

      // Dark mode: black metallic “product” globe.
      if (!light) {
        material.color.set(0x0b0b10);
        material.metalness = 0.92;
        material.roughness = 0.28;
        material.clearcoat = 0.5;
        material.clearcoatRoughness = 0.24;
        material.envMapIntensity = 1.05;
        material.normalScale.setScalar(0.42);
        material.needsUpdate = true;
      }

      if (themeUniform) themeUniform.value = light ? 1 : 0;
      syncDiffuseMapToTheme();

      // Light mode: show only the earth (no clouds/atmosphere/stars).
      earth.material = light ? lightMaterial : material;
      clouds.visible = !light;
      atmosphereInner.visible = !light;
      atmosphereOuter.visible = !light;
      stars.visible = !light;
    };

    applyThemeTuning(isLightTheme());
    const themeObserver = new MutationObserver(() => {
      applyThemeTuning(isLightTheme());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMove = (clientX: number, clientY: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Light mode should still “follow” the mouse like before — just slightly smoother.
      const sx = desiredLightTheme ? 1.35 : 1.15;
      const sy = desiredLightTheme ? 1.05 : 0.85;
      target.x = (clientX / w - 0.5) * sx;
      target.y = (clientY / h - 0.5) * sy;
    };

    const mouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const touchMove = (e: TouchEvent) => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousemove", mouseMove, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("touchstart", touchMove, { passive: true });

    const onResize = () => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      resizeRenderer();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    let t0 = performance.now();
    const animate = (now: number) => {
      frameRef.current = requestAnimationFrame(animate);
      const delta = Math.min((now - t0) / 1000, 0.05);
      t0 = now;

      // If the shader compiled after initial theme apply, sync uniform once available.
      if (themeUniform) themeUniform.value = desiredLightTheme ? 1 : 0;

      const damp = desiredLightTheme ? 0.06 : 0.065;
      pointer.x = lerp(pointer.x, target.x, damp);
      pointer.y = lerp(pointer.y, target.y, damp);

      const slow = reduceMotionRef.current ? 0 : 1;
      if (desiredLightTheme) {
        // Metallic “product render”: keep it stable, but respond like the original.
        group.rotation.y += delta * 0.065;
        group.rotation.x = lerp(group.rotation.x, pointer.y * 0.44, 0.085);
        group.rotation.y += pointer.x * delta * 0.38;
        group.rotation.z = lerp(group.rotation.z, pointer.x * 0.15, 0.075);
      } else {
        /* Base spin (rad/s) — keep clouds / pointer terms scaled to match. */
        group.rotation.y += delta * 0.15 * slow;
        group.rotation.x = lerp(group.rotation.x, pointer.y * 0.38, 0.08);
        group.rotation.y += pointer.x * delta * 0.38 * slow;
        group.rotation.z = lerp(group.rotation.z, pointer.x * 0.12, 0.06);
      }

      /* Slightly faster cloud drift vs solid Earth */
      clouds.rotation.y += delta * 0.029 * slow;

      stars.rotation.y += delta * 0.018 * slow;

      renderer.render(scene, camera);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchstart", touchMove);
      ro.disconnect();
      themeObserver.disconnect();
      geometry.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      atmosphereInnerGeo.dispose();
      atmosphereInnerMat.dispose();
      atmosphereOuterGeo.dispose();
      atmosphereOuterMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      for (const t of textureDisposables) t.dispose();
      material.dispose();
      lightMaterial.dispose();
      renderer.dispose();
      envTex.dispose();
      pmrem.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative isolate h-full min-h-[min(90vw,30rem)] w-full md:min-h-[min(76vh,44rem)]"
      aria-hidden
    >
      <div
        className={`pointer-events-none absolute inset-0 z-3 bg-(--ui-bg) transition-opacity duration-850 ease-in-out motion-reduce:duration-150 motion-reduce:ease-out ${globeReady ? "opacity-0" : "opacity-100"}`}
        aria-hidden
      />
    </div>
  );
}
