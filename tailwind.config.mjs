/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        accent: "rgb(136,58,234)",
        "accent-secondary": "rgb(204, 151,255)",
        "accent-light": "rgb(224, 204, 250)",
        "accent-dark": "rgb(49, 10, 101)",
        "background-dark": "#13151a",
      },
      backgroundImage: {
        "accent-gradient": `linear-gradient(
			45deg,
			rgb(136,58,234),
			rgb(224, 204, 250) 30%,
			white 60%
		  )`,
        "top-gradient": `linear-gradient(
			180deg,
			rgb(136,58,234),
			rgb(224, 204, 250, 0.9) 90%,
			rgb(224, 204, 250, 0.1) 100%
		  )`,
      },
      fontFamily: {
        roboto: "Roboto",
      },
      backgroundSize: {
        "size-500": "500%",
      },
      boxShadow: {
        purple: "0px 0px 20px 3px rgba(136,58,234,0.3)",
      },
      screens: {
        xs: "380px",
      },
    },
  },
  plugins: [],
};
