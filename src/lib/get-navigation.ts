export type HomeNavName =
  | "home"
  | "works"
  | "writing"
  | "about"
  | "contact";

export type NavigationItem = {
  name: HomeNavName;
  to: string;
};

export function getHomeNavItems(): NavigationItem[] {
  return [
    { name: "home", to: "/" },
    { name: "works", to: "/works" },
    { name: "writing", to: "/writing" },
    { name: "about", to: "/about" },
    { name: "contact", to: "/contact" },
  ];
}
