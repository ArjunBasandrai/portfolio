import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://arjunbasandrai.dev",
  output: "static",
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/404"),
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname;
        if (path === "/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (path === "/projects/" || path === "/projects") {
          item.priority = 0.9;
          item.changefreq = "weekly";
        } else if (path.startsWith("/projects/")) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        } else {
          item.priority = 0.6;
          item.changefreq = "monthly";
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
