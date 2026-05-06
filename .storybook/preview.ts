import React from "react";
import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";
import { IntlDecorator } from "./IntlDecorator";
import { Toaster } from "sonner";

const preview: Preview = {
  decorators: [
    (Story, ctx) => {
      const locale = (ctx.globals.locale as "en" | "lv") ?? "en";
      return React.createElement(
        IntlDecorator,
        { locale },
        React.createElement(
          "div",
          { className: "min-h-screen bg-(--ui-bg) text-(--font-primary) p-6 sm:p-10" },
          React.createElement(
            React.Fragment,
            null,
            React.createElement(Story),
            React.createElement(Toaster, { closeButton: true }),
          ),
        ),
      );
    },
  ],
  globalTypes: {
    locale: {
      description: "Locale",
      defaultValue: "en",
      toolbar: {
        title: "Locale",
        items: [
          { value: "en", title: "English" },
          { value: "lv", title: "Latviešu" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
