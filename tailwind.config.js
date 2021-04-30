module.exports = {
  purge: {
    enabled: true,
    content: ["./src/*.js", "./src/**/*.js", "./src/**/**/*.js"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fill: (theme) => ({
        red: theme("colors.red.primary"),
        black: theme("colors.black.light"),
      }), 
      colors: {
        blue: {
          medium: "#005c98",
        },
        black: {
          light: "#262626",
          faded: "#00000059",
        },
        gray: {
          base: "#616161",
          background: "#fafafa",
          primary: "#dbdbdb",
        },
        red: {
          primary: "#ed4956",
        },
      },
    },
  },
  variants: {
    extend: { display: ["group-hover"] },
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
