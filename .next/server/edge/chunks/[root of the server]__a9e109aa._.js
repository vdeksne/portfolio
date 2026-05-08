(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__a9e109aa._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/src/messages/en.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"navigation\":{\"home\":\"Home\",\"works\":\"Works\",\"writing\":\"Writing\",\"stack\":\"Stack\",\"about\":\"About\",\"contact\":\"Contact\"},\"contact\":{\"title\":\"Contact me\",\"description\":\"Let's talk about your ideas, projects or anything else\",\"fullname\":\"Fullname\",\"email\":\"Email\",\"phone\":\"Phone\",\"subject\":\"Subject of your message\",\"message\":\"Message\",\"submit\":\"Send\",\"disabled\":\"You must set your resend API key\",\"success\":\"Your message has been sent successfully\",\"error\":\"Oups, an error occurred while sending your message\",\"budget\":\"Budget\",\"subject_types\":{\"project\":\"Talk about a project\",\"bug\":\"Report a bug\",\"question\":\"Ask a question\",\"other\":\"Other\"}},\"global\":{\"app_description\":\"A beautiful portfolio built with Next.js and Tailwind CSS. Made with ❤️ by Viktorija Deksne\",\"copied_to_clipboard\":\"Copied to clipboard\",\"article_link_copied\":\"Article link copied to clipboard\",\"email_copied\":\"Email copied to clipboard\",\"back_to_home\":\"Back to home\",\"switch_latvian\":\"Switch to Latvian\",\"switch_english\":\"Switch to english\",\"search\":\"Search for an command\",\"command\":\"Available commands\",\"not_found\":\"Command not found\",\"see_more\":\"See more\",\"soon\":\"Coming soon\",\"experiences\":\"Experiences\",\"education\":\"Education\",\"certifications\":\"Certifications\",\"about_intro\":\"Introduction\",\"contact\":\"Let's work together\",\"email\":\"Copy email\",\"cv\":\"CV\",\"meeting\":\"Schedule a meeting\",\"available\":\"Available for new opportunities\",\"unavailable\":\"Currently working on other awesome projects\",\"all_rights_reserved\":\"All rights reserved\"},\"writing\":{\"title\":\"Writing\",\"description\":\"A collection of my writing\",\"empty\":\"No writing yet, check back soon!\",\"not_found\":\"No writing found\",\"not_found_description\":\"We couldn't find the writing you were looking for.\",\"back_link\":\"Back to writing\",\"readingTime\":\"minutes to read\",\"share\":\"Share article\",\"copy_link\":\"Copy link\",\"search_article\":\"Search article\",\"blog\":\"Blog\",\"unknown_author\":\"Unknown author\",\"show_search\":\"Search\",\"hide_search\":\"Hide search\"}}"));}}),
"[project]/src/messages/lv.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"navigation\":{\"home\":\"Sākumlapa\",\"works\":\"Projekti\",\"writing\":\"Raksti\",\"stack\":\"Tehnoloģijas\",\"about\":\"Par mani\",\"contact\":\"Kontakti\"},\"contact\":{\"title\":\"Sazinieties ar mani\",\"description\":\"Apspriedīsim Tavu ideju, projektu vai jebko citu!\",\"fullname\":\"Vārds\",\"email\":\"E-pasts\",\"phone\":\"Tālrunis\",\"subject\":\"Ziņojuma temats\",\"message\":\"Ziņojums\",\"submit\":\"Nosūtīt\",\"disabled\":\"Jums jāiestata sava Resend API atslēga\",\"success\":\"Jūsu ziņojums ir veiksmīgi nosūtīts\",\"error\":\"Ak, ziņojuma nosūtīšanas laikā radās kļūda :(\",\"budget\":\"Budžets\",\"subject_types\":{\"project\":\"Runāt par projektu\",\"bug\":\"Ziņot par kļūdu\",\"question\":\"Uzdot jautājumu\",\"other\":\"Cits\"}},\"global\":{\"app_description\":\"Viktorijas Deksnes portfolio, izveidots ar Next.js\",\"copied_to_clipboard\":\"Kopēts starpliktuvē\",\"article_link_copied\":\"Raksta saite kopēta starpliktuvē\",\"email_copied\":\"E-pasts kopēts starpliktuvē\",\"back_to_home\":\"Atpakaļ uz sākumlapu\",\"switch_latvian\":\"Pārslēgt uz latviešu valodu\",\"switch_english\":\"Pārslēgt uz angļu valodu\",\"search\":\"Meklēt\",\"command\":\"Pieejamās komandas\",\"not_found\":\"Neviena komanda nav atrasta\",\"see_more\":\"Redzēt vairāk\",\"soon\":\"Drīzumā pieejams\",\"experiences\":\"Pieredze\",\"education\":\"Izglītība\",\"certifications\":\"Sertifikāti\",\"about_intro\":\"Ievads\",\"contact\":\"Sazināsimies\",\"email\":\"Kopēt e-pastu\",\"cv\":\"CV\",\"meeting\":\"Pieteikt tikšanos\",\"available\":\"Pieejama jaunām iespējām\",\"unavailable\":\"Pašlaik strādāju pie citiem aizraujošiem projektiem\",\"all_rights_reserved\":\"Visas tiesības aizsargātas\"},\"writing\":{\"title\":\"Raksti\",\"description\":\"Daži raksti par tēmām, kas man ir svarīgas\",\"empty\":\"Pagaidām nav rakstu, bet drīzumā tie būs!\",\"not_found\":\"Nevviens raksts neatbilst jūsu meklējumam\",\"not_found_description\":\"Mēs neatradām nevienu rakstu, kas atbilstu jūsu meklējumam. Mēģiniet meklēt ar citiem atslēgvārdiem.\",\"back_link\":\"Atpakaļ uz rakstu sarakstu\",\"readingTime\":\"min lasīšanai\",\"share\":\"Dalīties ar rakstu\",\"copy_link\":\"Kopēt saiti\",\"search_article\":\"Meklēt rakstu\",\"blog\":\"Blogs\",\"unknown_author\":\"Nezināms autors\",\"show_search\":\"Meklēšana\",\"hide_search\":\"Paslēpt meklēšanu\"}}"));}}),
"[project]/src/i18n/request.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@3.26.5_next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0__react@19.0.0/node_modules/next-intl/dist/esm/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript) <export default as getRequestConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/routing.ts [middleware-edge] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__["getRequestConfig"])(async ({ requestLocale })=>{
    let locale = await requestLocale;
    if (!locale || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"].locales.includes(locale)) {
        locale = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"].defaultLocale;
    }
    return {
        locale,
        messages: (await __turbopack_context__.f({
            "../messages/en.json": {
                id: ()=>"[project]/src/messages/en.json (json)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/src/messages/en.json (json)"))
            },
            "../messages/lv.json": {
                id: ()=>"[project]/src/messages/lv.json (json)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/src/messages/lv.json (json)"))
            }
        }).import(`../messages/${locale}.json`)).default
    };
});
}}),
"[project]/src/i18n/routing.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Link": (()=>Link),
    "redirect": (()=>redirect),
    "routing": (()=>routing),
    "usePathname": (()=>usePathname),
    "useRouter": (()=>useRouter)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$routing$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@3.26.5_next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0__react@19.0.0/node_modules/next-intl/dist/routing.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@3.26.5_next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0__react@19.0.0/node_modules/next-intl/dist/esm/navigation/react-server/createNavigation.js [middleware-edge] (ecmascript) <export default as createNavigation>");
;
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$routing$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["defineRouting"])({
    locales: [
        "en",
        "lv"
    ],
    defaultLocale: "en",
    localePrefix: "always"
});
const { Link, redirect, usePathname, useRouter } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__["createNavigation"])(routing);
}}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-intl@3.26.5_next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0__react@19.0.0/node_modules/next-intl/dist/middleware.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.6_@babel+core@7.29.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/routing.ts [middleware-edge] (ecmascript)");
;
;
;
const intlMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$intl$40$3$2e$26$2e$5_next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2d$intl$2f$dist$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"]);
function middleware(request) {
    const { pathname } = request.nextUrl;
    /** Admin lives outside `[locale]`; strip mistaken locale prefix from bookmarks/old links */ const prefixedAdmin = pathname.match(/^\/(en|lv)(\/admin(?:\/.*)?)$/);
    if (prefixedAdmin) {
        const url = request.nextUrl.clone();
        url.pathname = prefixedAdmin[2] ?? "/admin";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    return intlMiddleware(request);
}
const config = {
    matcher: [
        // Exclude api, admin, static and framework paths from running middleware at all
        "/((?!api|admin|_next|_vercel|.*\\..*).*)",
        "/"
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__a9e109aa._.js.map