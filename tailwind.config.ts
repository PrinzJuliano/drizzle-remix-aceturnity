import type { Config } from 'tailwindcss'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        brand: '#000'
      }
    },
  },
  plugins: [addVariablesForColors],
} satisfies Config

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
