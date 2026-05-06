import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContactForm } from "@/components/Contact/ContactForm";

const meta: Meta<typeof ContactForm> = {
  title: "Pages/Contact",
  component: ContactForm,
};

export default meta;

type Story = StoryObj<typeof ContactForm>;

export const Enabled: Story = {
  args: {
    resendEnabled: true,
    slots: {
      title: "Contact me",
      subtitle: "Let’s talk about your ideas, projects, or anything else.",
    },
  },
};

export const Disabled: Story = {
  args: {
    resendEnabled: false,
    slots: {
      title: "Contact me",
      subtitle: "Email sending is disabled until RESEND_API_KEY is set.",
    },
  },
};

