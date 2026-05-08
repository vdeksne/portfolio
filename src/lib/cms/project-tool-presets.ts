/** Common stack options for the admin Projects “tools” field (display = stored value). */
export const PROJECT_TOOL_PRESETS = [
  "JavaScript",
  "React",
  "Vue.js",
  "Next.js",
  "Vercel",
  "Supabase",
  "Stripe",
  "Storybook",
  "shadcn/ui",
  "Tailwind CSS",
  "Node",
  "Nest",
  "C++",
  "C#",
  "C",
  "Python",
  "PHP",
  "Figma",
  "AfterEffects",
  "PremierePro",
  "InDesign",
  "Photoshop",
  "Illustrator",
  "Lightroom",
] as const;

export type ProjectToolPreset = (typeof PROJECT_TOOL_PRESETS)[number];

const presetSet = new Set<string>(PROJECT_TOOL_PRESETS);

/** Presets that appear in `tools`, in canonical order; extras are everything else. */
export function splitToolsIntoPresetsAndExtra(
  tools: string[] | undefined,
): { presets: ProjectToolPreset[]; extraCommaSeparated: string } {
  const list = tools ?? [];
  const presets = PROJECT_TOOL_PRESETS.filter((p) => list.includes(p));
  const extra = list.filter((t) => !presetSet.has(t));
  return { presets, extraCommaSeparated: extra.join(", ") };
}

/** Ordered list for saving: presets in preset order, then extra (deduped). */
export function mergeProjectTools(
  selectedPresets: Set<string>,
  extraCommaSeparated: string,
): string[] {
  const orderedPresets = PROJECT_TOOL_PRESETS.filter((p) => selectedPresets.has(p));
  const seen = new Set<string>(orderedPresets);
  const out: string[] = [...orderedPresets];
  for (const raw of extraCommaSeparated.split(",")) {
    const t = raw.trim();
    if (!t || seen.has(t)) continue;
    out.push(t);
    seen.add(t);
  }
  return out;
}
