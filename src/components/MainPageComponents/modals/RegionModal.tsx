"use client";
import { useState } from "react";

export default function RegionModal({
  isOpen,
  regions,
  onSelectRegions,
  onClose,
}: {
  isOpen: boolean;
  regions: { id: number; name: string }[];
  onSelectRegions: (regionIds: number[]) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<number[]>([]); // Change to store selected region IDs

  const handleSelect = (regionId: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(regionId)
        ? prevSelected.filter((id) => id !== regionId)
        : [...prevSelected, regionId]
    );
  };

  const applySelection = () => {
    onSelectRegions(selected); // Send selected region IDs to parent
    onClose(); // Close the modal
  };

  return (
    <div className={`absolute z-10 bg-white top-[234px] left-[162px] w-[731px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[24px] ${isOpen ? "block" : "hidden"}`}>
      <div className="flex flex-col gap-[32px]">
        <div className="w-[679px] flex flex-col gap-[24px]">
          <h3 className="font-medium text-[16px] text-[#021526] leading-[19.2px]">
            რეგიონი
          </h3>
          <div className="flex flex-wrap gap-y-[20px] gap-x-[50px]">
            {regions.map((region) => (
              <div
                key={region.id}
                className="flex items-center gap-[8px] w-[191px]"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(region.id)}
                  onChange={() => handleSelect(region.id)} // Use ID instead of name
                  className="hidden peer"
                  id={`checkbox-${region.id}`}
                />
                <label
                  htmlFor={`checkbox-${region.id}`}
                  className="w-[20px] h-[20px] border-[1px] border-[#dbdbdb] rounded-sm flex justify-center items-center cursor-pointer peer-checked:bg-green-500"
                >
                  <svg
                    className={`w-4 h-4 text-white ${
                      selected.includes(region.id) ? "block" : "hidden"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </label>
                <span className="font-normal text-[14px] leading-[16.8px]">
                  {region.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[683px] flex justify-end">
          <button
            className="rounded-[8px] py-[8px] px-[14px] bg-[#F93B1D] cursor-pointer font-medium text-white text-[14px] text-center leading-[16.8px]"
            onClick={applySelection}
          >
            არჩევა
          </button>
        </div>
      </div>
    </div>
  );
}
