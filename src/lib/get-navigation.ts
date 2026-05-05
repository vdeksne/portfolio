export type HomeNavName =
  | "home"
  | "works"
  | "writing"
  | "about"
  | "contact";

export type NavigationItem = {
  name: HomeNavName;
  to: string;
  icon: "Home" | "Briefcase" | "Library" | "User" | "Mail";
};

export function getHomeNavItems(): NavigationItem[] {
  return [
    { name: "home", to: "/", icon: "Home" },
    { name: "works", to: "/works", icon: "Briefcase" },
    { name: "writing", to: "/writing", icon: "Library" },
    { name: "about", to: "/about", icon: "User" },
    { name: "contact", to: "/contact", icon: "Mail" },
  ];
}
