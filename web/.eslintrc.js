module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "airbnb",
    "prettier",
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "react/prop-types": 1,
    "prettier/prettier": ["error"],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "prettier/prettier": ["error"],
    "linebreak-style": ["error", "unix"],
    "import/extensions": [ "never" | "always" | "ignorePackages"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-unused-vars": ["error", { "varsIgnorePattern": "[iI]gnored" }],
    "no-shadow": ["error", { "builtinGlobals": false, "hoist": "all", "allow": [] }],
    "no-underscore-dangle": ["error", { "allow": ["foo_", "_bar"] }],
    "no-unused-expressions": { "allowShortCircuit": false, "allowTernary": false },
    "valid-jsdoc": "error",
    "no-unused-vars": "error",
    "jsx-a11y/alt-text": [ 2, {
      "elements": [ "img", "object", "area", "input[type=\"image\"]" ],
      "img": ["Image"],
      "object": ["Object"],
      "area": ["Area"],
      "input[type=\"image\"]": ["InputImage"]
    }],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
};
