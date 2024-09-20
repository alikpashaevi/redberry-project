import Image from 'next/image';

//icons
import vector from  "../../public/icons/Vector.png";
import zipIcon from "../../public/icons/zip.png";
import bedIcon from "../../public/icons/bed.png"; 
import locationIcon from "../../public/icons/location-marker.png";

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
  agent: {name: string, surname: string, phone: string, email: string; avatar: string},
  created_at: string, 
}

interface CardIdPage {
  cardInfoProps: CardInfoProps,
  loading: boolean,
}

export default function CardInfo ( {cardInfoProps, loading,}: CardIdPage) {
  if (loading) {
    return <div className="absolute translate-x-50 translate-y-50">Loading...</div>;
  }

  return (
    <div>
      <div>
        <img src={cardInfoProps.image} alt="uploaded image" />
        <span>გამოქვეყნების თარიღი {cardInfoProps.created_at}</span>
      </div>
      <div>
        <div>
          <h1>{cardInfoProps.price}</h1>
          <div>
              <span>
                <Image src={locationIcon} height={20} width={20} alt="location icon" />
              </span>
              <p>{cardInfoProps.address}</p>
          </div>
          <div>
            <div>
              <span>
                <Image src={vector} height={20} width={20} alt="bed icon" />
              </span>
              <p>ფართობი {cardInfoProps.area}</p></div>
          </div>
          <div>
            <div>
              <span>
                <Image src={bedIcon} height={20} width={20} alt="bed icon" />
              </span>
              <p>საძინებელი {cardInfoProps.bedrooms}</p></div>
          </div>
          <div>
            <div>
              <span>
                <Image src={zipIcon} height={20} width={20} alt="zip icon" />
              </span>
              <p>საფოსტო ინდექსი {cardInfoProps.zip_code}</p></div>
          </div>
        </div>
        <div>
          <div>
            <p>{cardInfoProps.description}</p>
          </div>
          <div>
            <div>
              <div>
                <img src={cardInfoProps.agent.avatar} alt="" />
                <div>
                  <p>{cardInfoProps.agent.name} {cardInfoProps.agent.surname}</p>
                  <span>აგენტი</span>
                </div>
              </div>
              <div>
                <div><span></span><p>{cardInfoProps.agent.email}</p></div>
                <div><span></span><p>{cardInfoProps.agent.phone}</p></div>
              </div>
            </div>
            <div>
              <button>აგენტის წაშლა</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}