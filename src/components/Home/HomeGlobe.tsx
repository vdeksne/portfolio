"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/** NASA topo + bathy (~5.4k wide). Requires `maxTextureSize` ≥ ~5500 for a valid GPU upload. */
const EARTH_MAP_HD =
  "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg";
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
  if (maxTextureSize >= 5400) out.push(EARTH_MAP_HD);
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

    material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <opaque_fragment>",
        `
        {
          vec3 alb = diffuseColor.rgb;
          float ocean = smoothstep(0.035, 0.2, alb.b - alb.r)
            * smoothstep(-0.02, 0.14, alb.b - alb.g * 0.92);
          vec3 waterTone = vec3(0.62, 0.7, 0.8);
          outgoingLight *= mix(vec3(1.0), waterTone, ocean * 0.78);
        }
        #include <opaque_fragment>`,
      );
    };
    material.customProgramCacheKey = () => "globe-ocean-darken-v2";

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
          material.map = diffuse;
          material.needsUpdate = true;
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

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMove = (clientX: number, clientY: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      target.x = (clientX / w - 0.5) * 1.15;
      target.y = (clientY / h - 0.5) * 0.85;
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

      pointer.x = lerp(pointer.x, target.x, 0.065);
      pointer.y = lerp(pointer.y, target.y, 0.065);

      const slow = reduceMotionRef.current ? 0 : 1;
      /* Base spin (rad/s) — keep clouds / pointer terms scaled to match. */
      group.rotation.y += delta * 0.15 * slow;
      group.rotation.x = lerp(group.rotation.x, pointer.y * 0.38, 0.08);
      group.rotation.y += pointer.x * delta * 0.38 * slow;
      group.rotation.z = lerp(group.rotation.z, pointer.x * 0.12, 0.06);

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
      renderer.dispose();
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
