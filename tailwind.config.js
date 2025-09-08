/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                cosmic: {
                    dark: '#0a0a1a66',
                    purple: '#2d1b69',
                    blue: '#1e3a8a',
                    indigo: '#3730a3',
                    violet: '#7c3aed'
                }
            },
            animation: {
                'twinkle': 'twinkle 3s ease-in-out infinite alternate',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate'
            },
            keyframes: {
                twinkle: {
                    '0%': { opacity: '0.3', transform: 'scale(0.8)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                'pulse-glow': {
                    '0%': { boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)' },
                    '100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.8), 0 0 30px rgba(124, 58, 237, 0.4)' }
                }
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
}