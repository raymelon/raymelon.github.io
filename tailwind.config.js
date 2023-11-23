/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // This can be 'media' if you want to use the OS level setting
  theme: {
    extend: {
      colors: {
        "cust-indigo-dark": "#3D348B",
        "cust-indigo-light": "#7678ED"
      },

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
        light: {
          "primary": "#DE5745",
          "secondary": "#E5C12E",
          "accent": "#264E6E",
          "neutral": "#2a323c",
          // "base-100": "#1d232a",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272"
        },
        dark: {
          "primary": "#DE5745",
          "secondary": "#E5C12E",
          "accent": "#264E6E",
          "neutral": "#2a323c",
          "base-100": "#1d232a",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272"
        },
      },
    ]
    // themes: [
    //   {
    //     light: {
    //       "primary": "#DE5745",
    //       "secondary": "#E5C12E",
    //       "accent": "#264E6E",
    //       "neutral": "#2a323c",
    //       "base-100": "#ffffff",
    //       "info": "#3abff8",
    //       "success": "#36d399",
    //       "warning": "#fbbd23",
    //       "error": "#f87272"
    //     },
    //     dark: {
    //       "primary": "#DE5745",
    //       "secondary": "#E5C12E",
    //       "accent": "#264E6E",
    //       "neutral": "#2a323c",
    //       "base-100": "#1d232a",
    //       "info": "#3abff8",
    //       "success": "#36d399",
    //       "warning": "#fbbd23",
    //       "error": "#f87272"
    //     },
    //   }
    // ]
  }
}