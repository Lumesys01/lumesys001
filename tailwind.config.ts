
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: "#004d4d", // Deep teal
        secondary: "#006666", // Medium teal
        accent: "#00bf72", // Bright green
        highlight: "#A8EB12", // Neon green
        neonpurple: "#2C065D",
        darkblue: "#010B28", // Dark navy
        cyan: "#00ffff", // Bright cyan
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#001a1a", // Darker teal for dark mode
        },
        surface: {
          DEFAULT: "#F5F5F5",
          dark: "#002929", // Deep teal for dark mode surfaces
        },
        muted: {
          DEFAULT: "#C4C3BB",
          dark: "#88888B",
        },
        "muted-foreground": {
          DEFAULT: "#A3A299",
          dark: "#A0A0A5",
        },
        border: {
          DEFAULT: "#E0E0E0",
          dark: "#003333", // Teal border for dark mode
        },
        input: {
          DEFAULT: "#F0F0F0",
          dark: "#002626", // Deep teal for dark mode inputs
        },
        foreground: {
          DEFAULT: "#000000",
          dark: "#E0E0E0",
        },
      },
      textColor: {
        foreground: {
          DEFAULT: "#000000",
          dark: "#F6F6F7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s infinite",
        "gradient-flow": "gradient-flow 8s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
        "bounce": "bounce 1s ease-in-out",
        "spin-slow": "spin 3s linear infinite",
        "ping": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "slide-in": "slideIn 1s ease-out forwards",
        "leaf-fall": "leafFall 3s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            opacity: "1",
            filter: "brightness(100%) blur(0px)",
          },
          "50%": { 
            opacity: "0.8",
            filter: "brightness(150%) blur(1px)",
          },
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounce: {
          '0%, 100%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': { 
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(1.2)',
            opacity: '0',
          },
        },
        slideIn: {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1'
          },
        },
        leafFall: {
          '0%': { 
            transform: 'translateY(-20px) rotate(0deg)',
            opacity: '0'
          },
          '10%': { 
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(80px) rotate(360deg)',
            opacity: '0'
          },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #051937 0%, #004d7a 25%, #0089A7 50%, #00bf72 75%, #A8EB12 100%)",
        "glow-gradient": "linear-gradient(90deg, #A8EB12, #00bf72, #004d7a, #2C065D)",
        "button-gradient": "linear-gradient(90deg, #00bf72, #A8EB12)",
        "card-gradient": "linear-gradient(135deg, rgba(12, 41, 100, 0.5) 0%, rgba(5, 25, 55, 0.8) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
