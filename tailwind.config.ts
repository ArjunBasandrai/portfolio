import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      margin: {
        'projects-card': 'calc(100vh - 8rem)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#511281",
        secondary: "#C1F8CF",
      },
      fontFamily: {
        Bodoni: ['BodoniModa', 'serif'],
        Apparel: ['Apparel', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
