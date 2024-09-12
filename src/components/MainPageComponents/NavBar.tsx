import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";

export default function NavBar() {
  return (
    <nav className="absolute top-[177px] left-[162px] flex justify-between align-center w-[1596px] h-auto">
      <div className="flex p-[6px] gap-[24px] rounded-[10px]  border-[1px] border-[#DBDBDB]">
        <div className="flex items-center gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px]">რეგიონი <IoIosArrowDown /></div>
        <div className="flex items-center gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px]">საფასო კატეგორია <IoIosArrowDown /></div>
        <div className="flex items-center gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px]">ფართობი <IoIosArrowDown /></div>
        <div className="flex items-center gap-[4px] py-[8px] px-[14px] text-[#021526] font-medium text-[16px]">საძინებლების რაოდენობა<IoIosArrowDown /></div>
      </div>
      <div className="flex">
        <div>ლისტინგის დამატება<FiPlus/></div>
        <div>აგენტის დამატება <FiPlus/></div>
      </div>
    </nav>
  )
}