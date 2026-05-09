module.exports = {

"[project]/.next-internal/server/app/[locale]/articles/[slug]/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/twitter-image--metadata.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/twitter-image--metadata.js [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/opengraph-image--metadata.js [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/opengraph-image--metadata.js [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/[locale]/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[locale]/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/[locale]/loading.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[locale]/loading.tsx [app-rsc] (ecmascript)"));
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
"[project]/src/lib/mdc.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/src/lib/neon-connection-string.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/src/lib/db.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getDb": (()=>getDb)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$neondatabase$2b$serverless$40$0$2e$10$2e$4$2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@neondatabase+serverless@0.10.4/node_modules/@neondatabase/serverless/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$neon$2d$connection$2d$string$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/neon-connection-string.ts [app-rsc] (ecmascript)");
;
;
let sqlSingleton = null;
let normalizedUrl = null;
function getDb() {
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$neon$2d$connection$2d$string$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolvePostgresUrlFromEnv"])();
    if (!url) return null;
    if (!sqlSingleton || normalizedUrl !== url) {
        sqlSingleton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$neondatabase$2b$serverless$40$0$2e$10$2e$4$2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["neon"])(url);
        normalizedUrl = url;
    }
    return sqlSingleton;
}
}}),
"[project]/src/lib/cms-pages-db.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchCmsPageOverlay": (()=>fetchCmsPageOverlay),
    "mergeCmsOverlay": (()=>mergeCmsOverlay),
    "routeKeyToDbPageKey": (()=>routeKeyToDbPageKey),
    "upsertCmsPageRow": (()=>upsertCmsPageRow)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
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
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
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
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
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
"[project]/src/lib/projects-db.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "deleteProjectFromDb": (()=>deleteProjectFromDb),
    "getProjectFromDb": (()=>getProjectFromDb),
    "listProjectsFromDb": (()=>listProjectsFromDb),
    "upsertProjectToDb": (()=>upsertProjectToDb)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
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
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
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
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
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
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
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
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
    if (!db) throw new Error("Database not configured");
    await db`
    DELETE FROM portfolio_projects
    WHERE id = ${id} AND locale = ${locale}
  `;
}
}}),
"[project]/src/lib/content.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mdc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mdc.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cms-pages-db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$projects$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/projects-db.ts [app-rsc] (ecmascript)");
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
    const dbRows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$projects$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listProjectsFromDb"])(locale) ?? [];
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
    if (process.env.VERCEL === "1" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])()) {
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
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDb"])();
        if (!db) return;
        const pageKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routeKeyToDbPageKey"])("about");
        for (const loc of ALL_LOCALES){
            if (loc === savedLocale) continue;
            const disk = loadPageFromDisk(loc, "about");
            if (!disk) continue;
            const overlay = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchCmsPageOverlay"])(pageKey, loc);
            const merged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeCmsOverlay"])(disk, overlay);
            const slots = {
                ...merged.slots,
                profile_image: profileImage
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["upsertCmsPageRow"])(pageKey, loc, {
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
    const { data, content } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(raw);
    const block = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mdc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["firstMdcBlockName"])(content);
    const slots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mdc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseMdcBlock"])(content, block);
    return {
        meta: data,
        slots,
        block
    };
}
async function getPageByRoute(locale, routeKey) {
    const disk = loadPageFromDisk(locale, routeKey);
    if (!disk) return null;
    const overlay = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchCmsPageOverlay"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routeKeyToDbPageKey"])(routeKey), locale);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2d$pages$2d$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mergeCmsOverlay"])(disk, overlay);
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
            m.set(slug, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(raw).data);
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
                meta: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(raw).data
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
        const { data, content } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(raw);
        return {
            meta: data,
            body: content.trim()
        };
    }
    const hasEn = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(enPath);
    const hasLoc = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(locPath);
    if (!hasEn && hasLoc) {
        const raw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(locPath, "utf8");
        const { data, content } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(raw);
        return {
            meta: data,
            body: content.trim()
        };
    }
    if (!hasEn) return null;
    const enRaw = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(enPath, "utf8");
    const enParsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(enRaw);
    const enMeta = enParsed.data;
    const enBody = enParsed.content.trim();
    if (!hasLoc) {
        return {
            meta: enMeta,
            body: enBody
        };
    }
    const locParsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(locPath, "utf8"));
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
    return rows.map((r)=>({
            ...r.project,
            id: r.id
        }));
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
    const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mdc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["serializeMdcBlock"])(block, slots);
    const raw = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].stringify(body.trimEnd(), meta);
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
    const raw = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gray$2d$matter$40$4$2e$0$2e$3$2f$node_modules$2f$gray$2d$matter$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].stringify(body.trimEnd() ? `${body.trimEnd()}\n` : "", meta);
    __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, raw, "utf8");
}
function deleteArticleFile(locale, slug) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Invalid slug");
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(CONTENT_DIR, locale, "articles", `${slug}.md`);
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].existsSync(filePath)) __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].unlinkSync(filePath);
}
}}),
"[project]/src/components/MarkdownBody.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MarkdownBody": (()=>MarkdownBody)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const MarkdownBody = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call MarkdownBody() from the server but MarkdownBody is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/MarkdownBody.tsx <module evaluation>", "MarkdownBody");
}}),
"[project]/src/components/MarkdownBody.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MarkdownBody": (()=>MarkdownBody)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const MarkdownBody = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call MarkdownBody() from the server but MarkdownBody is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/MarkdownBody.tsx", "MarkdownBody");
}}),
"[project]/src/components/MarkdownBody.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MarkdownBody$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/MarkdownBody.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MarkdownBody$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/MarkdownBody.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MarkdownBody$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/[locale]/articles/[slug]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ArticlePage),
    "generateMetadata": (()=>generateMetadata),
    "generateStaticParams": (()=>generateStaticParams)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/routing.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$server$2f$react$2d$server$2f$getTranslations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getTranslations$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@3.26.5_next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0__react@19.0.0/node_modules/next-intl/dist/esm/server/react-server/getTranslations.js [app-rsc] (ecmascript) <export default as getTranslations>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$468$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@0.468.0_react@19.0.0/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-rsc] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MarkdownBody$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MarkdownBody.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function generateStaticParams() {
    const paths = [];
    for (const locale of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["routing"].locales){
        for (const { slug } of (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listArticles"])(locale)){
            paths.push({
                locale,
                slug
            });
        }
    }
    return paths;
}
async function generateMetadata({ params }) {
    const { locale, slug } = await params;
    const article = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getArticle"])(locale, slug);
    if (!article) return {
        title: "Not found"
    };
    return {
        title: article.meta.title,
        description: article.meta.description,
        openGraph: {
            images: [
                {
                    url: article.meta.image
                }
            ]
        }
    };
}
async function ArticlePage({ params }) {
    const { locale, slug } = await params;
    const article = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getArticle"])(locale, slug);
    if (!article) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const t = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$server$2f$react$2d$server$2f$getTranslations$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__getTranslations$3e$__["getTranslations"])("writing");
    const { meta, body } = article;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Link"], {
                href: "/writing",
                className: "mx-auto my-8 flex w-full max-w-5xl cursor-pointer items-center gap-2 px-4 text-muted transition-colors duration-200 hover:text-[var(--font-primary)] xl:max-w-6xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$468$2e$0_react$40$19$2e$0$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        className: "size-4 flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/articles/[slug]/page.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-extralight",
                        children: t("title")
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/articles/[slug]/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/articles/[slug]/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                className: "writing mx-auto w-full max-w-5xl px-4 pb-16 xl:max-w-6xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: meta.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/articles/[slug]/page.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "info-section mt-4 flex flex-col gap-2 text-[#7d8084] sm:mt-5 sm:flex-row sm:gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: meta.date
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/articles/[slug]/page.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hidden sm:block",
                                children: "|"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/articles/[slug]/page.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    meta.readingTime,
                                    " ",
                                    t("readingTime")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/[locale]/articles/[slug]/page.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/articles/[slug]/page.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MarkdownBody$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MarkdownBody"], {
                        source: body
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/articles/[slug]/page.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/articles/[slug]/page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}}),
"[project]/src/app/[locale]/articles/[slug]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[locale]/articles/[slug]/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__960d68f9._.js.map