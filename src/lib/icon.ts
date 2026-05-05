export function iconSrc(icon: string): string {
  if (!icon.startsWith("custom:")) return icon;
  const name = icon.slice("custom:".length);
  return `/icons/${name}.svg`;
}
