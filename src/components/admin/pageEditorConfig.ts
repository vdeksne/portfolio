export const PAGE_EDITOR_SLUGS = [
  "home",
  "works",
  "writing",
  "about",
  "contact",
] as const;

export type PageEditorSlug = (typeof PAGE_EDITOR_SLUGS)[number];

export type PageFieldDef = {
  key: string;
  label: string;
  rows?: number;
  hint?: string;
  /** Default: multi-line text. Use `image` for URL + upload (About profile photo). */
  kind?: "textarea" | "image";
};

export type PageEditorDefinition = {
  block: string;
  group: string;
  fields: PageFieldDef[];
};

export const PAGE_EDITOR: Record<PageEditorSlug, PageEditorDefinition> = {
  home: {
    block: "home",
    group: "Home — hero",
    fields: [
      { key: "hero_title", label: "Headline", rows: 2 },
      {
        key: "hero_subtitle",
        label: "Supporting paragraph",
        rows: 8,
        hint: "Shown under the headline on the landing section.",
      },
    ],
  },
  works: {
    block: "works",
    group: "Works — page header",
    fields: [
      { key: "title", label: "Page title", rows: 1 },
      { key: "subtitle", label: "Subtitle", rows: 3 },
    ],
  },
  writing: {
    block: "writing",
    group: "Writing — page header",
    fields: [
      { key: "title", label: "Page title", rows: 1 },
      { key: "subtitle", label: "Subtitle", rows: 3 },
    ],
  },
  about: {
    block: "about",
    group: "About — headline, photo, bio, education, stack, certifications, experiences",
    fields: [
      { key: "title", label: "Page title", rows: 1 },
      { key: "subtitle", label: "Subtitle", rows: 2 },
      {
        key: "profile_image",
        label: "Profile photo",
        kind: "image",
        hint: "Use JPEG/PNG/WebP (not iPhone HEIC unless you export first). Upload max 4 MB or paste an HTTPS URL. Saving About updates this URL for English and Latvian.",
      },
      {
        key: "intro",
        label: "Introduction",
        rows: 10,
        hint: "Bio next to your photo on the public page (intro label is translated; body is whatever you type here).",
      },
      {
        key: "stack_title",
        label: "Stack section title",
        rows: 1,
        hint: "Heading above the tools list. If empty, the site falls back to the nav label (“Stack” / “Tehnoloģijas”).",
      },
      {
        key: "stack_description",
        label: "Stack section description",
        rows: 3,
        hint: "Short line under the title. Tool names themselves are edited in Pages → Stack (shared JSON), not here.",
      },
      {
        key: "education_title",
        label: "Education section title",
        rows: 1,
        hint: "Heading above the education list. If empty, the site uses “Education” / “Izglītība”. Entries are edited in Editor → Education.",
      },
      {
        key: "education_description",
        label: "Education section description",
        rows: 3,
        hint: "Optional line under the title. Individual entries are in content/education.json via the Education tab.",
      },
      {
        key: "certifications_title",
        label: "Certifications section title",
        rows: 1,
        hint: "Heading above the certifications list. If empty, the site uses “Certifications” / “Sertifikāti”. Entries are edited in Editor → Certifications.",
      },
      {
        key: "certifications_description",
        label: "Certifications section description",
        rows: 3,
        hint: "Optional line under the title. Individual certificates are in content/certifications.json via the Certifications tab.",
      },
      {
        key: "experiences",
        label: "Experience block (MDC)",
        rows: 12,
        hint: "Optional. Only used if the front-end reads this slot; keeps file content in sync.",
      },
    ],
  },
  contact: {
    block: "contact",
    group: "Contact — page header",
    fields: [
      { key: "title", label: "Page title", rows: 1 },
      { key: "subtitle", label: "Subtitle", rows: 3 },
    ],
  },
};
