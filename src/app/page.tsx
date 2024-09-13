"use client";
import { useState, useEffect } from "react";

//components
import MainCard from '@/components/MainPageComponents/MainCard';
import NavBar from '@/components/MainPageComponents/NavBar';
import Properties from '@/components/MainPageComponents/Properties';
import RegionModal from '@/components/MainPageComponents/modals/RegionModal';

export default function Home() {
  interface RealEstate {
    id: number;
    city: {
      region: {
        name: string;
      };
    };
    address: string;
    zip_code: string;
    price: number;
    area: number;
    bedrooms: number;
    image: string;
    is_rental: number;
    name: string; 
  }
  
  const [regions, setRegions] = useState<{ id: number, name: string }[]>([]); 
  const [selectedRegionIds, setSelectedRegionIds] = useState<number[]>([]); // Still track IDs here
  const [isOpen, setIsOpen] = useState(false);
  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
  const [filteredRealEstates, setFilteredRealEstates] = useState<RealEstate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the real estate data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer 9cfe53fd-50ef-4536-87f3-49a80fab2213",
            },
          }
        );
        const data = await response.json();
        setRealEstates(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching real estate data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch regions for filtering
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

  // Handle region selection from modal
  const handleSelectRegions = (selectedIds: number[]) => {
    setSelectedRegionIds(selectedIds); // Store selected region IDs
  };

  // Filter real estate data based on selected region names
  useEffect(() => {
    if (selectedRegionIds.length > 0) {
      const selectedRegionNames = regions
        .filter((region) => selectedRegionIds.includes(region.id))
        .map((region) => region.name);
  
      // Filter based on the region name inside the real estate's city object
      const filtered = realEstates.filter((estate) => 
        selectedRegionNames.includes(estate.city.region.name)
      );
      
      setFilteredRealEstates(filtered);
    } else {
      setFilteredRealEstates(realEstates); // Show all if no regions are selected
    }
  }, [selectedRegionIds, regions, realEstates]);
  

  const toggleModal = () => {
    setIsOpen(!isOpen);
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
      <Properties
        selectedRegions={regions.filter((region) => selectedRegionIds.includes(region.id)).map((region) => region.name)} // Pass region names instead of IDs
      />
      <MainCard 
        realEstates={filteredRealEstates} // Pass filtered data
        loading={loading}
      />
    </div>
  );
}
