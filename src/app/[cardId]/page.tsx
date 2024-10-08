"use client"
import CardInfo from "@/components/CardPageComponents/CardInfo";
import DeleteModal from "@/components/CardPageComponents/DeleteModal";
import Loading from "@/components/Loading";
import MainCard from "@/components/MainPageComponents/MainCard";
import { useEffect, useState } from "react";

//icons
// import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import Image from "next/image";
import leftArrow from "../../public/icons/leftArrow.png";

export default function CardMainPage ({ params }: { params: { cardId: number} }) {

  interface CardInfoProps {
    id: number,
    address: string,
    zip_code: string,
    price: number,
    area: number,
    bedrooms: number,
    image: string,
    is_rent: number,
    description: string,
    city: {id: number, name: string, region: {name: string}},
    agent: {name: string, surname: string, phone: string, email: string; avatar: string},
    created_at: string,
  }

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

  // const [cardInfoProps, setCardInfoProps] = useState<CardInfoProps[]>([]);
  const [cardInfoProps, setCardInfoProps] = useState<CardInfoProps | null>(null);
  const [relatedRealEstates, setRelatedRealEstates] = useState<RealEstate[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  // const [currentSlide, setCurrentSlide] = useState(0);

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 1) % Math.ceil(relatedRealEstates.length / 4));
  // };

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 1 + Math.ceil(relatedRealEstates.length / 4)) % Math.ceil(relatedRealEstates.length / 4));
  // };

  const fetchRelatedRealEstates = async (regionName: string) => {
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
      console.log(data);
      const filteredEstates = data.filter(
        (realEstate: RealEstate) => 
          realEstate.city.region.name === regionName && realEstate.id != params.cardId
      );
      // console.log(params.cardId)
      setRelatedRealEstates(filteredEstates);
      console.log(filteredEstates);
    } catch (error) {
      console.error("Error fetching related real estates:", error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${params.cardId}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer 9cfe53fd-50ef-4536-87f3-49a80fab2213",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setCardInfoProps(data);
        setLoading(false);
        
        // Fetch related real estates after getting the current card info
        
        fetchRelatedRealEstates(data.city.region.name);
        console.log(data.city.region.name);
        
      } catch (error) {
        console.error("Error fetching real estate data:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${params.cardId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer 9cfe53fd-50ef-4536-87f3-49a80fab2213',
          },
        }
      );
  
      if (response.ok) {
        // Item deleted successfully
        toggleDeleteModal(); // Close the modal
        // Redirect to the home page or show a success message
        window.location.href = '/';
      } else {
        // Handle error
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      {cardInfoProps && !loading ? (
        <div className="flex flex-col items-center w-full justify-center pt-[64px]">
          <div className="flex w-[1591px] items-start">
            <a href='/' className="p-[6px] text-[32px] mb-[29px] hover:bg-[#dbdbdb] rounded-[50%]">
              <Image src={leftArrow} alt="leftArrow" />
            </a>
          </div>
          <CardInfo 
            cardInfoProps={cardInfoProps}
            loading={loading}
            deleteModal={toggleDeleteModal}
          />
        <div className="flex w-[1591px] items-start">
          <h1 className="font-medium text-[32px] leading-[38.4px] mt-[53px] text-start">ბინები მსგავს ლოკაციაზე</h1>
        </div>
        <div className="relative mt-[52px] w-[1591px] ">
          {/* <span className="absolute top-[190px] left-[-52px] text-[30px] cursor-pointer">
            <FiArrowLeft />
          </span> */}
          <MainCard 
            realEstates={relatedRealEstates}
            loading={loading}
            asSlider={true}
          />
          {/* <span className="absolute top-[190px] right-[-45px] text-[30px] cursor-pointer">
            <FiArrowRight />
          </span > */}
          <DeleteModal 
            isOpen={deleteModal}
            onClose={toggleDeleteModal}
            onDelete={handleDelete}
          />
        </div>
        </div>
      ) : (
        <div className="w-full h-[85vh] flex justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
  
}
