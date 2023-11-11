import PlaceCard from "@/composants/PlaceCard"
import Image from "next/image"

export default function List({}) {
    const days = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche",
    ]

    return (
        <div className="w-1/4 p-6 flex flex-col gap-6">
            <PlaceCard/>
            <PlaceCard/>
            <PlaceCard/>
        </div>
    )
}


{/* Card */}
{/* <div className="flex flex-col p-3 space-y-2 bg-white rounded-xl">
<div className="flex space-x-3">
    <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/svg/place_type/fontaine.svg"
        alt="Next.js Logo"
        width={42}
        height={42}
    />
    <div className="flex flex-col">
        <h3 className=" font-semibold text-primary">
            Ville de Paris Bois
        </h3>
        <span className=" text-xs text-gray_C1">Fontaine</span>
    </div>
</div>
<div>
    <div className="flex space-x-14">
        <span className="w-full text-xs">
            Avenue de l&apos;hippodrome, Paris, 16eme
        </span>
        <Image
            src="/svg/Icones/copy.svg"
            alt="Next.js Logo"
            width={24}
            height={24}
        />
    </div>
    <div className=" py-3 flex gap-1.5 scrollbar-hide overflow-x-hidden">
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
    </div>
    <div className="flex justify-between">
        <span className=" text-green text-xs">Ouvert</span>
        <span className="text-gray_C1 text-xs">Gratuit</span>
    </div>
</div>
</div> */}