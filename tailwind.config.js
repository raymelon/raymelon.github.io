/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // This can be 'media' if you want to use the OS level setting
  theme: {
    // tailwind theme extension
    // this is different from daisyUI theme
    // use with caution
    extend: {
      colors: {
        "cust-indigo-dark": "#3D348B",
        "cust-indigo-light": "#7678ED"
      },
      // backgroundColor: theme => ({
      //   "cust-background-color": "rgb(250, 235, 215, 0.1)"
      // })
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
  daisyui: {
    themes: [
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dracula]"],
        },
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=lemonade]"],
        },
      },
    ]
  }
}