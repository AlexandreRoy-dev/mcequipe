/**
 * Prebuilt replacement for the Tailwind Play CDN (cdn.tailwindcss.com).
 * Theme is the union of the per-page configs: mc colors, apoint colors, Optima + Montserrat.
 * Rebuild after class changes: npm install && npm run build:css
 * Do not minify with cssnano: its color minifier rewrites these RGB values and shifts them.
 */
module.exports = {
  content: ['./**/*.{html,js}', '!./node_modules/**'],
  theme: {
    extend: {
      colors: {
        mc: {
          charcoal: 'rgb(61 49 44 / <alpha-value>)',
          sand: 'rgb(187 171 154 / <alpha-value>)',
          silver: 'rgb(196 196 195 / <alpha-value>)',
          white: 'rgb(255 255 255 / <alpha-value>)',
          linen: 'rgb(239 233 226 / <alpha-value>)',
          ocean: 'rgb(79 144 155 / <alpha-value>)',
        },
        apoint: {
          green: 'rgb(42 45 72 / <alpha-value>)',
          lime: 'rgb(200 230 80 / <alpha-value>)',
        },
      },
      fontFamily: {
        heading: ['Optima', 'sans-serif'],
        body: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  safelist: [
    'text-red-300',
    'text-red-600',
    'text-mc-charcoal',
    'text-mc-charcoal/50',
    'text-mc-charcoal/80',
    'text-white',
    'text-white/50',
    'text-white/80',
    'text-mc-sand',
    'border-mc-charcoal/10',
    'border-white/10',
  ],
  plugins: [],
};
