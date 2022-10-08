/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colours: {
        primary: '#3772FF',
        secondary: '#3772FD',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  mode: 'jit',
}
