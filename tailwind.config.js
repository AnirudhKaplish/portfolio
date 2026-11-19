/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(cyan|sky|blue|indigo|purple|pink|red|orange|amber|green|teal|emerald|violet|yellow|fuchsia|rose)-500/,
    },
  ],
  plugins: [],
}
