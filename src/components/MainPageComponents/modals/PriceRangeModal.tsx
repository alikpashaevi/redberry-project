"use client";
import { useState } from "react";

export default function PriceRangeModal({
  isOpen,
  onSelectPriceRange,
  onClose,
}: {
  isOpen: boolean;
  onSelectPriceRange: (minPrice: number | null, maxPrice: number | null) => void;
  onClose: () => void;
}) {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const applyPriceRange = () => {
    if (minPrice !== null && maxPrice !== null && maxPrice > minPrice) {
      onSelectPriceRange(minPrice, maxPrice);
      onClose(); // Close the modal
    }
  };

  return (
    <div className={`absolute z-10 bg-white top-[234px] left-[306px] w-[382px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[24px] ${isOpen ? "block" : "hidden"}`}>
      <div className="flex flex-col gap-[32px]">
        <div className="w-full flex flex-col gap-[24px]">
          <h3 className="font-medium text-[16px] text-[#021526] leading-[19.2px]">
            ფასის მიხედვით
          </h3>
          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex gap-[15px] w-full">
              <div className={`w-1/2 relative rounded-[6px] pr-[24px] ${minPrice !== null && maxPrice !== null && minPrice > maxPrice ? 'border-red-600' : "border-[#dbdbdb]"} border-[1px] p-[10px]`}>
                <input
                  type="text"
                  className="w-full border-none outline-none"
                  placeholder="დან"
                  value={minPrice || ""}
                  onChange={(e) => setMinPrice(e.target.value ? parseInt(e.target.value) : null)}
                />
                <span className="absolute top-[10px] right-[10px]">₾</span>
              </div>
              <div className={`w-1/2 relative rounded-[6px] pr-[24px] ${minPrice !== null && maxPrice !== null && minPrice > maxPrice ? 'border-red-600' : "border-[#dbdbdb]"} border-[1px] p-[10px]`}>
                <input
                  type="text"
                  className="w-full border-none outline-none"
                  placeholder="მდე"
                  value={maxPrice || ""}
                  onChange={(e) => setMaxPrice(e.target.value ? parseInt(e.target.value) : null)}
                />
                <span className="absolute top-[10px] right-[10px]">₾</span>
              </div>
            </div>
            {minPrice !== null && maxPrice !== null && minPrice > maxPrice && (
              <p className="text-red-600 text-[12px] w-full">ჩაწერეთ ვალიდური მონაცემები</p>
            )}
          </div>
          <div className="w-[334px] flex gap-[24px]">
            <div className="w-full flex flex-col gap-[16px]">
              <h3 className="text-start text-[#021526] font-medium text-[14px] leading-[16.8px]">მინ. ფასი</h3>
              <ul>
                <li>50,000 ₾</li>
                <li>100,000 ₾</li>
                <li>150,000 ₾</li>
                <li>200,000 ₾</li>
                <li>300,000 ₾</li>
              </ul>
            </div>
            <div className="w-full flex flex-col gap-[16px]">
              <h3 className="text-start text-[#021526] font-medium text-[14px] leading-[16.8px]">მაქს. ფასი</h3>
              <ul>
                <li>50,000 ₾</li>
                <li>100,000 ₾</li>
                <li>150,000 ₾</li>
                <li>200,000 ₾</li>
                <li>300,000 ₾</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="rounded-[8px] py-[8px] px-[14px] bg-[#F93B1D] cursor-pointer font-medium text-white text-[14px] text-center leading-[16.8px]"
              onClick={applyPriceRange}
          >
            არჩევა
          </button>
        </div>
      </div>
    </div>
  );
}
