// tailwind.config.js

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        firaCode_regular: ['FiraCode-Regular'],
        firaCode_bold: ['FiraCode-Bold'],
        firaCode_light: ['FiraCode-Light'],
        firaCode_medium: ['FiraCode-Medium'],
        firaCode_semiBold: ['FiraCode-SemiBold'],
      },
    },
  },
  plugins: [],
};
