module.exports = {

"[project]/.next-internal/server/app/api/admin/experiences/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[project]/src/lib/mdc.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/** Serialize slots back to an MDC block (matches `parseMdcBlock` shape). */ __turbopack_context__.s({
    "firstMdcBlockName": (()=>firstMdcBlockName),
    "parseMdcBlock": (()=>parseMdcBlock),
    "serializeMdcBlock": (()=>serializeMdcBlock)
});
function serializeMdcBlock(blockName, slots) {
    const lines = [
        `::${blockName}`
    ];
    for (const [key, value] of Object.entries(slots)){
        lines.push(`#${key}`);
        lines.push(value);
    }
    lines.push("::");
    return `${lines.join("\n")}\n`;
}
function parseMdcBlock(body, blockName) {
    const re = new RegExp(`::${blockName}\\s*([\\s\\S]*?)::`, "m");
    const m = body.match(re);
    if (!m) return {};
    const inner = m[1] ?? "";
    const slots = {};
    const lines = inner.split("\n");
    let currentKey = null;
    const buf = [];
    const flush = ()=>{
        if (currentKey) {
            slots[currentKey] = buf.join("\n").trim();
        }
        buf.length = 0;
    };
    for (const line of lines){
        const km = line.match(/^#(\w+)$/);
        if (km) {
            flush();
            currentKey = km[1] ?? null;
        } else {
            buf.push(line);
        }
    }
    flush();
    return slots;
}
function firstMdcBlockName(body) {
    const m = body.match(/::(\w+)/);
    return m?.[1] ?? "home";
}
}}),
"[project]/src/lib/neon-connection-string.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Neon’s UI sometimes copies `psql 'postgresql://…'` instead of the URL alone.
 * `neon()` and connection parsers expect a bare `postgresql://` (or `postgres://`) URL.
 */ __turbopack_context__.s({
    "normalizeNeonConnectionString": (()=>normalizeNeonConnectionString),
    "resolvePostgresUrlFromEnv": (()=>resolvePostgresUrlFromEnv)
});
function normalizeNeonConnectionString(raw) {
    let s = raw.trim();
    s = s.replace(/^psql\s+/i, "").trim();
    if (s.startsWith("'") && s.endsWith("'") || s.startsWith('"') && s.endsWith('"')) {
        s = s.slice(1, -1).trim();
    }
    return s;
}
function resolvePostgresUrlFromEnv() {
    const keys = [
        "DATABASE_URL",
        "POSTGRES_URL",
        "NEON_DATABASE_URL",
        "POSTGRES_PRISMA_URL"
    ];
    for (const key of keys){
        const raw = process.env[key]?.trim();
        if (!raw) continue;
        const url = normalizeNeonConnectionString(raw);
        if (url.startsWith("postgres")) return url;
    }
    return undefined;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$neon$2d$connection$2d$string$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/neon-connection-string.ts [app-route] (ecmascript)");
;
;
let sqlSingleton = null;
let normalizedUrl = null;
function getDb() {
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$neon$2d$connection$2d$string$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolvePostgresUrlFromEnv"])();
    if (!url) return null;
    if (!sqlSingleton || normalizedUrl !== url) {
        sqlSingleton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$neondatabase$2b$serverless$40$0$2e$10$2e$4$2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(url);
        normalizedUrl = url;
    }
    return sqlSingleton;
}
}}),
"[project]/src/lib/cms-pages-db.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchCmsPageOverlay": (()=>fetchCmsPageOverlay),
    "mergeCmsOverlay": (()=>mergeCmsOverlay),
    "routeKeyToDbPageKey": (()=>routeKeyToDbPageKey),
    "upsertCmsPageRow": (()=>upsertCmsPageRow)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
function routeKeyToDbPageKey(routeKey) {
    return routeKey === "" ? "home" : routeKey;
}
function safeJsonObject(v) {
    if (!v) return null;
    if (typeof v === "string") {
        try {
            const parsed = JSON.parse(v);
            return safeJsonObject(parsed);
        } catch  {
            return null;
        }
    }
    if (typeof v !== "object" || Array.isArray(v)) return null;
    return v;
}
async function fetchCmsPageOverlay(pageKey, locale) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    if (!db) return null;
    const rows = await db`
    SELECT meta, slots, block FROM cms_pages
    WHERE page_key = ${pageKey} AND locale = ${locale}
    LIMIT 1
  `;
    const row = rows[0];
    if (!row) return null;
    const metaObj = safeJsonObject(row.meta) ?? {};
    const slotsObj = safeJsonObject(row.slots) ?? {};
    return {
        meta: {
            ...metaObj
        },
        slots: {
            ...slotsObj
        },
        block: typeof row.block === "string" ? row.block : ""
    };
}
async function upsertCmsPageRow(pageKey, locale, data) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    if (!db) throw new Error("Database not configured");
    const metaJson = JSON.stringify(data.meta);
    const slotsJson = JSON.stringify(data.slots);
    await db`
    INSERT INTO cms_pages (page_key, locale, meta, slots, block, updated_at)
    VALUES (
      ${pageKey},
      ${locale},
      ${metaJson}::jsonb,
      ${slotsJson}::jsonb,
      ${data.block},
      NOW()
    )
    ON CONFLICT (page_key, locale) DO UPDATE SET
      meta = EXCLUDED.meta,
      slots = EXCLUDED.slots,
      block = EXCLUDED.block,
      updated_at = NOW()
  `;
}
function mergeCmsOverlay(disk, overlay) {
    if (!overlay) return disk;
    return {
        meta: {
            ...disk.meta,
            ...overlay.meta
        },
        slots: {
            ...disk.slots,
            ...overlay.slots
        },
        block: overlay.block.trim() !== "" ? overlay.block : disk.block
    };
}
}}),
"[project]/src/lib/projects-db.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "deleteProjectFromDb": (()=>deleteProjectFromDb),
    "getProjectFromDb": (()=>getProjectFromDb),
    "listProjectsFromDb": (()=>listProjectsFromDb),
    "upsertProjectToDb": (()=>upsertProjectToDb)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
;
function safeJsonObject(v) {
    if (!v) return null;
    if (typeof v === "string") {
        try {
            return safeJsonObject(JSON.parse(v));
        } catch  {
            return null;
        }
    }
    if (typeof v !== "object" || Array.isArray(v)) return null;
    return v;
}
async function listProjectsFromDb(locale) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    if (!db) return null;
    const readRows = async (loc)=>await db`
      SELECT id, payload
      FROM portfolio_projects
      WHERE locale = ${loc}
      ORDER BY updated_at DESC
    `;
    const primary = await readRows(locale);
    // Projects are locale-neutral. If a locale has no rows, fall back to English.
    const rows = primary.length ? primary : locale === "en" ? primary : await readRows("en");
    return rows.map((r)=>{
        const obj = safeJsonObject(r.payload) ?? null;
        if (!obj) return null;
        return {
            id: r.id,
            project: obj
        };
    }).filter(Boolean);
}
async function getProjectFromDb(locale, id) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    if (!db) return null;
    const readOne = async (loc)=>(await db`
      SELECT payload
      FROM portfolio_projects
      WHERE id = ${id} AND locale = ${loc}
      LIMIT 1
    `)[0] ?? null;
    const primary = await readOne(locale);
    const row = primary ?? (locale === "en" ? null : await readOne("en"));
    return row ? safeJsonObject(row.payload) ?? null : null;
}
async function upsertProjectToDb(locale, id, project) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    if (!db) throw new Error("Database not configured");
    const payload = JSON.stringify(project);
    await db`
    INSERT INTO portfolio_projects (id, locale, payload, updated_at)
    VALUES (${id}, ${locale}, ${payload}::jsonb, NOW())
    ON CONFLICT (id, locale) DO UPDATE SET
      payload = EXCLUDED.payload,
      updated_at = NOW()
  `;
}
async function deleteProjectFromDb(locale, id) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    if (!db) throw new Error("Database not configured");
    await db`
    DELETE FROM portfolio_projects
    WHERE id = ${id} AND locale = ${locale}
  `;
}
}}),
"[project]/src/lib/content.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ADMIN_PAGE_SLUG_TO_ROUTE": (()=>ADMIN_PAGE_SLUG_TO_ROUTE),
    "PAGE_FILES": (()=>PAGE_FILES),
    "adminPageSlugToRouteKey": (()=>adminPageSlugToRouteKey),
    "deleteArticleFile": (()=>deleteArticleFile),
    "deleteProjectFile": (()=>deleteProjectFile),
    "getArticle": (()=>getArticle),
    "getCertifications": (()=>getCertifications),
    "getEducation": (()=>getEducation),
    "getExperiences": (()=>getExperiences),
    "getFaq": (()=>getFaq),
    "getPageByRoute": (()=>getPageByRoute),
    "getPageForAdmin": (()=>getPageForAdmin),
    "getStack": (()=>getStack),
    "isCompleteProjectPayload": (()=>isCompleteProjectPayload),
    "listArticles": (()=>listArticles),
    "listProjectRows": (()=>listProjectRows),
    "listProjectRowsWithDbOverlay": (()=>listProjectRowsWithDbOverlay),
    "listProjects": (()=>listProjects),
    "loadPageFromDisk": (()=>loadPageFromDisk),
    "readProjectFile": (()=>readProjectFile),
    "routeKeyToAdminSlug": (()=>routeKeyToAdminSlug),
    "syncAboutProfileImageToOtherLocales": (()=>syncAboutProfileImageToOtherLocales),
    "writeArticleFile": (()=>writeArticleFile),
    "writeCertificationsFile": (()=>writeCertificationsFile),
    "writeEducationFile": (()=>writeEducationFile),
    "writeExperiencesFile": (()=>writeExperiencesFile),
    "writeFaqFile": (()=>writeFaqFile),
    "writePageMarkdown": (()=>writePageMarkdown),
    "writeProjectFile": (()=>writeProjectFile),
    "writeStackFile": (()=>writeStackFile)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mdc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mdc.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cms-pages-db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$projects$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/projects-db.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
const CONTENT_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "content");
/** Projects are locale-neutral: use this locale’s JSON if present, else English. */ function resolveProjectsContentDir(locale) {
    const preferred = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, "projects");
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(preferred)) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "en", "projects");
    }
    const hasJson = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readdirSync(preferred).some((f)=>f.endsWith(".json"));
    if (!hasJson && locale !== "en") {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "en", "projects");
    }
    return preferred;
}
function projectYear(p) {
    const date = (p.date ?? "").trim();
    const m1 = date.match(/^(\d{4})/);
    if (m1?.[1]) return Number(m1[1]);
    const rel = (p.release ?? "").trim();
    const m2 = rel.match(/(19\d{2}|20\d{2})/);
    if (m2?.[1]) return Number(m2[1]);
    return null;
}
function isCompleteProjectPayload(p) {
    if (!p || typeof p !== "object" || Array.isArray(p)) return false;
    const o = p;
    const req = (v)=>typeof v === "string" && v.trim().length > 0;
    return req(o.name) && req(o.image) && req(o.link) && req(o.release);
}
function sortProjectFileRows(rows) {
    return [
        ...rows
    ].sort((a, b)=>{
        const pa = a.project;
        const pb = b.project;
        const ao = typeof pa.order === "number" ? pa.order : Number.POSITIVE_INFINITY;
        const bo = typeof pb.order === "number" ? pb.order : Number.POSITIVE_INFINITY;
        if (ao !== bo) return ao - bo;
        const ay = projectYear(pa) ?? Number.NEGATIVE_INFINITY;
        const by = projectYear(pb) ?? Number.NEGATIVE_INFINITY;
        if (ay !== by) return by - ay;
        const af = pa.featured ? 1 : 0;
        const bf = pb.featured ? 1 : 0;
        if (af !== bf) return bf - af;
        return String(pa.name ?? "").localeCompare(String(pb.name ?? ""));
    });
}
async function mergeDiskAndDbProjectRows(locale) {
    const diskRows = listProjectRows(locale);
    const byId = new Map(diskRows.map((r)=>[
            r.id,
            r
        ]));
    const dbRows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$projects$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listProjectsFromDb"])(locale) ?? [];
    for (const row of dbRows){
        if (!isCompleteProjectPayload(row.project)) continue;
        byId.set(row.id, {
            id: row.id,
            project: row.project
        });
    }
    return sortProjectFileRows([
        ...byId.values()
    ]);
}
async function listProjectRowsWithDbOverlay(locale) {
    if (process.env.VERCEL === "1" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])()) {
        return mergeDiskAndDbProjectRows(locale);
    }
    return listProjectRows(locale);
}
const PAGE_FILES = {
    "": "1.index",
    works: "2.works",
    writing: "3.writing",
    about: "4.about",
    contact: "5.contact"
};
const ALL_LOCALES = [
    "en",
    "lv"
];
async function syncAboutProfileImageToOtherLocales(savedLocale, profileImage) {
    if (process.env.VERCEL === "1") {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        if (!db) return;
        const pageKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routeKeyToDbPageKey"])("about");
        for (const loc of ALL_LOCALES){
            if (loc === savedLocale) continue;
            const disk = loadPageFromDisk(loc, "about");
            if (!disk) continue;
            const overlay = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchCmsPageOverlay"])(pageKey, loc);
            const merged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mergeCmsOverlay"])(disk, overlay);
            const slots = {
                ...merged.slots,
                profile_image: profileImage
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertCmsPageRow"])(pageKey, loc, {
                ...merged,
                slots
            });
        }
        return;
    }
    for (const loc of ALL_LOCALES){
        if (loc === savedLocale) continue;
        const page = await getPageForAdmin(loc, "about");
        if (!page) continue;
        const slots = {
            ...page.slots,
            profile_image: profileImage
        };
        writePageMarkdown(loc, "about", page.meta, page.block, slots);
    }
}
function loadPageFromDisk(locale, routeKey) {
    const base = PAGE_FILES[routeKey];
    if (!base) return null;
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, `${base}.md`);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(filePath)) return null;
    const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(filePath, "utf8");
    const { data, content } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(raw);
    const block = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mdc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["firstMdcBlockName"])(content);
    const slots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mdc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMdcBlock"])(content, block);
    return {
        meta: data,
        slots,
        block
    };
}
async function getPageByRoute(locale, routeKey) {
    const disk = loadPageFromDisk(locale, routeKey);
    if (!disk) return null;
    const overlay = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchCmsPageOverlay"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["routeKeyToDbPageKey"])(routeKey), locale);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mergeCmsOverlay"])(disk, overlay);
}
async function getPageForAdmin(locale, routeKey) {
    return getPageByRoute(locale, routeKey);
}
/** Writing is locale-neutral: English is canonical; other locales merge translated frontmatter when present. */ function mergeArticleMeta(base, override) {
    if (!override) return base;
    return {
        ...base,
        ...override
    };
}
function listArticles(locale) {
    const enDir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "en", "articles");
    const locDir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, "articles");
    const readMetaMap = (dir)=>{
        const m = new Map();
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(dir)) return m;
        for (const f of __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readdirSync(dir).filter((x)=>x.endsWith(".md"))){
            const slug = f.replace(/\.md$/, "");
            const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, f), "utf8");
            m.set(slug, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(raw).data);
        }
        return m;
    };
    if (locale === "en") {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(enDir)) return [];
        return __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readdirSync(enDir).filter((f)=>f.endsWith(".md")).map((f)=>{
            const slug = f.replace(/\.md$/, "");
            const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(enDir, f), "utf8");
            return {
                slug,
                meta: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(raw).data
            };
        });
    }
    const enMetas = readMetaMap(enDir);
    const locMetas = readMetaMap(locDir);
    const slugs = new Set([
        ...enMetas.keys(),
        ...locMetas.keys()
    ]);
    const items = [
        ...slugs
    ].map((slug)=>{
        const enMeta = enMetas.get(slug);
        const locMeta = locMetas.get(slug);
        if (!enMeta && locMeta) return {
            slug,
            meta: locMeta
        };
        if (!enMeta) return null;
        return {
            slug,
            meta: mergeArticleMeta(enMeta, locMeta)
        };
    }).filter(Boolean);
    return items;
}
function getArticle(locale, slug) {
    const enPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "en", "articles", `${slug}.md`);
    const locPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, "articles", `${slug}.md`);
    if (locale === "en") {
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(enPath)) return null;
        const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(enPath, "utf8");
        const { data, content } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(raw);
        return {
            meta: data,
            body: content.trim()
        };
    }
    const hasEn = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(enPath);
    const hasLoc = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(locPath);
    if (!hasEn && hasLoc) {
        const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(locPath, "utf8");
        const { data, content } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(raw);
        return {
            meta: data,
            body: content.trim()
        };
    }
    if (!hasEn) return null;
    const enRaw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(enPath, "utf8");
    const enParsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(enRaw);
    const enMeta = enParsed.data;
    const enBody = enParsed.content.trim();
    if (!hasLoc) {
        return {
            meta: enMeta,
            body: enBody
        };
    }
    const locParsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(locPath, "utf8"));
    const locMeta = locParsed.data;
    const locBody = locParsed.content.trim();
    const meta = mergeArticleMeta(enMeta, locMeta);
    const body = locBody.length > 0 ? locBody : enBody;
    return {
        meta,
        body
    };
}
async function listProjects(locale) {
    const rows = await listProjectRowsWithDbOverlay(locale);
    return rows.map((r)=>r.project);
}
function getStack() {
    const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "stack.json"), "utf8");
    return JSON.parse(raw);
}
function getExperiences() {
    const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "experiences.json"), "utf8");
    return JSON.parse(raw);
}
function getCertifications() {
    const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "certifications.json"), "utf8");
    return JSON.parse(raw);
}
function getEducation() {
    const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "education.json"), "utf8");
    return JSON.parse(raw);
}
function getFaq(locale) {
    const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, "faq.json"), "utf8");
    return JSON.parse(raw);
}
const ADMIN_PAGE_SLUG_TO_ROUTE = {
    home: "",
    works: "works",
    writing: "writing",
    about: "about",
    contact: "contact"
};
function adminPageSlugToRouteKey(slug) {
    return Object.prototype.hasOwnProperty.call(ADMIN_PAGE_SLUG_TO_ROUTE, slug) ? ADMIN_PAGE_SLUG_TO_ROUTE[slug] : null;
}
function routeKeyToAdminSlug(routeKey) {
    if (routeKey === "") return "home";
    return routeKey;
}
function writePageMarkdown(locale, routeKey, meta, block, slots) {
    const base = PAGE_FILES[routeKey];
    if (!base) throw new Error("Invalid route key");
    const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mdc$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeMdcBlock"])(block, slots);
    const raw = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].stringify(body.trimEnd(), meta);
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, `${base}.md`);
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, raw, "utf8");
}
function writeFaqFile(locale, data) {
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, "faq.json");
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
function writeStackFile(data) {
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "stack.json");
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
function writeExperiencesFile(data) {
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "experiences.json");
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
function writeCertificationsFile(data) {
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "certifications.json");
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
function writeEducationFile(data) {
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, "education.json");
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}
function listProjectRows(locale) {
    const dir = resolveProjectsContentDir(locale);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(dir)) return [];
    const rows = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readdirSync(dir).filter((f)=>f.endsWith(".json")).map((f)=>{
        const id = f.replace(/\.json$/, "");
        const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, f), "utf8");
        return {
            id,
            project: JSON.parse(raw)
        };
    });
    rows.sort((a, b)=>{
        const ao = typeof a.project.order === "number" ? a.project.order : Number.POSITIVE_INFINITY;
        const bo = typeof b.project.order === "number" ? b.project.order : Number.POSITIVE_INFINITY;
        if (ao !== bo) return ao - bo;
        const ay = projectYear(a.project) ?? Number.NEGATIVE_INFINITY;
        const by = projectYear(b.project) ?? Number.NEGATIVE_INFINITY;
        if (ay !== by) return by - ay; // newest first
        return a.id.localeCompare(b.id);
    });
    return rows;
}
function readProjectFile(locale, id) {
    if (!/^[a-z0-9][a-z0-9-]{0,120}$/i.test(id)) return null;
    const tryPath = (loc)=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, loc, "projects", `${id.toLowerCase()}.json`);
    let filePath = tryPath(locale);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(filePath) && locale !== "en") {
        filePath = tryPath("en");
    }
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(filePath)) return null;
    return JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(filePath, "utf8"));
}
function writeProjectFile(locale, id, project) {
    if (!/^[a-z0-9][a-z0-9-]{0,120}$/i.test(id)) throw new Error("Invalid project id");
    const dir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, "projects");
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].mkdirSync(dir, {
        recursive: true
    });
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, `${id}.json`);
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, `${JSON.stringify(project, null, 2)}\n`, "utf8");
}
function deleteProjectFile(locale, id) {
    if (!/^[a-z0-9][a-z0-9-]{0,120}$/i.test(id)) throw new Error("Invalid project id");
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, "projects", `${id}.json`);
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(filePath)) __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].unlinkSync(filePath);
}
function writeArticleFile(locale, slug, meta, body) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Invalid slug");
    const dir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, "articles");
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].mkdirSync(dir, {
        recursive: true
    });
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, `${slug}.md`);
    const raw = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].stringify(body.trimEnd() ? `${body.trimEnd()}\n` : "", meta);
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, raw, "utf8");
}
function deleteArticleFile(locale, slug) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Invalid slug");
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, "articles", `${slug}.md`);
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(filePath)) __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].unlinkSync(filePath);
}
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/headers.js [app-route] (ecmascript)");
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
    const jar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cms/session.ts [app-route] (ecmascript)");
;
;
;
async function requireCmsAuth() {
    const secret = process.env.CMS_SECRET;
    if (!secret) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "CMS is not configured (set CMS_SECRET in .env)."
        }, {
            status: 503
        });
    }
    const jar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifySessionValue"])(jar.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CMS_COOKIE"])?.value, secret)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Unauthorized"
        }, {
            status: 401
        });
    }
    return null;
}
}}),
"[project]/src/lib/cms/vercel-readonly-guard.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Vercel serverless uses a read-only app filesystem. File-based CMS writes must be done locally + git.
 */ __turbopack_context__.s({
    "VERCEL_READONLY_CMS_MESSAGE": (()=>VERCEL_READONLY_CMS_MESSAGE),
    "rejectIfVercelCmsFilesystemWrite": (()=>rejectIfVercelCmsFilesystemWrite)
});
const VERCEL_READONLY_CMS_MESSAGE = "This deployment cannot save content files (read-only disk). Edit markdown/JSON under content/ locally, commit, and push—or run pnpm dev and use /admin on your machine.";
function rejectIfVercelCmsFilesystemWrite() {
    if (process.env.VERCEL !== "1") return null;
    return Response.json({
        error: VERCEL_READONLY_CMS_MESSAGE
    }, {
        status: 503
    });
}
}}),
"[project]/src/lib/cms/schemas.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "articleCreateSchema": (()=>articleCreateSchema),
    "articleMetaSchema": (()=>articleMetaSchema),
    "articleWriteSchema": (()=>articleWriteSchema),
    "certificationsSchema": (()=>certificationsSchema),
    "educationSchema": (()=>educationSchema),
    "experiencesSchema": (()=>experiencesSchema),
    "faqSchema": (()=>faqSchema),
    "localeSchema": (()=>localeSchema),
    "pageMetaSchema": (()=>pageMetaSchema),
    "pageWriteSchema": (()=>pageWriteSchema),
    "projectSchema": (()=>projectSchema),
    "stackSchema": (()=>stackSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/zod@3.24.2/node_modules/zod/lib/index.mjs [app-route] (ecmascript)");
;
const localeSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["enum"])([
    "en",
    "lv"
]);
const faqSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])(),
    subtitle: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])(),
    faqQuestions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
        title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])(),
        questions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
            label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])(),
            content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])()
        }))
    }))
});
const stackSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
    items: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
        name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])(),
        link: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])(),
        icon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])()
    }))
});
const experiencesSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
    items: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
        title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
        company: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
        date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1)
    }))
});
const certificationsSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
    items: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
        name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
        issuer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
        date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
        link: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().optional()
    }).transform((o)=>({
            ...o,
            link: o.link?.trim() ? o.link.trim() : undefined
        })))
});
const educationSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
    items: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
        school: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
        location: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().optional(),
        program: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
        date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1)
    }).transform((o)=>({
            ...o,
            location: o.location?.trim() ? o.location.trim() : undefined
        })))
});
const projectSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
    image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
    link: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
    release: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().optional(),
    tools: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])()).optional(),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().optional(),
    featured: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])().optional(),
    order: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["number"])().int().min(0).optional()
});
const pageMetaSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().optional()
});
const pageWriteSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
    meta: pageMetaSchema,
    block: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1).max(64),
    slots: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])())
});
const articleMetaSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
    title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
    image: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
    readingTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().min(1),
    tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])())
});
const articleWriteSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
    meta: articleMetaSchema,
    body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])()
});
const articleCreateSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["object"])({
    slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    meta: articleMetaSchema,
    body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$zod$40$3$2e$24$2e$2$2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["string"])()
});
}}),
"[project]/src/app/api/admin/experiences/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "PUT": (()=>PUT)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$guard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cms/guard.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$vercel$2d$readonly$2d$guard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cms/vercel-readonly-guard.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cms/schemas.ts [app-route] (ecmascript)");
;
;
;
;
async function GET() {
    const denied = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$guard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireCmsAuth"])();
    if (denied) return denied;
    return Response.json((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getExperiences"])());
}
async function PUT(req) {
    const denied = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$guard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireCmsAuth"])();
    if (denied) return denied;
    const readonlyFs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$vercel$2d$readonly$2d$guard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rejectIfVercelCmsFilesystemWrite"])();
    if (readonlyFs) return readonlyFs;
    const json = await req.json();
    const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiencesSchema"].safeParse(json);
    if (!parsed.success) {
        return Response.json({
            error: parsed.error.flatten()
        }, {
            status: 400
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeExperiencesFile"])(parsed.data);
    return Response.json({
        ok: true
    });
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__114ad9c5._.js.map