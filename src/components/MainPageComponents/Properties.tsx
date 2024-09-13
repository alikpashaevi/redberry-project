import { IoIosClose } from "react-icons/io";

export default function Properties({
  selectedRegions,
  // priceRange,
  // areaRange,
  //bedrooms,
}: {selectedRegions: string[]}) {
  return(
    <div className="absolute flex top-[240px] left-[162px] gap-[16px]">
      <div className="flex gap-[8px] items-center">
      <div className={`${selectedRegions.length > 0 ? 'flex' : "hidden"} items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]`}>
          {selectedRegions.map((region, index) => (
            <div key={index}>{region}{selectedRegions.length > 1 && ',' }</div>
          ))} 
          <IoIosClose />
        </div>

        <div className="flex items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]">55 მ<sup>2</sup> - 90 მ<sup>2</sup><IoIosClose /></div>
        <div className="flex items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]">2000$ - 10000$ <IoIosClose /></div>
        <div className="flex items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]">1 <IoIosClose /></div>
      </div>
      <span className="flex items-center font-medium text-[14px] cursor-pointer">გასუფთავება</span>
    </div>
  )
}