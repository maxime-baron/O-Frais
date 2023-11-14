import { Poppins } from "next/font/google"
import localFont from 'next/font/local'
import "./globals.css"
 
// Import de la font Nexa
const Nexa = localFont({
    src: [
        {
            path:'fonts/NexaText-Trial-Bold.woff',
            weight: '700',
            style: 'normal',
        },
        {
            path:'fonts/NexaText-Trial-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-nexa',
})

// Import de poppins depuis google font
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata = {
    title: "O'Frais",
    description: "Trouve de quoi te rafraichir dans tout paris !",
}

//layout vas encapsuler le contenue (children) qui correspond à page.jsx
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className + ` ${Nexa.variable}`}>{children}</body>
        </html>
    )
}
