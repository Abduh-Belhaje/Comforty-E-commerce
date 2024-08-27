/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        martinique: {
          50: "#f1f2fc",
          100: "#e5e9fa",
          200: "#d0d5f5",
          300: "#b3baee",
          400: "#9597e4",
          500: "#7f7bd9",
          600: "#6d61cb",
          700: "#5e50b2",
          800: "#4d4390",
          900: "#413c73",
          950: "#272343",
        },
        porcelain: {
          50: "#f7f8f8",
          100: "#f0f2f3",
          200: "#d8dddf",
          300: "#b5c0c4",
          400: "#8d9da3",
          500: "#6f8288",
          600: "#596a70",
          700: "#49565b",
          800: "#3f494d",
          900: "#374043",
          950: "#25292c",
        },
        "blue-lagoon": {
          50: "#e7fffb",
          100: "#c2fff4",
          200: "#8cffea",
          300: "#3dffdb",
          400: "#00ffd0",
          500: "#00ffee",
          600: "#00d9e3",
          700: "#00abb5",
          800: "#008790",
          900: "#007580",
          950: "#004a55",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      height: {
        75: "75px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
