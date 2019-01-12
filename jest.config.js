module.exports = {
  globals: {
    customElements: {
      define: (...props) => props,
      get: () => false
    },
    requestAnimationFrame: fn => fn()
  }
};
