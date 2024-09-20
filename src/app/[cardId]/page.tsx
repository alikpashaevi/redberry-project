"use client"
import CardInfo from "@/components/CardPageComponents/CardInfo";
import MainCard from "@/components/MainPageComponents/MainCard";
import { useEffect, useState } from "react";


export default function cardMainPage ({ params }: { params: { cardId: number} }) {

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
          realEstate.city.region.name === regionName && 
          realEstate.id !== params.cardId
      );
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

  

  return (
    <div>
      {cardInfoProps && !loading ? (
        <div>
        <CardInfo 
          cardInfoProps={cardInfoProps}
          loading={loading}
        />
         
{/*     <MainCard 
          realEstates={relatedRealEstates}
          loading={loading}
        /> */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
  
}