
export default function SearchBarSmall({value, onChange}) {

    return (
        <input type="text" value={value} onChange={onChange} name="postalCode" className=" text-sm text-gray_C1 py-1.5 px-4 rounded-xl border border-borderGray w-full h-full grow shrink-0 basis-0 focus-visible:border-primary focus:border-primary" placeholder="Code postal"/>
    )
}

