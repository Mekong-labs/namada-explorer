import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        transparent: 'transparent',
        current: 'currentColor',
        white: {
          0: '#ffffff',
          1: '#E5E7EB',
          2: 'rgba(255, 255, 255, 0.20)'
        },
        black: {
          0: '#000',
          1: '#0E0F0E',
          2: '#171D1B',
        },
        gray: {
          0: '#171D1B',
          1: '#5E5E5E',
          2: '#C5C5C5',
          3: '#F2F2F2',
          4: '#374151',
          5: '#747474',
          6: '#6d6d6d',
          7: '#171e1c',
          8: '#272727',
          9: '#1b1b1b',
          10: '#eaecf01c',
          11: '#a5a5a5',
        },
        green: {
          0: '#43E8B3',
          1: '#43e8b380',
          2: '#2CCA97',
          3: '#31C951',
          4: '#1C2A29',
          5: '#114D39',
          6: '#083011',
          7: '#D0E8D8',
        },
        blue: {
          0: '#3651F3',
          1: '#4F68FF',
          2: '#3651F3',
          3: '#0E174C',
        },
        pink: {
          0: '#DE1777',
        },
        yellow: {
          0: '#FFB839',
          1: 'rgb(255 255 0/1)'
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
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
