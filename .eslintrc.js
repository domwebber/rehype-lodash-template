module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  plugins: [
    "prettier",
    "@typescript-eslint",
  ],
  extends: [
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: [
    "__tests__/**/*"
  ],
  rules: {
    "prettier/prettier": [
      "error",
    ],
  },
};
