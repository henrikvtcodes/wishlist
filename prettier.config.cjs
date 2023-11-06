/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  plugins: [
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  // pluginSearchDirs: false,

  importOrder: [
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "",
    "~/(.*)$",
    "^[.]", // relative imports
  ],
  importOrderTypeScriptVersion: "5.1.3",
};

module.exports = config;
