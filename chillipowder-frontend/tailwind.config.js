/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#E11D48',   // Modern Crimson
                    secondary: '#F59E0B', // Amber
                    dark: 'rgb(var(--brand-dark) / <alpha-value>)',
                    surface: 'rgb(var(--brand-surface) / <alpha-value>)',
                    accent: '#38BDF8',
                    text: 'rgb(var(--brand-text) / <alpha-value>)',
                    muted: 'rgb(var(--brand-muted) / <alpha-value>)'
                }
            },
            fontFamily: {
                sans: ['Outfit', 'ui-sans-serif', 'system-ui'],
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.5s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                'blur-in': 'blur-in 0.4s ease-out',
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-in-right': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'blur-in': {
                    '0%': { opacity: '0', filter: 'blur(10px)' },
                    '100%': { opacity: '1', filter: 'blur(0)' },
                }
            }
        },
    },
    plugins: [],
}
