/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    textColor: {
      primary: 'hsl(var(--text-color))'
    },
    extend: {}
  },
  plugins: []
}
