module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      keyframes: {
        ht0: {
          '100%': { height: '0' }
        },
        hf0: {
          '0%': { height: '0' }
        }
      }
    }
  },
  plugins: []
};
