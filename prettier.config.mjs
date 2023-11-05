/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports",
  ],

  importOrder: [
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "",
    "~/(.*)$",
    "^[.]", // relative imports
  ],
  importOrderTypeScriptVersion: "5.1.3",
};

export default config;
