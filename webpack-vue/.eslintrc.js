module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },

  // "parser": "babel-eslint", // 指定解析器(默认使用Espree)
  "parser": "vue-eslint-parser", // 指定解析器
  
  "extends": [
    // "eslint:recommended",
    'plugin:vue/recommended'
  ],

  "parserOptions": {
      "parser": "babel-eslint",
      "sourceType": "module"
  },
  
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "axios": "readonly"
  },
  
  "rules": {
    
  }
};