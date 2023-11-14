import Image from "next/image"
import HorizontalScroll from "./HorizontalScroll"

export default function PlaceCard({place}) {

    const days = [
        {Lundi: place.horaires_lundi},
        {Mardi: place.horaires_mardi},
        {Mercredi: place.horaires_mercredi},
        {Jeudi: place.horaires_jeudi},
        {Vendredi: place.horaires_vendredi},
        {Samedi: place.horaires_samedi},
        {Dimanche: place.horaires_dimanche}
    ]

    const icone = getIcone(place.type)

    return (
        <div className="flex flex-col p-3 space-y-2 bg-white rounded-xl shadow-cardShadow mx-6 my-3">
            <div className="flex space-x-3">
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    src={icone.src}
                    alt={icone.alt}
                    width={42}
                    height={42}
                />
                <div className="flex flex-col">
                    <h3 className=" font-bold font-nexa text-primary overflow-ellipsis line-clamp-1">
                        {place.nom}
                    </h3>
                    <span className=" text-xs text-gray_C1">{place.type}</span>
                </div>
            </div>
            <div>
                {place.adresse && 
                    <div className="flex space-x-14">
                        <span className="w-full text-xs">
                            {place.adresse + ', ' + place.arrondissement}
                        </span>
                        <div onClick={(e)=>{copyHandler(e,place.adresse + ', ' + place.arrondissement)}}>
                            <span className="text-xs text-primary hidden">Copié&nbsp;!</span>
                            <Image
                                src="/svg/Icones/copy.svg"
                                alt="Next.js Logo"
                                width={24}
                                height={24}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                }
                { place.horaires_lundi && place.horaires_mardi && place.horaires_mercredi && place.horaires_jeudi && place.horaires_vendredi && place.horaires_samedi && place.horaires_dimanche ?
                    <HorizontalScroll>
                        {days.map((day, index) => (
                            <div
                                className="flex flex-col flex-shrink-0 flex-grow-0 basis-20 p-2.5 shadow-daysShadow rounded-lg"
                                key={index}
                            >
                                <span className="text-primary font-semibold text-xs">
                                    {Object.keys(days[index])[0]}
                                </span>
                                <span className=" text-xxs">{day[Object.keys(days[index])[0]].replaceAll("h00","h")}</span>
                            </div>
                        ))}
                    </HorizontalScroll>
                    :
                    <div className=" my-2 text-sm">Horaires inconnu</div>
                }
                <div className="flex justify-between">
                    <span className=" text-green text-xs">{place.ouvert_24h == "Oui" || place.statut_ouverture == "Ouvert" ? "Ouvert" : ""}</span>
                    {place.payant && <span className="text-gray_C1 text-xs">{ place.payant == "Non" ? "Gratuit" : "Payant" }</span>}
                </div>
            </div>
        </div>
    )
}

const copyhide = (e)=>{
    e.target.previousSibling.style.display = 'none'
    e.target.style.display = 'block'
}

const copyHandler = (e,adresse) => {
    // console.dir(e.target)
    navigator.clipboard.writeText(adresse)
    e.target.style.display = 'none'
    e.target.previousSibling.style.display = 'block'
    setTimeout(()=>{copyhide(e)},1000)
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