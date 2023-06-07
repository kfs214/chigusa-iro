module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: ["standard-with-typescript", "prettier"],
  plugins: ["@typescript-eslint", "import", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "import/order": [
      "warn",
      {
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
