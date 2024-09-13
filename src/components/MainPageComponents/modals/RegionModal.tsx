"use client"
import { useState, useEffect } from "react";

export default function RegionModal({
  isOpen,
  onSelectRegions,
}: {
  isOpen: boolean;
  onSelectRegions: (regions: string[]) => void;
}) {
  const [regions, setRegions] = useState<{ id: number, name: string }[]>([]); // Fix type to reflect API response structure
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/regions", {
          headers: {
            Authorization: "Bearer 9cfe53fd-50ef-4536-87f3-49a80fab2213",
          },
        });
        const data = await response.json();
        setRegions(data); // Assuming the API returns an array of objects with id and name properties
        console.log(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegions();
  }, []);

  const handleSelect = (regionName: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(regionName)
        ? prevSelected.filter((r) => r !== regionName)
        : [...prevSelected, regionName]
    );
  };

  const applySelection = () => {
    onSelectRegions(selected);
    isOpen = false; // This line won't work as `isOpen` is a prop, consider using `onClose` callback if needed
  };

  return (
    <div className="absolute z-10 bg-white top-[60px] w-[731px] rounded-[10px] border-[1px] border-[#DBDBDB] p-[24px]">
      <div className={`${isOpen ? "block" : "hidden"} flex flex-col gap-[32px]`}>
        <div className="w-[679px] flex flex-col gap-[24px]">
          <h3 className="font-medium text-[16px] text-[#021526] leading-[19.2px]">რეგიონის მიხედვით</h3>
          <div className="flex flex-wrap gap-y-[20px] gap-x-[50px]">
          {regions.map((region) => (
            <div key={region.id} className="flex items-center gap-[8px] w-[191px]">
              <input
                type="checkbox"
                checked={selected.includes(region.name)}
                onChange={() => handleSelect(region.name)}
                className="hidden peer" // Hides the default checkbox
                id={`checkbox-${region.id}`} // Give unique ID for label
              />
              <label
                htmlFor={`checkbox-${region.id}`}
                className="w-[20px] h-[20px] border-[1px] border-[#dbdbdb] rounded-sm flex justify-center items-center cursor-pointer peer-checked:bg-green-500"
              >
                {/* Icon or checkmark */}
                <svg
                  className={`w-4 h-4 text-white ${selected.includes(region.name) ? "block" : "hidden"}`}
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
              <span className="font-normal text-[14px] leading-[16.8px]">{region.name}</span> {/* Render the name of the region */}
            </div>
          ))}
          </div>
        </div>
        <div className="w-[683px] flex justify-end"><button className="rounded-[8px] py-[8px] px-[14px] bg-[#F93B1D] cursor-pointer font-medium text-white text-[14px] text-center leading-[16.8px]" onClick={applySelection}>არჩევა</button></div>
      </div>
    </div>
  );
}
