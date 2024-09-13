"use client";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

export default function NavBar({ toggleModal }: { toggleModal: () => void }) {
  return (
    <nav className="absolute top-[177px] left-[162px] flex justify-between align-center w-[1596px] h-auto">
      <div className="flex p-[6px] gap-[24px] rounded-[10px]  border-[1px] border-[#DBDBDB]">
        <div
          className="flex items-center cursor-pointer gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px]"
          onClick={toggleModal} // Toggle modal on click
        >
          რეგიონი <IoIosArrowDown />
        </div>
        <div className="flex items-center cursor-pointer gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px]">
          საფასო კატეგორია <IoIosArrowDown />
        </div>
        <div className="flex items-center cursor-pointer gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px]">
          ფართობი <IoIosArrowDown />
        </div>
        <div className="flex items-center cursor-pointer gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px]">
          საძინებლების რაოდენობა<IoIosArrowDown />
        </div>
      </div>
      <div className="flex gap-[16px]">
        <div className="flex gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] bg-[#F93B1D] text-white hover:bg-[#DF3014]">
          <FiPlus />
          ლისტინგის დამატება
        </div>
        <div className="flex gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] border-[#F93B1D] border-[1px] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-white">
          <FiPlus />
          აგენტის დამატება{" "}
        </div>
      </div>
    </nav>
  );
}
