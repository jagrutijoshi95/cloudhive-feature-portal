import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", // blue-500
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F3F4F6", // gray-100
          foreground: "#1F2937", // gray-800
        },
        destructive: {
          DEFAULT: "#EF4444", // red-500
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F3F4F6", // gray-100
          foreground: "#1F2937", // gray-800
        },
        background: "#F9FAFB", // gray-50
        foreground: "#111827", // gray-900
        muted: {
          DEFAULT: "#F3F4F6", // gray-100
          foreground: "#6B7280", // gray-500
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827", // gray-900
        },
        border: "#E5E7EB", // gray-200
        input: "#E5E7EB", // gray-200
        ring: "#3B82F6", // blue-500
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "#111827",
            a: {
              color: "#3B82F6",
              "&:hover": {
                color: "#2563EB",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
