module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'ui'],
      roboto: ['Arial', 'sans-serif', 'BlinkMacSystemFont', '-apple-system']
    },
    extend: {
      colors: {
        primary: '#05ac10',
        secondary: '#0000'
      },
    },
  },
  plugins: [],
}
