import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Unused vars warning unless starts with _
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
      }],

      // Allow empty interfaces
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-object-type": "off",

      // Allow <img> tag
      "@next/next/no-img-element": "off",

      // Warn instead of error for exhaustive-deps
      "react-hooks/exhaustive-deps": "warn",

      // Optional: disable type checking errors
      "@typescript-eslint/no-explicit-any": "off",

      // Optional: ignore unused imports
      "no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
