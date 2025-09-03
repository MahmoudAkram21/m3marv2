/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}', // حسب مكان ملفاتك
    ],
    theme: {
        extend: {
            screens: {
                lgm: '1230px',
            },
        },
    },
    plugins: [],
};
