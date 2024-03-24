module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "chatbot":['"Exo 2"','sans-serif']
      },
      animation: {
        'typewriter': 'typewriter 3s steps(44) infinite',
      },
      keyframes: {
        'typewriter': {
          '0%': {
            width: '0',
          },
          '100%': {
            width: '100%',
          },
        },
      },
    },
  },
  plugins: [],
}