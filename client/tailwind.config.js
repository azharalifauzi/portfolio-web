module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ["'Poppins'", 'sans-serif'],
    },
    fontSize: {
      h1: '4.209rem',
      h2: '3.157rem',
      h3: '2.369rem',
      h4: '1.777rem',
      h5: '1.333rem',
      body: '1rem',
      'body-sm': '0.75rem',
      'body-xs': '0.563rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#FFFFFF',
      },
      blue: {
        DEFAULT: '#1A6FEF',
      },
      black: {
        DEFAULT: '#333333',
      },
      grey: {
        1: '#78797A',
        2: '#F0F0F0',
      },
    },
  },
  variants: {},
  plugins: [],
};
