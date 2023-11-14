"use client"
import SearchBarMed from "@/components/SearchBarMed"
import Link from "next/link"
import { useState } from "react";

export default function Home() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <main className="flex min-h-screen flex-col background-home items-center justify-center gap-11">
            <div className="flex flex-col items-center">
                <h1 className=" text-primary font-nexa font-bold text-4xl">Soyez O&rsquo;Frais</h1>
                <h2 className=" text-white font-nexa font-bold text-xl w-72 text-center">Trouve de quoi te rafraichir dans tout paris !</h2>
            </div>
            <div className="flex flex-col gap-2">
                <SearchBarMed value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                <Link href={"/list?postalCode=" + searchValue} className="w-full flex justify-center items-center text-sm text-white py-3 px-4 rounded-xl bg- bg-primary" >Chercher</Link>
            </div>
        </main>
    )
}
