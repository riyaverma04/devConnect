export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3b82f6",
          secondary: "#f97316", // orange-500
          accent: "#14b8a6",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f97316", // orange-500
          error: "#ef4444",
        },
      },
    ],
  },
};