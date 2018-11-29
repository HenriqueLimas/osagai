module.exports = {
  globals: {
    customElements: {
      define: (...props) => props
    },
    requestAnimationFrame: fn => fn()
  }
};
