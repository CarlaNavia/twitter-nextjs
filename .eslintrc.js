const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2
}

const REACT_RULES = {
  'react/default-props-match-prop-types': RULES.WARNING,
  'react/jsx-handler-names': RULES.WARNING,
  'react/jsx-no-duplicate-props': [RULES.WARNING, {ignoreCase: true}],
  'react/jsx-no-undef': RULES.WARNING,
  'react/jsx-pascal-case': [
    RULES.WARNING,
    {
      allowAllCaps: true,
      ignore: []
    }
  ],
  'react/jsx-uses-react': RULES.OFF,
  'react/jsx-uses-vars': RULES.WARNING,
  'react/no-deprecated': RULES.WARNING,
  'react/no-direct-mutation-state': RULES.ERROR,
  'react/no-is-mounted': RULES.WARNING,
  'react/no-multi-comp': [RULES.WARNING, {ignoreStateless: true}],
  'react/no-unused-prop-types': RULES.WARNING,
  'react/react-in-jsx-scope': RULES.OFF,
  'react/require-render-return': RULES.WARNING
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },

  plugins: ['react'],
  // add your custom rules here
  rules: {
    ...REACT_RULES,
    'no-unused-vars': [
      RULES.ERROR,
      {args: 'none', ignoreRestSiblings: true, varsIgnorePattern: 'React'}
    ]
  }
}
