import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // =========================================
  // Ignored directories
  // =========================================
  globalIgnores([
    "dist",
    "backend/node_modules",
    "node_modules",
  ]),

  // =========================================
  // Frontend - React / Browser
  // =========================================
  {
    files: ["src/**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // =========================================
  // Backend - Node.js
  // =========================================
  {
    files: ["backend/**/*.js"],
    extends: [
      js.configs.recommended,
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },

  // =========================================
  // Root JavaScript files
  // =========================================
  {
    files: ["*.js"],
    extends: [
      js.configs.recommended,
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
]);