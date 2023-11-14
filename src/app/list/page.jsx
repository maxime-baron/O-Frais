'use client'
import NavBar from "@/components/NavBar"
import PlaceCard from "@/components/PlaceCard"
import SearchBarSmall from "@/components/SearchBarSmall"
import Image from "next/image"
import { useEffect, useState, useMemo, useRef } from "react"
import { useSearchParams } from 'next/navigation';

export default function List({}) {
    const searchParams = useSearchParams()
    const param = searchParams.get('postalCode') || ''
    const parentRef = useRef()
    const [places,setPlaces] = useState([])
    const [offset,setoffset] = useState(0)
    const [wait,setWait] = useState(true)
    const [searchValue, setSearchValue] = useState('');
    const [refine, setRefine] = useState({arrondissement: param});
    const limit = 5

    const placeCards = useMemo(() => 
        places.map((place, index) => <PlaceCard place={place} key={index}/>
    ),[places])

    const getPlaces = async () => {
        const refineEncoded = refineStingify(refine) //Transforme l'object refine en string pour l'URL
        const params = new URLSearchParams({limit,offset}) //Encode les variables pour l'URL
        /* 
            On lance les requêtes API à 2 datasets 
        */
        try{
            const response = await fetch(`https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?${params}&${refineEncoded}`)
            const result = await response.json()
            // console.log(result)
            const response2 = await fetch(`https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?${params}&${refineEncoded}`)
            const result2 = await response2.json()
            // console.log(result2)
            setPlaces((current) => [...current, ...result.results, ...result2.results]) // On ajoute les résultats d'API sans retirer les ancienne valeurs
            setoffset((current) => current + limit ) //Offset = Offset + limite
            return true
        }catch (error) {
            console.log(error)
            return false
        }
    }

    useEffect(()=>{
        /* A chaque fois que refine change on fais un apelle API pour récupéré les lieux */
        setPlaces([])
        getPlaces()
    },[refine])

    const handleScroll = async (e) => {
        //onction pour géré le scroll dynamique
        if (e.target.lastChild.getBoundingClientRect().top < window.innerHeight && wait){
            /* 
            on met sur false pour ne pa rentrer plusieur 
            fois dans le if et donc faire plusieurs requêtes
            */
            setWait(false)
            //getPlaces() récupére les lieux et renvoie true donc on change la valeur de wait à true
            setWait( await getPlaces())
        }
    }

    const handleSubmit = (e)=>{
        //Empêche la page de se recharger
        e.preventDefault()
        //Retire le param de l'url
        const url = new URL(window.location);
        url.searchParams.delete('postalCode');
        window.history.pushState({}, '', url);
        console.log(searchValue)
        
        setoffset(0)
        setRefine((current) =>( {...current,arrondissement: searchValue}))
    }

    return (
        
        <div className="lg:w-2/6 xl:w-1/4 flex flex-col overflow-y-scroll h-screen relative" onScroll={handleScroll} ref={parentRef}>
            <NavBar/>
            <form className="mx-6 mb-3 mt-6 flex space-x-1 shrink-0 items-center" onSubmit={handleSubmit} method="post">
                <SearchBarSmall value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                <Image
                    src="/svg/Icones/filter.svg"
                    alt="Filter icone"
                    width={30}
                    height={30}
                />
                <button className="h-full">
                    <Image
                        src="/svg/Icones/search.svg"
                        alt="Search icone"
                        width={30}
                        height={30}
                    />
                </button>
            </form>
            {placeCards}
        </div>
    )
}

const refineStingify = (refine) =>{
    /* 
        fonction qui pour chaque clé crée une string au format: (clé:"valeur") 
        qui n'est pas un format JSON donc on peux pas faire de JSON.stringify
    */
    const keys = Object.keys(refine)
    const finalArr = []
    keys.forEach((key) => {
        if(refine[key]) // si la clé n'a pas de valeur on la rajoute pas en string
        finalArr.push(`refine=${key}:"${refine[key]}"`)
    })
    const refineEncoded = encodeURI(finalArr.join("&")) //Encode en URI
    return refineEncoded
}