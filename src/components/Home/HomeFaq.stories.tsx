import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HomeFaq } from "@/components/Home/HomeFaq";

const meta: Meta<typeof HomeFaq> = {
  title: "Sections/HomeFaq",
  component: HomeFaq,
};

export default meta;

type Story = StoryObj<typeof HomeFaq>;

export const Default: Story = {
  args: {
    faq: {
      title: "FAQ",
      subtitle: "Quick answers to common questions.",
      faqQuestions: [
        {
          title: "Work",
          questions: [
            { label: "What do you build?", content: "Modern websites and UI systems." },
            { label: "Do you do design?", content: "Yes — design + engineering together." },
          ],
        },
        {
          title: "Process",
          questions: [
            { label: "How do we start?", content: "A short call, then a scoped plan." },
            { label: "Typical timeline?", content: "Usually 2–6 weeks depending on scope." },
          ],
        },
      ],
    },
  },
};

