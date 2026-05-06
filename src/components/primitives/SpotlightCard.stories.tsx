import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SpotlightCard } from "@/components/primitives/SpotlightCard";

const meta: Meta<typeof SpotlightCard> = {
  title: "Primitives/SpotlightCard",
  component: SpotlightCard,
};

export default meta;

type Story = StoryObj<typeof SpotlightCard>;

export const Default: Story = {
  render: () => (
    <SpotlightCard className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-white/70">Default spotlight card content</p>
    </SpotlightCard>
  ),
};

export const White: Story = {
  render: () => (
    <SpotlightCard white className="w-72 p-6">
      <p className="text-sm text-white/70">White variant</p>
    </SpotlightCard>
  ),
};

