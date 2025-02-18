
module.exports = {
  "env": {
    browser: true,
    es2020: true,
    "jest/globals": true,
    "cypress/globals": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",  
    "plugin:jest/recommended",
    "plugin:cypress/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "jest", "cypress"
  ],
  "rules": {
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-unused-vars": "warn",
    "react/prop-types": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "cypress/no-unnecessary-waiting": "warn"
  }
}