"use client";
import { useState, useEffect } from "react";

export default function BedroomNumModal({
  isOpen,
  onSelectBedroomNum,
  onClose,
  clearBedroomInput, // Accept the function to clear the input
}: {
  isOpen: boolean;
  onSelectBedroomNum: (bedroomNum: number | null) => void;
  onClose: () => void;
  clearBedroomInput: () => void; // Clear function for resetting input
}) {
  const [bedroomNum, setBedroomNum] = useState<number | null>(null);

  const applyBedroomNum = () => {
    onSelectBedroomNum(bedroomNum);
    onClose(); // Close the modal
  };

  // Effect to clear the bedroom input when the filter is reset
  useEffect(() => {
    if (!bedroomNum) {
      setBedroomNum(null);
    }
  }, [clearBedroomInput]);

  return (
    <div className={`absolute z-10 bg-white top-[234px] left-[579px] w-[382px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[24px] ${isOpen ? "block" : "hidden"}`}>
      <div className="flex flex-col gap-[32px]">
        <div className="w-full flex flex-col gap-[24px]">
          <h3 className="font-medium text-[16px] text-[#021526] leading-[19.2px]">
            საძინებლების რაოდენობა
          </h3>
          <div className="w-full relative rounded-[6px] pr-[24px] border-[1px] p-[10px]">
            <input
              type="number"
              className="w-full border-none outline-none"
              placeholder="საძინებლების რაოდენობა"
              value={bedroomNum || ""}
              onChange={(e) =>
                setBedroomNum(e.target.value ? parseInt(e.target.value) : null)
              }
            />
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
