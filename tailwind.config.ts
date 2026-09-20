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
        mono: ["'Roboto Mono'", "ui-monospace", "monospace"],
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
        /**
         * Brand palette — from the "New-DeeX" Figma file (node 1:127).
         *
         * Surface and text tokens read CSS variables so the whole app can flip
         * to dark (see index.css). Fixed brand hues stay literal.
         */
        brand: {
          navy: "#004D85",
          amber: "#FFAF26",
          amberHighlight: "#F28A0F",
          sky: "#D0EBFF",
          blue500: "#0B75C2",
          blue400: "#279DF3",
          purple: "#6047DF",
          lime: "#E2F327",
          blush: "#FFEAEA",
          nearBlack: "#010D16",
          deepNavy: "#001124",
          naira: "#008751",
          gain: "#17E833",
          danger: "#FF2C2C",
          success: "#0D851D",
          warning400: "#E9AC4B",
          success300: "#5EAE68",
          amberBrown: "var(--brand-amber-brown)",
          successText: "var(--brand-success-text)",
          primary50: "#E8F3FC",
          primary100: "var(--brand-primary-100)",

          // Theme-aware surfaces and text.
          canvas: "var(--brand-canvas)",
          surface: "var(--brand-surface)",
          tint: "var(--brand-tint)",
          hairline: "var(--brand-hairline)",
          barBg: "var(--brand-bar-bg)",
          ink: "var(--brand-grey-900)",
          grey900: "var(--brand-grey-900)",
          grey600: "var(--brand-grey-600)",
          grey500: "var(--brand-grey-500)",
          grey400: "var(--brand-grey-400)",
          grey300: "var(--brand-grey-300)",
          grey100: "var(--brand-grey-100)",
          grey50: "var(--brand-grey-50)",
          bodyText: "var(--brand-body-text)",
          pill: "var(--brand-pill)",
          pillBorder: "var(--brand-pill-border)",
          noteAmber: "var(--brand-note-amber)",
          noteDanger: "var(--brand-note-danger)",
          noteInfo: "var(--brand-note-info)",
          noteNeutral: "var(--brand-note-neutral)",
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
