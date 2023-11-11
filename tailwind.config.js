/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gray_C1: "var(--gray)",
                green: "var(--green)",
                primary: "var(--primary)",
            },
            fontSize: {
                xxs: "0.625rem",
            },
            boxShadow: {
                daysShadow: "0px 3px 4px 0px rgba(223, 211, 236, 0.25)",
            },
            // backgroundImage: {
            //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            //   'gradient-conic':
            //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            // },
        },
    },
    plugins: [],
}
