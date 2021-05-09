module.exports = {
  mode: "jit",
  purge: {
    enabled: process.env.NODE_ENV === "development" || true,
    content:  [
      './src/**/*.html',
      './src/**/*.js',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
