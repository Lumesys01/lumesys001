
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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#051937",
        secondary: "#004d7a",
        accent: "#00bf72",
        highlight: "#A8EB12",
        neonpurple: "#2C065D",
        darkblue: "#010B28",
        background: "#FFFFFF", // Changed to pure white
        surface: "#F5F5F5", // Slightly off-white for surface elements
        muted: "#C4C3BB",
        "muted-foreground": "#A3A299",
        border: "#E0E0E0",
        input: "#F0F0F0",
        foreground: "#000000", // Changed to black for better readability on white background
      },
      textColor: {
        foreground: "#000000", // Ensuring black text for readability
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
