import { IoIosClose } from "react-icons/io";

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
}: {
  selectedRegions: string[];
  minPrice: number | null;
  maxPrice: number | null;
  minArea: number | null;
  maxArea: number | null;
  bedrooms: number | null;
  resetBedrooms: () => void; // Define the type for the function
  resetRegions: () => void;
  resetPrice: () => void;
  resetArea: () => void;
  resetAll: () => void;
}) {
  return (
    <div className="absolute flex top-[240px] left-[162px] gap-[16px]">
      <div className="flex gap-[8px] items-center">
        <div className={`${selectedRegions.length > 0 ? 'flex' : "hidden"} items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]`}
            onClick={resetRegions}
          >
          {selectedRegions.map((region, index) => (
            <div key={index}>{region}{index < selectedRegions.length - 1 && ', '}</div>
          ))} 
          <IoIosClose />
        </div>

        <div className={`${minArea !== null ? 'flex' : "hidden"} items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]`}
          onClick={resetArea}
        >{minArea} მ<sup>2</sup> - {maxArea} მ<sup>2</sup><IoIosClose /></div>
        <div className={`${minPrice !== null ? 'flex' : "hidden"} items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]`}
          onClick={resetPrice}
        >{minPrice}₾ - {maxPrice}₾ <IoIosClose /></div>
        <div className={`${bedrooms !== null ? 'flex' : "hidden"} items-center justify-center cursor-pointer border-[1px] rounded-[43px] gap-[4px] py-[6px] px-[10px] text-[14px]`}
          onClick={resetBedrooms} // Add onClick to reset bedrooms
        >
          {bedrooms} <IoIosClose />
        </div>
      </div>
      <span className="flex items-center font-medium text-[14px] cursor-pointer"
        onClick={resetAll}
      >გასუფთავება</span>
    </div>
  );
}
