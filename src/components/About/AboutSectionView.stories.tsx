import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AboutSectionView } from "@/components/About/AboutSectionView";

const meta: Meta<typeof AboutSectionView> = {
  title: "Pages/About",
  component: AboutSectionView,
};

export default meta;

type Story = StoryObj<typeof AboutSectionView>;

export const Default: Story = {
  args: {
    title: "About",
    subtitle: "A few words about my work and direction.",
    profileImage:
      "https://raw.githubusercontent.com/vdeksne/portfolio2024_images/main/about/profile_img_V4.png",
    introLabel: "Introduction",
    intro:
      "Hello! I’m a developer and art director based in Riga, Latvia.\n\nI build tailored web experiences that blend design and engineering — with a focus on clarity, craft, and performance.",
    experiencesLabel: "Experiences",
    experiences: [
      { title: "Front-End Developer", company: "ShowHeroes", date: "2021 - Today" },
      { title: "Web Designer", company: "YourMove", date: "2018 - 2021" },
      { title: "Art Director", company: "Art Ovation Hotel", date: "2017" },
    ],
    stackHeading: "Stack",
    stackDescription: "Tools I enjoy working with lately.",
    stackItems: [
      { name: "React", link: "https://react.dev/" },
      { name: "Next.js", link: "https://nextjs.org/" },
      { name: "Tailwind CSS", link: "https://tailwindcss.com/" },
      { name: "Figma", link: "https://www.figma.com/" },
    ],
  },
};

