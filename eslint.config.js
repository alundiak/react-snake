import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import vitest from "@vitest/eslint-plugin";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    extends: [js.configs.recommended],
  },
  {
    files: ["**/*.{ts,mts,cts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: { "@typescript-eslint": ts },
    rules: {
      ...ts.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: { react },
    rules: {
      ...react.configs.flat.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules, // or vitest.configs.all.rules to enable all rules
      "vitest/max-nested-describe": ["error", { max: 3 }],
    },
  },
]);
