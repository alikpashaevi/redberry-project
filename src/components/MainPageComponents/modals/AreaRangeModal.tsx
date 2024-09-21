"use client";

import { useEffect, useState } from "react";

export default function AreaRangeModal({
  isOpen,
  onSelectAreaRange,
  onClose,
  setMinArea,
  setMaxArea,
  minArea,
  maxArea,
}: {
  isOpen: boolean;
  onSelectAreaRange: (minArea: number | null, maxArea: number | null) => void;
  onClose: () => void;
  setMinArea: (minArea: number | null) => void;
  setMaxArea: (maxArea: number | null) => void;
  minArea: number | null;
  maxArea: number | null;
}) {
  const [tempMinArea, setTempMinArea] = useState<number | null>(null);
  const [tempMaxArea, setTempMaxArea] = useState<number | null>(null);

  const applyAreaRange = () => {
    if (tempMinArea !== null && tempMaxArea !== null && tempMaxArea > tempMinArea) {
      onSelectAreaRange(tempMinArea, tempMaxArea);
      onClose();
    }
  };

  useEffect(() => {
    setTempMinArea(minArea);
    setTempMaxArea(maxArea);
  }, [minArea, maxArea]);

  const handleMinAreaClick = (value: number) => {
    setTempMinArea(value);
  };

  const handleMaxAreaClick = (value: number) => {
    setTempMaxArea(value);
  };

  return (
    <div className={`absolute z-10 bg-white top-[234px] left-[529px] w-[382px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[24px] ${isOpen ? "block" : "hidden"}`}>
      <div className="flex flex-col gap-[32px]">
        <div className="w-full flex flex-col gap-[24px]">
          <h3 className="font-medium text-[16px] text-[#021526] leading-[19.2px]">
            ფართის მიხედვით
          </h3>
          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex gap-[15px] w-full">
              <div className={`w-1/2 relative rounded-[6px] pr-[24px] ${tempMinArea !== null && tempMaxArea !== null && tempMinArea > tempMaxArea ? 'border-red-600' : "border-[#dbdbdb]"} border-[1px] p-[10px]`}>
                <input
                  type="text"
                  className='w-full border-none outline-none'
                  placeholder="დან"
                  value={tempMinArea || ""}
                  onChange={(e) => setMinArea(e.target.value ? parseInt(e.target.value) : null)}
                />
                <span className="absolute top-[10px] right-[10px]">მ²</span>
              </div>
              <div className={`w-1/2 relative rounded-[6px] pr-[24px] ${tempMinArea !== null && tempMaxArea !== null && tempMinArea > tempMaxArea ? 'border-red-600' : "border-[#dbdbdb]"} border-[1px] p-[10px]`}>
                <input
                  type="text"
                  className='w-full border-none outline-none'
                  placeholder="მდე"
                  value={tempMaxArea || ""}
                  onChange={(e) => setMaxArea(e.target.value ? parseInt(e.target.value) : null)}
                />
                <span className="absolute top-[10px] right-[10px]">მ²</span>
              </div>
            </div>
            {tempMinArea !== null && tempMaxArea !== null && tempMinArea > tempMaxArea && (
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
