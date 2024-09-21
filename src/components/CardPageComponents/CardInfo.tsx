import Image from 'next/image';

//icons
import vector from  "../../public/icons/Vector.png";
import zipIcon from "../../public/icons/zip.png";
import bedIcon from "../../public/icons/bed.png"; 
import locationIcon from "../../public/icons/location-marker.png";
import { FaRegEnvelope } from "react-icons/fa";
import { LiaPhoneVolumeSolid } from "react-icons/lia";

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
  deleteModal:() => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US');
}

export default function CardInfo ( {cardInfoProps, loading, deleteModal}: CardIdPage) {
  if (loading) {
    return <div className="absolute translate-x-50 translate-y-50">Loading...</div>;
  }

  return (
    <div className="flex gap-[68px] w-[1591px]">
      <div className="flex flex-col gap-[11px]">
        <img 
          className='w-[839px] h-[670px] rounded-t-[14px] bg-cover bg-center'
         src={cardInfoProps.image} alt="uploaded image" />
        <span
          className="text-[16px] leading-[19.2px] text-[#808A93] font-normal w-full text-end"
        >გამოქვეყნების თარიღი {formatDate(cardInfoProps.created_at)}</span>
      </div>
      <div className='flex flex-col gap-[40px] py-[30px]'>
        <div>
          <h1 className='font-bold text-[#021526] text-[48px] leading-[57.8px]'>{formatPrice(cardInfoProps.price)} ₾</h1>
          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[6px]">
              <span className="text-[#808A93]">
                <Image src={locationIcon} height={20} width={20} alt="location icon" />
              </span>
              <p className="font-normal text-[24px] leading-[28.4px] text-[#808A93]">{cardInfoProps.address}</p>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="text-[#808A93]">
                <Image src={vector} height={20} width={20} alt="bed icon" />
              </span>
              <p className="font-normal text-[24px] leading-[28.4px] text-[#808A93]">ფართობი {cardInfoProps.area}</p>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="text-[#808A93]">
                <Image src={bedIcon} height={20} width={20} alt="bed icon" />
              </span>
              <p className="font-normal text-[24px] leading-[28.4px] text-[#808A93]">საძინებელი {cardInfoProps.bedrooms}</p>
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="text-[#808A93]">
                <Image src={zipIcon} height={20} width={20} alt="zip icon" />
              </span>
              <p className="font-normal text-[24px] leading-[28.4px] text-[#808A93]">საფოსტო ინდექსი {cardInfoProps.zip_code}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[50px]">
          <div>
            <p className='font-normal text-[#808A93] text-[16px] leading-[26px]'>{cardInfoProps.description}</p>
          </div>
          <div className='flex flex-col gap-[20px]'>
            <div className='w-[503px] flex flex-col py-[24px] px-[20px] gap-[16px] border border-[#DBDBDB] rounded-[8px]'>
              <div className='flex items-center gap-[14px]'>
                <img
                  className='w-[72px] h-[72px] rounded-full'
                  src={cardInfoProps.agent.avatar} 
                  alt="profile picture" />
                <div className='flex flex-col gap-[4px]'>
                  <p className='font-normal text-[16px] leading-[19.6px] text-[#021526]'>{cardInfoProps.agent.name} {cardInfoProps.agent.surname}</p>
                  <span className='font-normal text-[14px] leading-[16.8px] text-[#676E76]'>აგენტი</span>
                </div>
              </div>
              <div className='flex flex-col gap-[4px]'>
                <div className='flex items-center gap-[5px] text-[#808A93]'><span ><FaRegEnvelope/></span><p className='text-[14px] leading-[16.8px]'>{cardInfoProps.agent.email}</p></div>
                <div className='flex items-center gap-[5px] text-[#808A93]'><span><LiaPhoneVolumeSolid/></span><p className='text-[14px] leading-[16.8px]'>{cardInfoProps.agent.phone}</p></div>
              </div>
            </div>
            <div >
              <button className='p-[10px] border border-[#808A93] text-[#808A93] rounded-[8px] text-[14px] leading-[16.84px] font-medium transition-all hover:bg-[#808A93] hover:text-[#fff]'
                onClick={deleteModal}
              >ლისტინგის წაშლა</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}