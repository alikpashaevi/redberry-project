"use client";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

export default function NavBar({
  toggleRegionModal,
  togglePriceModal,
  toggleAreaModal,
  toggleBedroomsModal,
  toggleAgentModal,
  activeFilter,
}: {
  toggleRegionModal: () => void;
  togglePriceModal: () => void;
  toggleAreaModal: () => void;
  toggleBedroomsModal: () => void;
  toggleAgentModal: () => void;
  activeFilter: string | null;
}) {
  const isActive = (filter: string) => activeFilter === filter;

  return (
    <nav className="absolute top-[177px] left-[162px] flex justify-between align-center w-[1596px] h-auto">
      <div className="flex p-[6px] gap-[24px] rounded-[10px] border-[1px] border-[#DBDBDB]">
        <button
          className={`flex items-center cursor-pointer gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px] rounded-[6px] ${
            isActive("region") ? "bg-[#dbdbdb]" : ""
          }`}
          onClick={toggleRegionModal}
        >
          რეგიონი
          <span className={`transition-transform ${isActive("region") ? "rotate-180" : ""}`}>
            <IoIosArrowDown />
          </span>
        </button>
        <button
          className={`flex items-center cursor-pointer gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px] rounded-[6px] ${
            isActive("price") ? "bg-[#dbdbdb]" : ""
          }`}
          onClick={togglePriceModal}
        >
          საფასო კატეგორია
          <span className={`transition-transform ${isActive("price") ? "rotate-180" : ""}`}>
            <IoIosArrowDown />
          </span>
        </button>
        <button
          className={`flex items-center cursor-pointer gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px] rounded-[6px] ${
            isActive("area") ? "bg-[#dbdbdb]" : ""
          }`}
          onClick={toggleAreaModal}
        >
          ფართობი
          <span className={`transition-transform ${isActive("area") ? "rotate-180" : ""}`}>
            <IoIosArrowDown />
          </span>
        </button>
        <button
          className={`flex items-center cursor-pointer gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px] rounded-[6px] ${
            isActive("bedrooms") ? "bg-[#dbdbdb]" : ""
          }`}
          onClick={toggleBedroomsModal}
        >
          საძინებლების რაოდენობა
          <span className={`transition-transform ${isActive("bedrooms") ? "rotate-180" : ""}`}>
            <IoIosArrowDown />
          </span>
        </button>
      </div>
      <div className="flex gap-[16px]">
        <a href="/add-listing" className="flex transition-all gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] bg-[#F93B1D] text-white hover:bg-[#DF3014]">
          <FiPlus />
          ლისტინგის დამატება
        </a>
        <div 
          className="flex transition-all gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] border-[#F93B1D] border-[1px] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-white"
          onClick={toggleAgentModal}
          >
          <FiPlus />
          აგენტის დამატება
        </div>
      </div>
    </nav>
  );
}
