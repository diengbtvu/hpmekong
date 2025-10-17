/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'mekong-blue': {
          DEFAULT: '#0057B8',
          light: '#4A90E2',
          dark: '#003D82',
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#0057B8',
          600: '#004A9F',
          700: '#003D82',
          800: '#002F65',
          900: '#002049',
        },
        'sunrise-orange': {
          DEFAULT: '#FF8C00',
          light: '#FFB84D',
          dark: '#FF6B00',
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF8C00',
          600: '#FB8C00',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100',
        },
        'rice-green': {
          DEFAULT: '#3E8E41',
          light: '#5CB85C',
          dark: '#2D6A2F',
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#3E8E41',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        // Text Colors
        'text-primary': '#1C274C',
        'text-secondary': '#666666',
        // Additional
        'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 0 10px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 5px 20px rgba(0, 0, 0, 0.25)',
        'blue': '0 4px 6px rgba(0, 87, 184, 0.2)',
        'blue-lg': '0 6px 12px rgba(0, 87, 184, 0.3)',
        'orange': '0 4px 6px rgba(255, 140, 0, 0.2)',
        'orange-lg': '0 6px 12px rgba(255, 140, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(180deg, #0057B8 0%, #003D82 100%)',
        'gradient-orange': 'linear-gradient(180deg, #FF8C00 0%, #FF6B00 100%)',
        'gradient-green': 'linear-gradient(180deg, #3E8E41 0%, #2D6A2F 100%)',
        'gradient-bg-1': 'linear-gradient(135deg, rgba(255, 255, 255, 0.00) 23.22%, rgba(0, 87, 184, 0.07) 38.09%, rgba(255, 140, 0, 0.07) 54.12%, rgba(62, 142, 65, 0.15) 76.48%)',
      },
      borderRadius: {
        'card': '10px',
        'lg-card': '15px',
        'xl-card': '20px',
        '2xl-card': '25px',
      },
      transitionDuration: {
        '400': '400ms',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-out': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out',
        'slide-out': 'slide-out 0.3s ease-in',
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
}

