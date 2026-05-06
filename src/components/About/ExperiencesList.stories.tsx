import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExperiencesList } from "@/components/About/ExperiencesList";

const meta: Meta<typeof ExperiencesList> = {
  title: "About/ExperiencesList",
  component: ExperiencesList,
};

export default meta;

type Story = StoryObj<typeof ExperiencesList>;

export const Default: Story = {
  args: {
    heading: "Experiences",
    experiences: [
      { title: "Front-End Developer", company: "ShowHeroes", date: "2021 - Today" },
      { title: "Web Designer", company: "YourMove", date: "2018 - 2021" },
      { title: "Art Director", company: "Art Ovation Hotel", date: "2017" },
    ],
  },
};

