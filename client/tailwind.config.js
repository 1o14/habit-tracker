module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1e3a8a', // Sininen
          secondary: '#4ade80', // Vihreä
          accent: '#9333ea', // Vaalean violetti
          light: '#ffffff',
          dark: '#111827',
        },
        fontFamily: {
          body: ['Roboto', 'sans-serif'],
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 90deg, var(--tw-gradient-stops))',
        },
      },
    },
    plugins: [],
  }
  