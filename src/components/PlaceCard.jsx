import Image from "next/image"
import HorizontalScroll from "./HorizontalScroll"

export default function PlaceCard({place}) {

    const days = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche",
    ]

    const icone = getIcone(place.type)

    return (
        <div className="flex flex-col p-3 space-y-2 bg-white rounded-xl">
            <div className="flex space-x-3">
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    src={icone.src}
                    alt={icone.alt}
                    width={42}
                    height={42}
                />
                <div className="flex flex-col">
                    <h3 className=" font-semibold text-primary overflow-ellipsis line-clamp-1">
                        {place.nom}
                    </h3>
                    <span className=" text-xs text-gray_C1">{place.type}</span>
                </div>
            </div>
            <div>
                <div className="flex space-x-14">
                    <span className="w-full text-xs">
                        {place.adresse}
                    </span>
                    <Image
                        src="/svg/Icones/copy.svg"
                        alt="Next.js Logo"
                        width={24}
                        height={24}
                    />
                </div>
                <HorizontalScroll>
                    {days.map((day, index) => (
                        <div
                            className="flex flex-col flex-shrink-0 flex-grow-0 basis-20 p-2.5 shadow-daysShadow rounded-lg"
                            key={index}
                        >
                            <span className="text-primary font-semibold text-xs">
                                {day}
                            </span>
                            <span className=" text-xxs">9h-17h</span>
                        </div>
                    ))}
                </HorizontalScroll>
                <div className="flex justify-between">
                    <span className=" text-green text-xs">{place.ouvert_24h == "Oui" || place.statut_ouverture == "Ouvert" ? "Ouvert" : ""}</span>
                    {place.payant && <span className="text-gray_C1 text-xs">{ place.payant == "Non" ? "Gratuit" : "Payant" }</span>}
                </div>
            </div>
        </div>
    )
}


const getIcone = (type) =>{
    let icone = {src: "/svg/place_type/promenade.svg", alt: "Icone de promenade"}
    switch(type){
        case "Bois" || "Jardinets décoratifs" || "Jardins d'Etat" || "Jardins grandes institutions" || "Jardins privatifs":
            icone = {src: "/svg/place_type/parc.svg", alt: "Icone de parc"}
            break;
        case "Cimetières" || "Cimetières non parisiens":
            icone = {src: "/svg/place_type/cimetiere.svg", alt: "Icone de cimetière"}
            break;
        case "Lieux de culte":
            icone = {src: "/svg/place_type/culte.svg", alt: "Icone de lieu de culte"}
            break;
        case "Fontaine" || "Brumisateur":
            icone = {src: "/svg/place_type/fontaine.svg", alt: "Icone de fontaine"}
            break;
        case "Bibliothèque":
            icone = {src: "/svg/place_type/bibliotheque.svg", alt: "Icone de bibliothèque"}
            break;
        case "Musée":
            icone = {src: "/svg/place_type/musee.svg", alt: "Icone de musée"}
            break;
        case "Terrain de boules":
            icone = {src: "/svg/place_type/petanque.svg", alt: "Icone de pétanque"}
            break;
        case "Piscine" || "Bains-douches" || "Baignade extérieure":
            icone = {src: "/svg/place_type/piscine.svg", alt: "Icone de piscine"}
            break;
        case "Mairie d'arrondissement":
            icone = {src: "/svg/place_type/mairie.svg", alt: "Icone de mairie"}
            break;
    }
    return icone
}