module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
      },
    },
    fontFamily: {
      roboto: ['"Roboto"', "sans-serif", "system-ui"],
    },
  },
  plugins: [],
};
