module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: [
    "prettier",
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: [
    "**/*.spec.*",
    "**/*.test.*",
  ],
  rules: {
    "prettier/prettier": [
      "error",
    ],
  },
  overrides: [
    {
      files: ["**/*.test.*", "**/*.spec.*"],
      plugins: ["jest"],
      extends: [
        "plugin:jest/recommended",
        "plugin:jest/style",
      ],
      rules: {
        "@typescript-eslint/unbound-method": "off",
        "jest/unbound-method": "error"
      }
    }
  ]
};
