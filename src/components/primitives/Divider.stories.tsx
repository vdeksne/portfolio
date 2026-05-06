import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Divider } from "@/components/primitives/Divider";

const meta: Meta<typeof Divider> = {
  title: "Primitives/Divider",
  component: Divider,
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div className="max-w-xl">
      <p className="text-white/75">Above</p>
      <Divider className="my-6" />
      <p className="text-white/75">Below</p>
    </div>
  ),
};

