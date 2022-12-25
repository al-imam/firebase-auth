module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["vite*"],
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["prettier", "react"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: false,
        printWidth: 80,
        tabWidth: 2,
        semi: true,
        endOfLine: "auto",
      },
    ],
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
  },
};
