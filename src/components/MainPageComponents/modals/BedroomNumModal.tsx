"use client";
import { useState, useEffect } from "react";

export default function BedroomNumModal({
  isOpen,
  onSelectBedroomNum,
  onClose,
  clearBedroomInput,
  bedroomNum,
  setBedrooms,
}: {
  isOpen: boolean;
  onSelectBedroomNum: (bedroomNum: number | null) => void;
  onClose: () => void;
  clearBedroomInput: () => void;
  bedroomNum: number | null;
  setBedrooms: (bedrooms: number | null) => void;
}) {
  const [tempBedroomNum, setTempBedroomNum] = useState<number | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const applyBedroomNum = () => {
    if (tempBedroomNum !== null && tempBedroomNum >= 0) {
      onSelectBedroomNum(tempBedroomNum);
      onClose();
    }
  };

  // useEffect(() => {
  //   if (!tempBedroomNum) {
  //     // setTempBedroomNum(null);
  //     setBedrooms(null);
  //     setIsInvalid(false);
  //   }
  // }, [clearBedroomInput]);

  useEffect(() => {
    setTempBedroomNum(bedroomNum);
  }, [bedroomNum]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    setTempBedroomNum(value);
    setIsInvalid(value !== null && value < 0);
  };

  return (
    <div className={`absolute z-10 bg-white top-[234px] left-[579px] w-[382px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[24px] ${isOpen ? "block" : "hidden"}`}>
      <div className="flex flex-col gap-[32px]">
        <div className="w-full flex flex-col gap-[24px]">
          <h3 className="font-medium text-[16px] text-[#021526] leading-[19.2px]">
            საძინებლების რაოდენობა
          </h3>
          <div>
          <div className={`w-[42px] h-[42px] relative rounded-[6px]  border-[1px] flex items-center  ${isInvalid ? 'border-red-600' : ''}`}>
            <input
              type="text"
              className="w-full border-none outline-none text-center"
              
              value={tempBedroomNum || ""}
              onChange={handleInputChange}
            />
          </div>
            {isInvalid && (
              <p className="text-red-600 text-sm mt-2">შეიყვანეთ ვალიდური მონაცემები</p>
            )}
            </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="rounded-[8px] py-[8px] px-[14px] bg-[#F93B1D] cursor-pointer font-medium text-white text-[14px] text-center leading-[16.8px]"
            onClick={applyBedroomNum}
          >
            არჩევა
          </button>
        </div>
      </div>
    </div>
  );
}
