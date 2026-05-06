import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AboutProfilePicture } from "@/components/About/AboutProfilePicture";

const meta: Meta<typeof AboutProfilePicture> = {
  title: "About/AboutProfilePicture",
  component: AboutProfilePicture,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof AboutProfilePicture>;

export const Default: Story = {
  args: {
    pictureSrc:
      "https://raw.githubusercontent.com/vdeksne/portfolio2024_images/main/about/profile_img_V4.png",
  },
};

