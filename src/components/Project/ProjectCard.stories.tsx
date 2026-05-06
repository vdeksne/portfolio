import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectCard } from "@/components/Project/ProjectCard";

const meta: Meta<typeof ProjectCard> = {
  title: "Cards/ProjectCard",
  component: ProjectCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    project: {
      name: "Portfolio 2026",
      image:
        "https://raw.githubusercontent.com/vdeksne/portfolio2024_images/main/projects/project_1.png",
      link: "https://example.com",
      release: "Live",
      featured: true,
    },
  },
};

export const ComingSoon: Story = {
  args: {
    project: {
      name: "Secret Project",
      image:
        "https://raw.githubusercontent.com/vdeksne/portfolio2024_images/main/projects/project_2.png",
      link: "https://example.com",
      release: "soon",
      featured: true,
    },
  },
};

