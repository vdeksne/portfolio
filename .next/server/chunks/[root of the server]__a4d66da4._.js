module.exports = {

"[project]/.next-internal/server/app/api/admin/upload/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/node:fs [external] (node:fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}}),
"[externals]/node:path [external] (node:path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}}),
"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/lib/cms/session.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CMS_COOKIE": (()=>CMS_COOKIE),
    "createSessionValue": (()=>createSessionValue),
    "isAdminAuthenticated": (()=>isAdminAuthenticated),
    "safeEqualPassword": (()=>safeEqualPassword),
    "verifySessionValue": (()=>verifySessionValue)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
const CMS_COOKIE = "portfolio_cms_session";
const TTL_MS = 7 * 24 * 60 * 60 * 1000;
function createSessionValue(secret) {
    const payload = Buffer.from(JSON.stringify({
        exp: Date.now() + TTL_MS
    }), "utf8").toString("base64url");
    const sig = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])("sha256", secret).update(payload).digest("base64url");
    return `${payload}.${sig}`;
}
function verifySessionValue(token, secret) {
    if (!token) return false;
    const dot = token.lastIndexOf(".");
    if (dot === -1) return false;
    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expected = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])("sha256", secret).update(payload).digest("base64url");
    try {
        const a = Buffer.from(sig, "utf8");
        const b = Buffer.from(expected, "utf8");
        if (a.length !== b.length) return false;
        if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(a, b)) return false;
    } catch  {
        return false;
    }
    try {
        const json = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
        return typeof json.exp === "number" && json.exp > Date.now();
    } catch  {
        return false;
    }
}
async function isAdminAuthenticated() {
    const secret = process.env.CMS_SECRET;
    if (!secret) return false;
    const jar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return verifySessionValue(jar.get(CMS_COOKIE)?.value, secret);
}
function safeEqualPassword(a, b) {
    try {
        const ba = Buffer.from(a, "utf8");
        const bb = Buffer.from(b, "utf8");
        if (ba.length !== bb.length) return false;
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(ba, bb);
    } catch  {
        return false;
    }
}
}}),
"[project]/src/lib/cms/guard.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "requireCmsAuth": (()=>requireCmsAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cms/session.ts [app-route] (ecmascript)");
;
;
;
async function requireCmsAuth() {
    const secret = process.env.CMS_SECRET;
    if (!secret) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "CMS is not configured (set CMS_SECRET in .env)."
        }, {
            status: 503
        });
    }
    const jar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifySessionValue"])(jar.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CMS_COOKIE"])?.value, secret)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    return null;
}
}}),
"[project]/src/lib/db.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getDb": (()=>getDb)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$neondatabase$2b$serverless$40$0$2e$10$2e$4$2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@neondatabase+serverless@0.10.4/node_modules/@neondatabase/serverless/index.mjs [app-route] (ecmascript)");
;
let sqlSingleton = null;
function getDb() {
    const url = process.env.DATABASE_URL?.trim();
    if (!url) return null;
    if (!sqlSingleton) sqlSingleton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$neondatabase$2b$serverless$40$0$2e$10$2e$4$2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(url);
    return sqlSingleton;
}
}}),
"[project]/src/app/api/admin/upload/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST),
    "runtime": (()=>runtime)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$guard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cms/guard.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
;
;
;
;
const runtime = "nodejs";
/** Stay under typical serverless request body limits (~4.5 MB on Vercel). */ const MAX_BYTES = 4 * 1024 * 1024;
const MIME_TO_EXT = new Map([
    [
        "image/jpeg",
        ".jpg"
    ],
    [
        "image/jpg",
        ".jpg"
    ],
    [
        "image/pjpeg",
        ".jpg"
    ],
    [
        "image/png",
        ".png"
    ],
    [
        "image/x-png",
        ".png"
    ],
    [
        "image/webp",
        ".webp"
    ],
    [
        "image/gif",
        ".gif"
    ],
    [
        "image/svg+xml",
        ".svg"
    ],
    [
        "image/svg",
        ".svg"
    ],
    [
        "image/avif",
        ".avif"
    ]
]);
const EXT_FROM_NAME = new Map([
    [
        "jpg",
        ".jpg"
    ],
    [
        "jpeg",
        ".jpg"
    ],
    [
        "png",
        ".png"
    ],
    [
        "webp",
        ".webp"
    ],
    [
        "gif",
        ".gif"
    ],
    [
        "svg",
        ".svg"
    ],
    [
        "avif",
        ".avif"
    ]
]);
const EXT_TO_MIME = {
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".avif": "image/avif"
};
function extFromFilename(filename) {
    const m = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
    if (!m?.[1]) return null;
    return EXT_FROM_NAME.get(m[1]) ?? null;
}
/** Detect HEIC/HEIF (common iPhone default) — we don’t transcode. */ function isHeicHeif(buf) {
    if (buf.length < 12) return false;
    if (buf.subarray(4, 8).toString("ascii") !== "ftyp") return false;
    const brand = buf.subarray(8, 12).toString("ascii").toLowerCase();
    if (brand.startsWith("avif")) return false;
    return brand.startsWith("heic") || brand.startsWith("heix") || brand.startsWith("hevc") || brand.startsWith("mif1") || brand.startsWith("msf1");
}
function sniffExt(buf) {
    if (buf.length >= 12 && buf.subarray(4, 8).toString("ascii") === "ftyp") {
        const brand = buf.subarray(8, 12).toString("ascii").toLowerCase();
        if (brand.startsWith("avif")) return ".avif";
    }
    if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
        return ".jpg";
    }
    if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
        return ".png";
    }
    if (buf.length >= 12 && buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") {
        return ".webp";
    }
    if (buf.length >= 6 && (buf.subarray(0, 6).toString("ascii") === "GIF87a" || buf.subarray(0, 6).toString("ascii") === "GIF89a")) {
        return ".gif";
    }
    const head = buf.subarray(0, Math.min(buf.length, 256)).toString("utf8").trimStart();
    if (head.startsWith("<svg") || head.startsWith("<?xml")) {
        return ".svg";
    }
    return null;
}
function resolveExtension(file, buf) {
    if (isHeicHeif(buf)) {
        return {
            error: "HEIC/HEIF isn’t supported here. Export the photo as JPEG or PNG (Photos: File → Export, or AirDrop “Most Compatible”)."
        };
    }
    const mime = file.type.trim().toLowerCase();
    if (mime && mime !== "application/octet-stream") {
        const fromMime = MIME_TO_EXT.get(mime);
        if (fromMime) return {
            ext: fromMime
        };
    }
    const fromName = extFromFilename(file.name);
    if (fromName) return {
        ext: fromName
    };
    const sniffed = sniffExt(buf);
    if (sniffed) return {
        ext: sniffed
    };
    return {
        error: "Could not detect image type. Use JPEG, PNG, WebP, GIF, SVG, or AVIF — not HEIC."
    };
}
async function POST(req) {
    const denied = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$guard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireCmsAuth"])();
    if (denied) return denied;
    let form;
    try {
        form = await req.formData();
    } catch  {
        return Response.json({
            error: "Invalid form data."
        }, {
            status: 400
        });
    }
    const file = form.get("file");
    if (!file || !(file instanceof File)) {
        return Response.json({
            error: "Choose a file to upload (field name: file)."
        }, {
            status: 400
        });
    }
    if (file.size > MAX_BYTES) {
        return Response.json({
            error: "Image is too large. Maximum size is 4 MB (exports from phones often work under this)."
        }, {
            status: 400
        });
    }
    let buf;
    try {
        buf = Buffer.from(await file.arrayBuffer());
    } catch  {
        return Response.json({
            error: "Could not read file data."
        }, {
            status: 400
        });
    }
    const resolved = resolveExtension(file, buf);
    if ("error" in resolved) {
        return Response.json({
            error: resolved.error
        }, {
            status: 400
        });
    }
    const filename = `${Date.now()}-${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(8).toString("hex")}${resolved.ext}`;
    const dir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "uploads");
    try {
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].mkdirSync(dir, {
            recursive: true
        });
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, filename), buf);
    } catch (e) {
        const msg = e instanceof Error ? e.message : "Write failed.";
        return Response.json({
            error: `Could not save file (${msg}). On serverless hosting, local disk may be read-only — paste an image URL instead.`
        }, {
            status: 500
        });
    }
    const publicUrl = `/uploads/${filename}`;
    const mimeForDb = file.type?.trim() || EXT_TO_MIME[resolved.ext] || "application/octet-stream";
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    if (db) {
        try {
            await db`
        INSERT INTO uploaded_files (public_url, storage_path, mime_type, byte_size)
        VALUES (${publicUrl}, ${filename}, ${mimeForDb}, ${buf.length})
      `;
        } catch (e) {
            console.error("[admin/upload] DB insert failed (file saved on disk)", e);
        }
    }
    return Response.json({
        url: publicUrl
    });
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__a4d66da4._.js.map