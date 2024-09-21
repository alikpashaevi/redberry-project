"use client";
import { useState, useEffect } from "react";

//components
import MainCard from '@/components/MainPageComponents/MainCard';
import NavBar from '@/components/MainPageComponents/NavBar';
import Properties from '@/components/MainPageComponents/Properties';
import RegionModal from '@/components/MainPageComponents/modals/RegionModal';
import PriceRangeModal from "@/components/MainPageComponents/modals/PriceRangeModal";
import AreaRangeModal from "@/components/MainPageComponents/modals/AreaRangeModal";
import BedroomNumModal from "@/components/MainPageComponents/modals/BedroomNumModal";
import AddAgentModal from "@/components/MainPageComponents/modals/AddAgentModal";

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

  interface FilterValues {
    selectedRegionIds: number[];
    minPrice: number | null;
    maxPrice: number | null;
    minArea: number | null;
    maxArea: number | null;
    bedrooms: number | null;
  }
  
  const [regions, setRegions] = useState<{ id: number, name: string }[]>([]); 
  const [selectedRegionIds, setSelectedRegionIds] = useState<number[]>([]); // Still track IDs here
  const [activeRegionIds, setActiveRegionIds] = useState<number[]>([]); // Still track IDs here
  const [isOpen, setIsOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isBedroomsOpen, setIsBedroomsOpen] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
  const [filteredRealEstates, setFilteredRealEstates] = useState<RealEstate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minArea, setMinArea] = useState<number | null>(null);
  const [maxArea, setMaxArea] = useState<number | null>(null);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
  useEffect(() => {
    console.log("here 2")
    const savedFilters = localStorage.getItem('filterValues');
    if (savedFilters) {
      const { selectedRegionIds, minPrice, maxPrice, minArea, maxArea, bedrooms } = JSON.parse(savedFilters);
      console.log(selectedRegionIds)
      setSelectedRegionIds(selectedRegionIds || []);
      setMinPrice(minPrice !== null ? minPrice : null);
      setMaxPrice(maxPrice !== null ? maxPrice : null);
      setMinArea(minArea !== null ? minArea : null);
      setMaxArea(maxArea !== null ? maxArea : null);
      setBedrooms(bedrooms !== null ? bedrooms : null);
    }
  }, []); // Empty dependency array ensures this runs only on mount

  // Handle region selection from modal
  const handleSelectRegions = (selectedIds: number[]) => {
    setSelectedRegionIds(selectedIds); 
  };

  // Filter real estate data based on selected region names
  useEffect(() => {
    console.log("here 1", selectedRegionIds)
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
      filtered = filtered.filter(
        (estate) => estate.price >= minPrice && estate.price <= maxPrice
      );
    }
  
    // Filter by selected area range
    if (minArea !== null && maxArea !== null) {
      filtered = filtered.filter(
        (estate) => estate.area >= minArea && estate.area <= maxArea
      );
    }

    // Filter by selected bedrooms
    if (bedrooms !== null) {
      filtered = filtered.filter((estate) => estate.bedrooms === bedrooms);
    }

    localStorage.setItem('filteredRealEstates', JSON.stringify(filtered));

    // Save the selected filter values to localStorage
    const filterValues = {
      selectedRegionIds,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      bedrooms
    };
    console.log(filterValues);
    localStorage.setItem('filterValues', JSON.stringify(filterValues));
  
    setFilteredRealEstates(filtered);
  }, [selectedRegionIds, regions, realEstates, minPrice, maxPrice, minArea, maxArea, bedrooms]);

  // Reset Properties
  const resetBedrooms = () => {
    setBedrooms(null);
    updateLocalStorage({ bedrooms: null });
  };

  const resetRegions = () => {
    setSelectedRegionIds([]);
    updateLocalStorage({ selectedRegionIds: [] });
    setActiveRegionIds([]);
  };

  const resetPrice = () => {
    setMinPrice(null);
    setMaxPrice(null);
    updateLocalStorage({ minPrice: null, maxPrice: null });
  };

  const resetArea = () => {
    setMinArea(null);
    setMaxArea(null);
    updateLocalStorage({ minArea: null, maxArea: null });
  };

  const resetAll = () => {
    resetRegions();
    resetBedrooms();
    resetPrice();
    resetArea();
  };

  // Helper function to update localStorage
  const updateLocalStorage = (updates: Partial<FilterValues>) => {
    const savedFilters = localStorage.getItem('filterValues');
    const currentFilters: FilterValues = savedFilters ? JSON.parse(savedFilters) : {
      selectedRegionIds: [],
      minPrice: null,
      maxPrice: null,
      minArea: null,
      maxArea: null,
      bedrooms: null
    };
    const updatedFilters = { ...currentFilters, ...updates };
    console.log('loginsdkf')
    localStorage.setItem('filterValues', JSON.stringify(updatedFilters));
  };

  const toggleRegionModal = () => {
    setIsOpen(!isOpen);
    setActiveFilter(isOpen ? null : "region"); // Manage active filter state
    if (isPriceOpen) setIsPriceOpen(false);
    if (isAreaOpen) setIsAreaOpen(false);
    if (isBedroomsOpen) setIsBedroomsOpen(false);
  };

  const togglePriceModal = () => {
    setIsPriceOpen(!isPriceOpen);
    setActiveFilter(isPriceOpen ? null : "price");
    if (isOpen) setIsOpen(false);
    if (isAreaOpen) setIsAreaOpen(false);
    if (isBedroomsOpen) setIsBedroomsOpen(false);
  };

  const toggleAreaModal = () => {
    setIsAreaOpen(!isAreaOpen);
    setActiveFilter(isAreaOpen ? null : "area");
    if (isOpen) setIsOpen(false);
    if (isPriceOpen) setIsPriceOpen(false);
    if (isBedroomsOpen) setIsBedroomsOpen(false);
  };

  const toggleBedroomsModal = () => {
    setIsBedroomsOpen(!isBedroomsOpen);
    setActiveFilter(isBedroomsOpen ? null : "bedrooms");
    if (isOpen) setIsOpen(false);
    if (isPriceOpen) setIsPriceOpen(false);
    if (isAreaOpen) setIsAreaOpen(false);
  };

  const toggleAgentModal = () => {
    setIsAgentOpen(true);
  }

  return (
    <div className="w-[1596px] flex flex-col">
      <NavBar
        toggleRegionModal={toggleRegionModal}
        togglePriceModal={togglePriceModal}
        toggleAreaModal={toggleAreaModal}
        toggleBedroomsModal={toggleBedroomsModal}
        toggleAgentModal={toggleAgentModal}
        activeFilter={activeFilter} // Pass activeFilter to NavBar
      />
      <RegionModal
        isOpen={isOpen}
        regions={regions}
        onSelectRegions={handleSelectRegions}
        onClose={toggleRegionModal}
        selectedRegionIds={selectedRegionIds|| []}
        activeRegionIds={activeRegionIds}
        setActiveRegionIds={setActiveRegionIds}
        setSelectedRegionIds={setSelectedRegionIds}
      />
      <PriceRangeModal
        isOpen={isPriceOpen}
        onClose={togglePriceModal}
        onSelectPriceRange={(minPrice, maxPrice) => {
          setMinPrice(minPrice);
          setMaxPrice(maxPrice);
          setIsPriceOpen(false);
        }}
      />
      <AreaRangeModal
        isOpen={isAreaOpen}
        onClose={toggleAreaModal}
        onSelectAreaRange={(minArea, maxArea) => {
          setMinArea(minArea);
          setMaxArea(maxArea);
          setIsAreaOpen(false);
        }}
      />
      <BedroomNumModal
        isOpen={isBedroomsOpen}
        onClose={toggleBedroomsModal}
        onSelectBedroomNum={(bedrooms: number | null) => {
          setBedrooms(bedrooms);
          setIsBedroomsOpen(false);
          setActiveFilter(null); // Clear the active filter when "არჩევა" is clicked
        }}
        clearBedroomInput={resetBedrooms}
      />
      <Properties
        selectedRegions={selectedRegionIds}
        regions={regions}
        minPrice={minPrice}
        maxPrice={maxPrice}
        minArea={minArea}
        maxArea={maxArea}
        bedrooms={bedrooms}
        resetBedrooms={resetBedrooms}
        resetRegions={resetRegions}
        resetPrice={resetPrice}
        resetArea={resetArea}
        resetAll={resetAll}
        setSelectedRegionIds={setSelectedRegionIds}
        setActiveRegionIds={setActiveRegionIds}
        activeRegionIds={activeRegionIds}
      />
      <div className="absolute top-[301px] left-[162px]">
        <MainCard realEstates={filteredRealEstates} loading={loading} asSlider={false} />
      </div>
      <AddAgentModal 
        isAgentOpen={isAgentOpen}
        onClose={() => setIsAgentOpen(false)}
      />
    </div>
  );
}
