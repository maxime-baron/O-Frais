/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            borderColor: ["focus"],
            colors: {
                gray_C1: "var(--gray)",
                green: "var(--green)",
                primary: "var(--primary)",
                borderGray: "var(--border-gray)",
            },
            fontSize: {
                xxs: "0.625rem",
            },
            boxShadow: {
                daysShadow: "0px 3px 4px 0px rgba(223, 211, 236, 0.25)",
                cardShadow: "0px 0px 18px 2px rgba(0, 0, 0, 0.08);",
            },
        },
    },
    plugins: [],
}
