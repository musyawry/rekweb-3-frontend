/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        // PERUBAHAN: Hapus 'hsl()' dan gunakan 'var()' secara langsung
        // karena variabel Anda sudah berisi format warna lengkap (oklch).
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          // TAMBAHAN: Mendaftarkan destructive-foreground
          foreground: 'var(--destructive-foreground)'
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)'
        },
        // TAMBAHAN: Mendaftarkan semua warna sidebar
        sidebar: {
            DEFAULT: 'var(--sidebar)',
            foreground: 'var(--sidebar-foreground)',
            primary: {
                DEFAULT: 'var(--sidebar-primary)',
                foreground: 'var(--sidebar-primary-foreground)',
            },
            accent: {
                DEFAULT: 'var(--sidebar-accent)',
                foreground: 'var(--sidebar-accent-foreground)',
            },
            border: 'var(--sidebar-border)',
            ring: 'var(--sidebar-ring)',
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}