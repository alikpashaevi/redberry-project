"use client";

import React  from "react";
import Image from 'next/image';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

//icons
import vector from  "../../public/icons/Vector.png";
import zipIcon from "../../public/icons/zip.png";
import bedIcon from "../../public/icons/bed.png"; 
import locationIcon from "../../public/icons/location-marker.png";
import { useState } from 'react';
import { div } from "framer-motion/client";
import Loading from "../Loading";

// Define the data type for real estate data
interface RealEstate {
  id: number;
  address: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  image: string;
  is_rental: number;
  name: string; 
}

interface MainCardProps {
  realEstates: RealEstate[];
  loading: boolean;
  asSlider: boolean;
}

export default function MainCard({ realEstates, loading,asSlider }: MainCardProps) {
  // If loading, show a loader
  if (loading) {
    return <div className="w-[1591px] h-[500px] flex items-center justify-center ">
      <Loading />
    </div>;
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= realEstates.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? realEstates.length - 1 : prevIndex - 1
    );
  };
  if (asSlider) {
    return (
      <div className="relative">
        <div className="relative w-[1591px] overflow-hidden">
          <div 
            className="flex gap-[20px] pb-[300px] transition-transform duration-300 ease-in-out w-[1591px]" 
            style={{ transform: `translateX(-${currentIndex * 404}px)` }}
            >
            {realEstates.map((estate) => (
              <a href={`/${estate.id}`} key={estate.id} className="flex flex-col min-w-[384px] rounded-[14px] overflow-hidden relative">
              {estate.is_rental ? (
                <span className="absolute w-[90px] p-[6px] rounded-[26px] top-[10px] left-[10px] bg-[#02152680] font-medium text-[12px] leading-[14.4px] text-center text-white tracking-wider">ქირავდება</span>
              ) : (
                <span className="absolute w-[90px] p-[6px] rounded-[26px] top-[10px] left-[10px] bg-[#02152680] font-medium text-[12px] leading-[14.4px] text-center text-white tracking-wider">იყიდება</span>
              )}
              <img src={estate.image} alt="Real estate"  className="h-[307px] bg-cover bg-center" />
              <div>
                <div className="flex flex-col gap-[20px] py-[22px] px-[25px] border-x-[1px] border-b-[1px] border-color-[#DBDBDB] rounded-b-[14px]">
                  <div className="flex flex-col gap-[6px]">
                    <h3 className="font-bold text-[28px] leading-[33.6px]">{estate.price} ₾</h3>
                    <p className="flex gap-[4px] text-[16px] text-[#021526B2] font-normal leading-[19.2px]">
                      <Image src={locationIcon} height={20} width={20} alt="location icon" /> {estate.address}
                    </p>
                  </div>
                  <div className="flex gap-[32px]">
                    <span className="flex gap-[5px] items-center text-[16px] text-[#021526B2]">
                      <Image src={bedIcon} height={24} width={24} alt="bed icon" />{estate.bedrooms}
                    </span>
                    <span className="flex gap-[5px] items-center text-[16px] text-[#021526B2]">
                      <Image src={vector} height={18} width={18} alt="area icon" />{estate.area} მ²
                    </span>
                    <span className="flex gap-[5px] items-center text-[16px] text-[#021526B2]">
                      <Image src={zipIcon} height={18} width={15} alt="zip icon" /> {estate.zip_code}
                    </span>
                  </div>
                </div>
              </div>
              </a>
            ))}
          </div>
        </div>
        <span 
            className="absolute left-[-40px] top-[213px] transform -translate-y-1/2 text-[30px] cursor-pointer"
            onClick={handlePrev}
          >
            <FiArrowLeft />
          </span>
          <span 
            className="absolute right-[-40px] top-[213px] transform -translate-y-1/2 text-[30px] cursor-pointer"
            onClick={handleNext}
          >
            <FiArrowRight />
          </span>
      </div>
    );
  }

  return (
    
    <div className="flex flex-wrap gap-[20px] pb-[300px] w-[1596px]">
      {realEstates.length === 0 ? (
        <div>აღნიშნული მონაცემებით განცხადება არ იძებნება.</div>
      ) : (
        realEstates.map((estate) => (
          <a href={`/${estate.id}`} key={estate.id} className="flex flex-col w-[384px] rounded-[14px] overflow-hidden relative">
            {estate.is_rental ? (
              <span className="absolute w-[90px] p-[6px] rounded-[26px] top-[10px] left-[10px] bg-[#02152680] font-medium text-[12px] leading-[14.4px] text-center text-white tracking-wider">ქირავდება</span>
            ) : (
              <span className="absolute w-[90px] p-[6px] rounded-[26px] top-[10px] left-[10px] bg-[#02152680] font-medium text-[12px] leading-[14.4px] text-center text-white tracking-wider">იყიდება</span>
            )}
            <img src={estate.image} alt="Real estate"  className="h-[307px] bg-cover bg-center" />
            <div>
              <div className="flex flex-col gap-[20px] py-[22px] px-[25px] border-x-[1px] border-b-[1px] border-color-[#DBDBDB] rounded-b-[14px]">
                <div className="flex flex-col gap-[6px]">
                  <h3 className="font-bold text-[28px] leading-[33.6px]">{estate.price} ₾</h3>
                  <p className="flex gap-[4px] text-[16px] text-[#021526B2] font-normal leading-[19.2px]">
                    <Image src={locationIcon} height={20} width={20} alt="location icon" /> {estate.address}
                  </p>
                </div>
                <div className="flex gap-[32px]">
                  <span className="flex gap-[5px] items-center text-[16px] text-[#021526B2]">
                    <Image src={bedIcon} height={24} width={24} alt="bed icon" />{estate.bedrooms}
                  </span>
                  <span className="flex gap-[5px] items-center text-[16px] text-[#021526B2]">
                    <Image src={vector} height={18} width={18} alt="area icon" />{estate.area} მ²
                  </span>
                  <span className="flex gap-[5px] items-center text-[16px] text-[#021526B2]">
                    <Image src={zipIcon} height={18} width={15} alt="zip icon" /> {estate.zip_code}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))
      )}
    </div>
  );
}
