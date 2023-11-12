'use client'
import NavBar from "@/components/NavBar"
import PlaceCard from "@/components/PlaceCard"
import SearchBarSmall from "@/components/SearchBarSmall"
import Image from "next/image"
import { useEffect, useState, useMemo, useRef } from "react"

export default function List({}) {
    const parentRef = useRef()
    const [places,setPlaces] = useState([])
    const [offset,setoffset] = useState(0)
    const [wait,setWait] = useState(true)
    const [searchValue, setSearchValue] = useState('');
    const [refine, setRefine] = useState({});
    const limit = 5

    const placeCards = useMemo(() => 
        places.map((place, index) => <PlaceCard place={place} key={index}/>
    ),[places])

    const getPlaces = async () => {
        const refineEncoded = refineStingify(refine)
        const params = new URLSearchParams({limit,offset})
        console.log(`https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?${params}&${refineEncoded}`)
        try{
            const response = await fetch(`https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?${params}&${refineEncoded}`)
            const result = await response.json()
            console.log(result)
            const response2 = await fetch(`https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?${params}&${refineEncoded}`)
            const result2 = await response2.json()
            console.log(result2)
            setPlaces((current) => [...current, ...result.results, ...result2.results])
            setoffset((current) => current + limit )
            return true
        }catch (error) {
            console.log(error)
            return false
        }
    }

    useEffect(()=>{
        console.log("refine")
        setPlaces([])
        getPlaces()
    },[refine])


    const handleScroll = async (e) => {
        if (e.target.lastChild.getBoundingClientRect().top < window.innerHeight && wait){
            setWait(false)
            setWait( await getPlaces())

        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
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
    const keys = Object.keys(refine)
    const finalArr = []
    keys.forEach((key) => {
        if(refine[key])
        finalArr.push(`refine=${key}:"${refine[key]}"`)
    })
    const refineEncoded = encodeURI(finalArr.join("&"))
    return refineEncoded
}