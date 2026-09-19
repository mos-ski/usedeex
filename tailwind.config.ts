import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        gasoek: ["'Gasoek One'", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
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
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        deex: {
          navy: "hsl(var(--deex-navy))",
          card: "hsl(var(--deex-card))",
          "card-light": "hsl(var(--deex-card-light))",
          blue: "hsl(var(--deex-blue))",
          teal: "hsl(var(--deex-teal))",
          green: "hsl(var(--deex-green))",
          orange: "hsl(var(--deex-orange))",
          purple: "hsl(var(--deex-purple))",
          red: "hsl(var(--deex-red))",
        },
        // Brand rebrand palette — from the "New-DeeX" Figma file (node 1:127)
        brand: {
          navy: "#004D85",
          amber: "#FFAF26",
          amberHighlight: "#F28A0F",
          ink: "#13181B",
          sky: "#D0EBFF",
          blue500: "#0B75C2",
          blue400: "#279DF3",
          purple: "#6047DF",
          lime: "#E2F327",
          blush: "#FFEAEA",
          nearBlack: "#010D16",
          grey900: "#13181B",
          grey600: "#4E606E",
          grey500: "#617889",
          grey400: "#869AA9",
          grey300: "#AEBCC6",
          grey100: "#E7EBEE",
          grey50: "#F7F8F9",
          success: "#0D851D",
          amberBrown: "#BE6B0A",
          // App-surface tokens — from the "New DeeX" Dashboard (node 259:1215)
          canvas: "#F2F4F7",
          tint: "#F4FAFF",
          hairline: "#F5F5F5",
          primary100: "#D4EBFD",
          warning400: "#E9AC4B",
          success300: "#5EAE68",
          bodyText: "#656367",
          deepNavy: "#001124",
          gain: "#17E833",
          successText: "#139F16",
          danger: "#FF2C2C",
          naira: "#008751",
          barBg: "#F6F6F6",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
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
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
