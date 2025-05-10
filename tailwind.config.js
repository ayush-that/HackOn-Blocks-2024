/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      body: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    },
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '768px' },
      sm: { max: '639px' },
      ssm: { max: '360px' },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
