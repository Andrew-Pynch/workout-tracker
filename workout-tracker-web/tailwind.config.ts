import { type Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

export const SECONDARY = "#E7FD32";
export const SUCCESS = "#47AA56";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: "#011315",
      secondary: "#E7FD32",
      tertiary: "#0F2F36",
      accent: "#C3E2E2",
      success: "#47AA56",
      backgroundInvert: "#F5F5EB",
      backgroundInvertAccent: "#d9ded7",
      "light-gray": "#E4E4E4",
      "dark-gray": "#B7BFCA",
      destructive: "#710a0b",
    },
    extend: {
      fontFamily: {
        "noto-serif": ["var(--font-noto-serif)"],
        "space-mono": ["var(--font-space-mono)"],
        "ibm-plex-mono": ["var(--font-ibm-mono)"],
        faktum: ["var(--font-faktum)"],
      },
      boxShadow: {
        outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["focus"],
    },
  },
  plugins: [],
} satisfies Config;
