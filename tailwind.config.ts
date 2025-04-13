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
        // Main brand colors - updated to match the reference image
        primary: "#051937",
        secondary: "#004d7a",
        accent: "#00bf72",  // Mint green color for "Lumesys" brand text
        highlight: "#DBFF50", // Bright yellow color for "DO DARE DOMINATE"
        neonpurple: "#2C065D",
        darkblue: "#00477B", // Dark navy blue for "Optimization" text
        
        // Legacy/Exclusive color additions
        burgundy: "#800020",
        navy: "#0A1C3F", 
        gold: "#D4AF37",
        richpurple: "#4A154B",
        jade: "#00A86B",
        
        // Enhanced color system for better light/dark mode transitions
        background: {
          DEFAULT: "#FFFFFF", 
          dark: "#1A1F2C",
        },
        surface: {
          DEFAULT: "#F8F9FA",
          dark: "#252836",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#1E2235", 
        },
        muted: {
          DEFAULT: "#C4C3BB",
          dark: "#88888B",
        },
        "muted-foreground": {
          DEFAULT: "#6B7280",
          dark: "#9CA3AF",
        },
        border: {
          DEFAULT: "#E5E7EB",
          dark: "#2D3348",
        },
        input: {
          DEFAULT: "#F3F4F6",
          dark: "#2D2D3A",
        },
        foreground: {
          DEFAULT: "#111827",
          dark: "#F3F4F6",
        },
      },
      textColor: {
        foreground: {
          DEFAULT: "#111827",
          dark: "#F3F4F6",
        },
        muted: {
          DEFAULT: "#6B7280",
          dark: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#00bf72",
          dark: "#1DF396",
        },
        highlight: {
          DEFAULT: "#A8EB12",
          dark: "#BCFA4C",
        },
        legacy: {
          gold: "#D4AF37",
          burgundy: "#800020",
          navy: "#0A1C3F",
        }
      },
      backgroundColor: {
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#1E2235",
        },
        input: {
          DEFAULT: "#F3F4F6",
          dark: "#2D2D3A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      dropShadow: {
        'DEFAULT': '0 1px 1px rgba(0, 191, 114, 0.3)',
        'gold': '0 1px 3px rgba(212, 175, 55, 0.5)'
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 191, 114, 0.3)',
        'DEFAULT': '0 2px 4px rgba(0, 191, 114, 0.3)',
        'lg': '0 4px 8px rgba(0, 191, 114, 0.3)',
        'accent': '0 2px 4px rgba(0, 191, 114, 0.5)',
        'gold': '0 1px 3px rgba(212, 175, 55, 0.6)',
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
        "subtle-shimmer": "subtle-shimmer 3s ease-in-out infinite",
        "elegant-fade": "elegant-fade 1.5s ease-out forwards",
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
        "subtle-shimmer": {
          "0%": { backgroundPosition: "200% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "elegant-fade": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #051937 0%, #004d7a 25%, #0089A7 50%, #00bf72 75%, #DBFF50 100%)",
        "glow-gradient": "linear-gradient(90deg, #DBFF50, #00bf72, #004d7a, #2C065D)",
        "button-gradient": "linear-gradient(90deg, #00bf72, #DBFF50)",
        "card-gradient": "linear-gradient(135deg, rgba(12, 41, 100, 0.5) 0%, rgba(5, 25, 55, 0.8) 100%)",
        "luxury-pattern": "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        "subtle-grid": "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Add a plugin for text-shadow utilities
    function({ addUtilities, theme, variants }) {
      const textShadows = theme('textShadow', {});
      const textShadowUtilities = Object.entries(textShadows).reduce(
        (utilities, [key, value]) => {
          const className = key === 'DEFAULT' ? 'text-shadow' : `text-shadow-${key}`;
          return {
            ...utilities,
            [`.${className}`]: {
              textShadow: value,
            },
          };
        },
        {}
      );
      
      addUtilities(textShadowUtilities);
    }
  ],
} satisfies Config;
