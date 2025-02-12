import { eslintConfig } from "eslint-prettier-config";

/** @type {import('eslint').Linter.Config[]} */ export default [
  ...eslintConfig,
  {
    files: ["**/*.ts"],
    ignores: ["**/dist/**"],
    languageOptions: {
      sourceType: "module",
    },
  },
];
