/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
        'cyber-blue': '#00d4ff',
        'chaos-pink': '#ff6b9d',
        'vibe-purple': '#9d4edd',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'matrix': 'matrix 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px theme(colors.neon-green), 0 0 10px theme(colors.neon-green)' },
          '100%': { boxShadow: '0 0 10px theme(colors.neon-green), 0 0 20px theme(colors.neon-green), 0 0 30px theme(colors.neon-green)' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      }
    },
  },
  plugins: [],
}