import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpotlightButton } from "@/components/primitives/SpotlightButton";

const meta: Meta<typeof SpotlightButton> = {
  title: "Primitives/SpotlightButton",
  component: SpotlightButton,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof SpotlightButton>;

export const Default: Story = {
  render: () => <SpotlightButton className="px-6 py-2 text-white">Button</SpotlightButton>,
};

export const Rounded: Story = {
  render: () => (
    <SpotlightButton rounded className="px-6 py-2 text-white">
      Rounded
    </SpotlightButton>
  ),
};

export const Transparent: Story = {
  render: () => (
    <SpotlightButton transparent className="px-6 py-2 text-white">
      Transparent
    </SpotlightButton>
  ),
};

