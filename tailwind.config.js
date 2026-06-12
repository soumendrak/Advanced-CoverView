module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
        Anek: ['Anek Latin', 'sans-serif'],
        Nunito: ['Nunito', 'sans-serif'],
        Fraunces: ['Fraunces', 'Georgia', 'serif'],
        Karla: ['Karla', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FFFDFA',
          100: '#FFF9F1',
          200: '#FFF3E4',
          300: '#FFE9D2',
        },
        straw: {
          100: '#FFE4E8',
          200: '#FFC9D1',
          300: '#FF9AA9',
          400: '#F76C82',
          500: '#E8475F',
          600: '#D23650',
          700: '#AC2840',
        },
        peach: {
          100: '#FFEFDF',
          200: '#FFDFC1',
          300: '#FFC59C',
          400: '#FFA76C',
          500: '#FF8E47',
          600: '#EF7732',
        },
        leaf: {
          300: '#A9C98B',
          400: '#86AE65',
          500: '#69934C',
          600: '#52793A',
        },
        berry: {
          700: '#5D3038',
          800: '#452128',
          900: '#33151B',
          950: '#250D12',
        },
      },
      boxShadow: {
        'warm': '0 24px 50px -24px rgba(93, 35, 41, 0.28)',
        'warm-lg': '0 36px 80px -30px rgba(93, 35, 41, 0.38)',
        'pop': '0 14px 34px -12px rgba(232, 71, 95, 0.55)',
        'peach-pop': '0 16px 40px -12px rgba(255, 142, 71, 0.6)',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(46px, -34px) scale(1.12)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.6) rotate(-12deg)', opacity: '0' },
          '60%': { transform: 'scale(1.06) rotate(3deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
      },
      animation: {
        bob: 'bob 6s ease-in-out infinite',
        'bob-slow': 'bob 8.5s ease-in-out infinite',
        'bob-slower': 'bob 11s ease-in-out infinite',
        marquee: 'marquee 26s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift 26s ease-in-out infinite',
        sway: 'sway 7s ease-in-out infinite',
        'pop-in': 'pop-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],

}
