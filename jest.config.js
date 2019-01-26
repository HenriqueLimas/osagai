module.exports = {
  testMatch: ["**/lib/**/*.test.js"],
  globals: {
    customElements: {
      define: (...props) => props,
      get: () => false
    },
    requestAnimationFrame: fn => fn()
  }
};
