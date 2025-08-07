import type { FeatureConfig } from "./../core/types";
import path from "path";
import { fileURLToPath } from "url";
import { materialTailwindPalette } from "./material-tailwind-palette";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const features: FeatureConfig[] = [
  {
    name: "Eruda Console",
    description:
      "A console for mobile browsers, useful for debugging on mobile devices.",
    key: "eruda",
    dependencies: ["eruda"],
    fileOperations: [
      {
        type: "inject",
        file: "index.html",
        content:
          '<script defer src="js/eruda.js"></script>\n<script>eruda.init()</script>',
        marker: /<!--\s*CLI_SCRIPTS\s*-->/,
        options: {
          format: true,
        },
      },
      {
        type: "copy",
        file: "public/js/eruda.js",
        source: path.resolve(__dirname, "../features/eruda/eruda.js"),
      },
    ],
  },
  {
    name: "Tailwind CSS",
    description: "Integrate Tailwind CSS for utility-first styling.",
    key: "tailwind",
    dependencies: ["tailwindcss", "postcss", "autoprefixer"],
    fileOperations: [
      {
        type: "copy",
        file: "tailwind.config.js",
        source: "./features/tailwind/tailwind.config.js",
      },
      {
        type: "create",
        file: "src/index.css",
        content: "@tailwind base;\n@tailwind components;\n@tailwind utilities;",
      },
    ],
  },
  {
    name: "Material You",
    description: "",
    key: "material-you",
    dependencies: [""],
    fileOperations: [
      {
        type: "copy",
        file: "src/assets/css/dark.css",
        source: "./features/material-you/dark.css",
      },
      {
        type: "copy",
        file: "src/assets/css/light.css",
        source: "./features/material-you/light.css",
      },
      {
        type: "inject",
        file: "tailwind.config.js",
        marker: /\/\*\s*CLI_INJECT_TAILWIND\s*\*\//,
        content: materialTailwindPalette,
        options: {
          format: true,
        },
      },
      {
        type: "inject",
        file: "src/main.tsx",
        marker: /\/\*\s*CLI_INJECT_IMPORTS\s*\*\//,
        content: `import 'assets/light.css';\nimport 'assets/css/dark.css';`,
        options: {
          format: true,
        },
      },
    ],
  },
];

export const Features = ["tailwind", "eruda", "material-you"] as const;
export type FeatureKey = (typeof Features)[number];
