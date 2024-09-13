"use client";
import { useState, useEffect } from "react";

//components
import MainCard from '@/components/MainPageComponents/MainCard';
import NavBar from '@/components/MainPageComponents/NavBar';
import Properties from '@/components/MainPageComponents/Properties';
import RegionModal from '@/components/MainPageComponents/modals/RegionModal';

export default function Home() {
  const [regions, setRegions] = useState<{ id: number, name: string }[]>([]); 
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/regions", {
          headers: {
            Authorization: "Bearer 9cfe53fd-50ef-4536-87f3-49a80fab2213",
          },
        });
        const data = await response.json();
        setRegions(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegions();
  }, []);

  const handleSelectRegions = (regions: string[]) => {
    setSelectedRegions(regions);
  };

  return (
    <div className="w-[1596px] flex flex-col">
      <NavBar toggleModal={toggleModal} />
      <RegionModal
        isOpen={isOpen}
        regions={regions}
        onSelectRegions={handleSelectRegions}
        onClose={toggleModal}
      />
      <Properties selectedRegions={selectedRegions} />
      <MainCard />
    </div>
  );
}
