// import { IoIosClose } from "react-icons/io";
import Image from "next/image";

import closeIcon from  "../../public/icons/closeIcon.png";

export default function Properties({
  selectedRegions,
  minPrice,
  maxPrice,
  minArea,
  maxArea,
  bedrooms,
  resetBedrooms, // Receive the resetBedrooms function
  resetRegions,
  resetPrice,
  resetArea,
  resetAll,
  setSelectedRegionIds,
  setActiveRegionIds,
  activeRegionIds,
  regions,
}: {
  selectedRegions: any;
  minPrice: number | null;
  maxPrice: number | null;
  minArea: number | null;
  maxArea: number | null;
  bedrooms: number | null;
  activeRegionIds: any;
  resetBedrooms: () => void; // Define the type for the function
  resetRegions: () => void;
  resetPrice: () => void;
  resetArea: () => void;
  resetAll: () => void;
  setSelectedRegionIds: any;
  setActiveRegionIds: any;
  regions: any;
}) {
  return (
    <div className="absolute flex top-[240px] left-[162px] gap-[16px]">
      <div className="flex gap-[8px] items-center">
        {selectedRegions.map((region: number) => (
          <div key={region} className={`${selectedRegions.length > 0 ? 'flex' : "hidden"} items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]`}
            onClick={() => {
              console.log(selectedRegions, region)
              setSelectedRegionIds(selectedRegions.filter((id: number) => id !== region));
              setActiveRegionIds(activeRegionIds.filter((id: number) => id !== region));
            }}
          >
            {regions.find((r: any) => r.id === region)?.name}
          <Image src={closeIcon} alt="closeIcon" />
        </div>
      ))} 

        <div className={`${minArea !== null ? 'flex' : "hidden"} items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]`}
          onClick={resetArea}
        >{minArea} მ<sup>2</sup> - {maxArea} მ<sup>2</sup><Image src={closeIcon} alt="closeIcon" /></div>
        <div className={`${minPrice !== null ? 'flex' : "hidden"} items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]`}
          onClick={resetPrice}
        >{minPrice}₾ - {maxPrice}₾ <Image src={closeIcon} alt="closeIcon" /></div>
        <div className={`${bedrooms !== null ? 'flex' : "hidden"} items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]`}
          onClick={resetBedrooms} // Add onClick to reset bedrooms
        >
          {bedrooms} <Image src={closeIcon} alt="closeIcon" />
        </div>
      </div>
      <span className="flex items-center font-medium text-[14px] cursor-pointer"
        onClick={resetAll}
      >გასუფთავება</span>
    </div>
  );
}
