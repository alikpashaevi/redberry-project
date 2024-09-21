"use client";
import { useState } from "react";

export default function AreaRangeModal({
  isOpen,
  onSelectAreaRange,
  onClose,
}: {
  isOpen: boolean;
  onSelectAreaRange: (minArea: number | null, maxArea: number | null) => void;
  onClose: () => void;
}) {
  const [minArea, setMinArea] = useState<number | null>(null);
  const [maxArea, setMaxArea] = useState<number | null>(null);

  const applyAreaRange = () => {
    if (minArea !== null && maxArea !== null && maxArea > minArea) {
      onSelectAreaRange(minArea, maxArea);
      onClose();
    }
  };

  const handleMinAreaClick = (value: number) => {
    setMinArea(value);
  };

  const handleMaxAreaClick = (value: number) => {
    setMaxArea(value);
  };

  return (
    <div className={`absolute z-10 bg-white top-[234px] left-[529px] w-[382px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[24px] ${isOpen ? "block" : "hidden"}`}>
      <div className="flex flex-col gap-[32px]">
        <div className="w-full flex flex-col gap-[24px]">
          <h3 className="font-medium text-[16px] text-[#021526] leading-[19.2px]">
            ფასის მიხედვით
          </h3>
          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex gap-[15px] w-full">
              <div className={`w-1/2 relative rounded-[6px] pr-[24px] ${minArea !== null && maxArea !== null && minArea > maxArea ? 'border-red-600' : "border-[#dbdbdb]"} border-[1px] p-[10px]`}>
                <input
                  type="text"
                  className='w-full border-none outline-none'
                  placeholder="დან"
                  value={minArea || ""}
                  onChange={(e) => setMinArea(e.target.value ? parseInt(e.target.value) : null)}
                />
                <span className="absolute top-[10px] right-[10px]">მ²</span>
              </div>
              <div className={`w-1/2 relative rounded-[6px] pr-[24px] ${minArea !== null && maxArea !== null && minArea > maxArea ? 'border-red-600' : "border-[#dbdbdb]"} border-[1px] p-[10px]`}>
                <input
                  type="text"
                  className='w-full border-none outline-none'
                  placeholder="მდე"
                  value={maxArea || ""}
                  onChange={(e) => setMaxArea(e.target.value ? parseInt(e.target.value) : null)}
                />
                <span className="absolute top-[10px] right-[10px]">მ²</span>
              </div>
            </div>
            {minArea !== null && maxArea !== null && minArea > maxArea && (
              <p className="text-red-600 text-[12px] w-full">ჩაწერეთ ვალიდური მონაცემები</p>
            )}
          </div>

          <div className="w-[334px] flex gap-[24px]">
            <div className="w-full flex flex-col gap-[16px]">
              <h3 className="text-start text-[#021526] font-medium text-[14px] leading-[16.8px]">მინ. მ²</h3>
              <ul>
                {[50, 75, 100, 125, 150].map((value) => (
                  <li
                    key={value}
                    className="cursor-pointer hover:bg-gray-100 p-1"
                    onClick={() => handleMinAreaClick(value)}
                  >
                    {value.toLocaleString()} მ²
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full flex flex-col gap-[16px]">
              <h3 className="text-start text-[#021526] font-medium text-[14px] leading-[16.8px]">მაქს. მ²</h3>
              <ul>
                {[75, 100, 125, 150, 200].map((value) => (
                  <li
                    key={value}
                    className="cursor-pointer hover:bg-gray-100 p-1"
                    onClick={() => handleMaxAreaClick(value)}
                  >
                    {value.toLocaleString()} მ²
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="rounded-[8px] py-[8px] px-[14px] bg-[#F93B1D] cursor-pointer font-medium text-white text-[14px] text-center leading-[16.8px]"
            onClick={applyAreaRange}
          >
            არჩევა
          </button>
        </div>
      </div>
    </div>
  );
}
