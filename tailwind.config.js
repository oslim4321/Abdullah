/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      vvs: "200px",
      ws: "410px",
      us: "320px",
      xs: "480px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      smd: "740px",

      ssmd: "960px",
      
      mdd:"1020px",
    

      md: "1024px",
      // => @media (min-width: 1024px) { ... }

      lg: "1280px",
      // => @media (min-width: 1280px) { ... }
      xl: "1440px",
      xxl:"1920px"
    },
    extend: {
      colors: {
        "primary-color-text": "#000000",
        "primary-green-text": "#FB1D87",
        "primary-purple-text": "#3C1B65",
        "primary-pink-text": "#FB1D87",
        customYellow: '#F6BE00', 
        landingBlue: '#1E7FCB'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};
