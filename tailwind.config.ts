import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
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
        darkGray: "#101010",
        transparentDarkGray: "rgba(18, 18, 18, 0.8)",
        semiDarkGray: "#282828",
      },
      fontFamily: {
        Bodoni: ['BodoniModa', 'serif'],
        Apparel: ['Apparel', 'serif'],
        NotoSans: ['NotoSans', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addBase }: {
      addBase: (arg0: { ul: { listStyleType: string; paddingLeft: string; }; ol: { listStyleType: string; paddingLeft: string; }; }) => void;
    }) {
      addBase({
        ul: { listStyleType: 'disc', paddingLeft: '1.25rem' },
        ol: { listStyleType: 'decimal', paddingLeft: '1.25rem' },
      });
    },

  ],
};
export default config;
