import globals from "globals";
import pluginJs from "@eslint/js";
import cypressPlugin from "eslint-plugin-cypress"

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals["cypress/globals"],
      },
      ecmaVersion: 2020,
      sourceType: "module",
    },
    plugins: {
      cypress: cypressPlugin
    }
  },
  pluginJs.configs.recommended,
  cypressPlugin.configs.recommended
];
