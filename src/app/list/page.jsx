'use client'
import PlaceCard from "@/components/PlaceCard"
import { useEffect, useState, useMemo, useRef } from "react"

export default function List({}) {
    const parentRef = useRef()
    const [places,setPlaces] = useState([])
    const [offset,setoffset] = useState(0)
    const [wait,setWait] = useState(true)
    const limit = 5

    const placeCards = useMemo(() => 
        places.map(place => <PlaceCard place={place} key={place.identifiant}/>
    ),[places])

    const getPlaces = async () => {
        const params = new URLSearchParams({limit,offset})
        try{
            const response = await fetch(`https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?${params}`)
            const result = await response.json()
            console.log(result)
            const response2 = await fetch(`https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?${params}`)
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
        getPlaces()
    },[])

    const handleScroll = async (e) => {
        // e.preventDefault()
        console.dir(e.target.lastChild.getBoundingClientRect().top)
        if (e.target.lastChild.getBoundingClientRect().top < window.innerHeight && wait){
            setWait(false)
            setWait( await getPlaces())

        }
    }

    return (
        <div className="w-1/4 p-6 flex flex-col gap-6 overflow-y-scroll h-screen" onScroll={handleScroll} ref={parentRef}>
            {placeCards}
        </div>
    )
}