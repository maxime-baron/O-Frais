import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation';


export default function NavBar() {
    const currentPage = usePathname()
    /* 
        usePathname() récupère le path, si il rempli une condition
        la bordure du bouton devient violette

        Ici tout est fais en brut car il n'y a que 2 liens mais en
        temps normale j'aurais juste fais un tableau d'objet et je 
        le mapperais avec le composant link
    */

    return (
        <div className=" fixed lg:hidden w-full flex bg-white bottom-0 rounded-t-xl z-10">
            <Link href="/list" className={"w-full flex justify-center py-3 border-b-2" + `${currentPage == "/list" ? " border-primary" : " border-white"}`}>
                <Image
                    src="/svg/Icones/list.svg"
                    alt="list icone"
                    width={26}
                    height={26}
                    className="cursor-pointer"
                />
            </Link>
            <Link href="/map" className={"w-full flex justify-center py-3 border-b-2" + `${currentPage == "/map" ? " border-primary" : " border-white"}`}>
                <Image
                    src="/svg/Icones/map.svg"
                    alt="Map icone"
                    width={26}
                    height={26}
                    className="cursor-pointer"
                />
            </Link>
        </div>
    )
}

