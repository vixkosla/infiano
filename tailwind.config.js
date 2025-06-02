

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],            // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],         // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],          // 72px
        '8xl': ['6rem', { lineHeight: '1' }],            // 96px
        '9xl': ['8rem', { lineHeight: '1' }],            // 128px
      },
      boxShadow: {
        'top': '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        'right': '4px 20 26px -1px rgba(196, 18, 18, 0.1)',
        'bottom': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'left': '-4px 0 6px -1px rgba(0, 0, 0, 0.1)',
        'tl-corner': '-4px -4px 6px -1px rgba(0, 0, 0, 0.1)', // Верхний левый
        'tr-corner': '4px -4px 6px -1px rgba(0, 0, 0, 0.1)',  // Верхний правый
        'bl-corner': '-4px 4px 6px -1px rgba(0, 0, 0, 0.1)',  // Нижний левый
        'br-corner': '4px 4px 6px -1px rgba(0, 0, 0, 0.1)',   // Нижний правый
      },
      fontFamily: {
        custom: ['"Roboto"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
    }
  },
  plugins: [
    // require('tailwind-scrollbar-hide')({ nocompatible: true }),
    require('tailwind-scrollbar')
  ],
}