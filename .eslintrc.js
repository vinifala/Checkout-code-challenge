module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  env: {
    amd: true,
    node: true,
  },
  rules: {
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "none",
          requireLast: true,
        },
        singleline: {
          delimiter: "comma",
          requireLast: false,
        },
      },
    ],
  },
}
