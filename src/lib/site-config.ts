export const siteConfig = {
  global: {
    meetingLink: "https://cal.com/viktorija-deksne/15min",
    available: true,
  },
  profile: {
    name: "Viktorija Deksne",
    job: "Frontend Engineer and Designer",
    email: "viktorijadeksne@gmail.com",
    phone: "(+371) 27266132",
    picture:
      "https://raw.githubusercontent.com/vdeksne/portfolio2024_images/main/about/profile_img_V4.png",
  },
  socials: {
    github: "https://github.com/vdeksne",
    twitter: "https://twitter.com/DeksneViktorija",
    linkedin: "https://www.linkedin.com/in/vdeksne/",
    instagram: "https://www.instagram.com/viktorija_deksne/",
    spotify:
      "https://open.spotify.com/user/1114444662?si=15a6f8dfc27a4b61",
  },
  seo: {
    title: "Viktorija Deksne Portfolio",
    description: "Made with ❤️ by Viktorija Deksne.",
    url: "https://viktorijadeksne.app/",
    ogImage:
      "https://raw.githubusercontent.com/vdeksne/portfolio2024_images/main/about/profile_img_V4.png",
  },
  appName: "Portfolio",
} as const;

export type SiteConfig = typeof siteConfig;

export const experiences = [
  {
    title: "Front-End Developer",
    company: "ShowHeroes",
    date: "2021 - Today",
  },
  {
    title: "Web Designer",
    company: "YourMove",
    date: "2018 - 2021",
  },
  {
    title: "Art Director",
    company: "Art Ovation Hotel",
    date: "2017",
  },
  {
    title: "Art Director",
    company: "Porter Family Vineyards",
    date: "2016",
  },
] as const;
