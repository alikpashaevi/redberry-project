import { IoCheckmarkSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

export default function AddAgentModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-[10px] w-[1009px] flex justify-center items-center px-[105px] py-[87px]">
        <div className="flex flex-col gap-[72px] w-full">
          <h2 className="text-center text-[#021526] font-medium text-[32px] leading-[38.4px]">აგენტის დამატება</h2>
          <div className="flex flex-col gap-[28px]">
            <div className="flex gap-[30px] w-full">
              <div className="flex flex-col gap-[4px] w-1/2">
                <span className="text-[14px] leading-[16.8px] font-medium">სახელი *</span>
                <input className="rounded-[6px] p-[10px] border-[1px] outline-none border-[#808A93]" type="text" />
                <div className="flex items-center gap-[7px]"><span><IoCheckmarkSharp /></span>მინიმუმ ორი სიმბოლო</div>
              </div>
              <div className="flex flex-col gap-[4px] w-1/2">
                <span className="text-[14px] leading-[16.8px] font-medium">გვარი</span>
                <input className="rounded-[6px] p-[10px] border-[1px] outline-none border-[#808A93]" type="text" />
                <div className="flex items-center gap-[7px]"><span><IoCheckmarkSharp /></span>მინიმუმ ორი სიმბოლო</div>
              </div>
            </div>
            <div className="flex gap-[30px] w-full">
              <div className="flex flex-col gap-[4px] w-1/2">
                <span className="text-[14px] leading-[16.8px] font-medium">ელ-ფოსტა *</span>
                <input className="rounded-[6px] p-[10px] border-[1px] outline-none border-[#808A93]" type="email" />
                <div className="flex items-center gap-[7px]"><span><IoCheckmarkSharp /></span>გამოიყენეთ @redberry.ge ფოსტა</div>
              </div>
              <div className="flex flex-col gap-[4px] w-1/2">
                <span className="text-[14px] leading-[16.8px] font-medium">ტელეფონის ნომერი</span>
                <input className="rounded-[6px] p-[10px] border-[1px] outline-none border-[#808A93]" type="text" />
                <div className="flex items-center gap-[7px]"><span><IoCheckmarkSharp /></span>მხოლოდ რიცხვები</div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] w-full">
              <span className="text-[14px] leading-[16.8px] font-medium">ატვირთეთ ფოტო</span>
              <div className="flex items-center justify-center border-[1px] border-[#2D3648] h-[120px] rounded-[8px] border-dashed">
                <label htmlFor="fileInput" className="cursor-pointer">
                  <div className="w-[24px] h-[24px] flex items-center justify-center border border-[#2D3648] rounded-full  text-center">
                    <span className="text-[#2D3648] text-[14px] font-bold "><FaPlus/></span>
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full gap-[10px]">
            <button className="flex gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] border-[#F93B1D] border-[1px] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-white" >გაუქმება</button>
            <button className="flex gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] bg-[#F93B1D] text-white hover:bg-[#DF3014]">დაამატე აგენტი</button>
          </div>
        </div>
      </div>
    </div>
  )
}