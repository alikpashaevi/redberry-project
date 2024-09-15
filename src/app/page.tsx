"use client";
import { useState, useEffect } from "react";

//components
import MainCard from '@/components/MainPageComponents/MainCard';
import NavBar from '@/components/MainPageComponents/NavBar';
import Properties from '@/components/MainPageComponents/Properties';
import RegionModal from '@/components/MainPageComponents/modals/RegionModal';
import PriceRangeModal from "@/components/MainPageComponents/modals/PriceRangeModal";

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
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
  const [filteredRealEstates, setFilteredRealEstates] = useState<RealEstate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);


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
    let filtered = realEstates;
  
    // Filter by selected regions
    if (selectedRegionIds.length > 0) {
      const selectedRegionNames = regions
        .filter((region) => selectedRegionIds.includes(region.id))
        .map((region) => region.name);
  
      filtered = filtered.filter((estate) =>
        selectedRegionNames.includes(estate.city.region.name)
      );
    }
  
    // Filter by selected price range
    if (minPrice !== null && maxPrice !== null) {
      // console.log("Min Price:", minPrice, "Max Price:", maxPrice);
      // console.log("Filtered Real Estates before:", filtered);
      filtered = filtered.filter(
        (estate) => estate.price >= minPrice && estate.price <= maxPrice
      );
      // console.log("Filtered Real Estates:", filtered);
    }
  
    setFilteredRealEstates(filtered);
  }, [selectedRegionIds, regions, realEstates, minPrice, maxPrice]);
  
  

  const toggleRegionModal = () => {
    setIsOpen(!isOpen); // Toggle region modal
    if (isPriceOpen) setIsPriceOpen(false); // Close price modal if it's open
  };
  
  const togglePriceModal = () => {
    setIsPriceOpen(!isPriceOpen); // Toggle price modal
    if (isOpen) setIsOpen(false); // Close region modal if it's open
  };

  return (
    <div className="w-[1596px] flex flex-col">
      <NavBar toggleRegionModal={toggleRegionModal} togglePriceModal={togglePriceModal} />
      <RegionModal
        isOpen={isOpen}
        regions={regions}
        onSelectRegions={handleSelectRegions}
        onClose={toggleRegionModal}
      />
      <PriceRangeModal 
        isOpen={isPriceOpen}
        onClose={togglePriceModal}
        onSelectPriceRange={(minPrice, maxPrice) => {
          setMinPrice(minPrice);
          setMaxPrice(maxPrice);
          setIsPriceOpen(false); // Close price modal after applying
        }}
      />
      <Properties
        selectedRegions={regions.filter((region) => selectedRegionIds.includes(region.id)).map((region) => region.name)} // Pass region names instead of IDs
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      <MainCard 
        realEstates={filteredRealEstates} // Pass filtered data
        loading={loading}
      />
    </div>
  );
}
