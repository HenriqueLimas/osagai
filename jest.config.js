module.exports = {
  preset: "ts-jest",
  globals: {
    customElements: {
      define: (...props) => props
    },
    requestAnimationFrame: fn => fn()
  }
};
