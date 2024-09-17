"use client"
import { useState, useEffect } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';

export default function ListingPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [errors, setErrors] = useState({ name: '', surname: '',area: '', price: '', bedrooms: '', description: '' });
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [description, setDescription] = useState('');


  // fetched data from API
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [cities, setCities] = useState<{ id: number; name: string; region_id: number }[]>([]);;
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [filteredCities, setFilteredCities] = useState<{ id: number; name: string; region_id: number }[]>([]);

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

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/cities", {
          headers: {
            Authorization: "Bearer 9cfe53fd-50ef-4536-87f3-49a80fab2213",
          },
        });
        const data = await response.json();
        setCities(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    console.log("Selected Region:", selectedRegion);
    
    if (selectedRegion) {
      const filtered = cities.filter(city => city.region_id === selectedRegion);
      setFilteredCities(filtered);
      console.log("Filtered Cities:", filtered);
    } else {
      setFilteredCities([]);
    }
  }, [selectedRegion, cities]);

  const handleSubmit = () => {
    let newErrors = { name: '', surname: '', area: '', price: '', bedrooms: '', description: '' };
    let hasErrors = false;
  
    if (name.length < 2) {
      newErrors.name = 'მინიმუმ ორი სიმბოლო';
      hasErrors = true;
    }
  
    if (!/^\d+$/.test(surname)) {
      newErrors.surname = 'მხოლოდ რიცხვები';
      hasErrors = true;
    }
  
    if (!/^\d+$/.test(area)) {
      newErrors.area = 'მხოლოდ რიცხვები';
      hasErrors = true;
    }
  
    if (!/^\d+$/.test(price)) {
      newErrors.price = 'მხოლოდ რიცხვები';
      hasErrors = true;
    }
  
    if (!/^\d+$/.test(bedrooms)) {
      newErrors.bedrooms = 'მხოლოდ რიცხვები';
      hasErrors = true;
    }

    if (description.trim().split(/\s+/).length < 5) {
      newErrors.description = 'მინიმუმ ხუთი სიტყვა';
      hasErrors = true;
    }
  
    setErrors(newErrors);
  
    if (!hasErrors) {
      console.log('Form submitted successfully');
    }
  };
  

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[790px] flex flex-col pt-[62px] pb-[87px] justify-center items-center">
        <div className='mb-[61px]'>
          <h3 className="text-center font-medium text-[32px] leading-[38.4px] text-[#021526]">ლისტინგის დამატება</h3>
        </div>
        <div className='w-full flex flex-col gap-[80px]'>
          <div className='flex flex-col gap-[10px]'>
            <h3 className='font-medium text-[16px] leading-[19.5px] text-[#1A1A1F]'>გარიგების ტიპი</h3>
            <div className='flex gap-[32px]'>
              <div className='w-[134px] flex gap-[6px] items-center'>
                <input 
                  type="radio" 
                  name="rentOrSale" 
                  value={'sale'} 
                  id="saleInput" 
                  defaultChecked
                  className="w-[17px] h-[17px] appearance-none border-[1px] border-black rounded-full checked:bg-white checked:border-[#021526] grid place-content-center before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-[#021526] before:opacity-0 checked:before:opacity-100 transition-all"
                />
                <label htmlFor="saleInput" className='font-normal text-[14px] leading-[16.8px] text-[#021526]'>იყიდება</label>
              </div>
              <div className='flex gap-[6px] items-center'>
                <input 
                  type="radio" 
                  name="rentOrSale" 
                  value={'rent'} 
                  id="rentInput" 
                  className="w-[17px] h-[17px] appearance-none border-[1px] border-black rounded-full checked:bg-white checked:border-[#021526] grid place-content-center before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-[#021526] before:opacity-0 checked:before:opacity-100 transition-all"
                />
                <label htmlFor="rentInput" className='font-normal text-[14px] leading-[16.8px] text-[#021526]'>ქირავდება</label>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[22px]'>
            <h3>მდებარეობა</h3>
            <div className='flex flex-col gap-[20px]'>
              <div className="flex gap-[30px] w-full">
                <div className="flex flex-col gap-[4px] w-1/2">
                  <span className="text-[14px] leading-[16.8px] font-medium">
                    მისამართი *
                  </span>
                  <input
                    className={`rounded-[6px] p-[10px] border-[1px] outline-none ${
                      errors.name ? "border-red-500" : "border-[#808A93]"
                    }`}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className={`text-[14px] leading-[16.8px] ${errors.name ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                    <span>
                      <IoCheckmarkSharp />
                    </span>
                    {errors.name || "მინიმუმ ორი სიმბოლო"}
                  </div>
                </div>
                <div className="flex flex-col gap-[4px] w-1/2">
                  <span className="text-[14px] leading-[16.8px] font-medium">
                    საფოსტო ინდექსი *
                  </span>
                  <input
                    className={`rounded-[6px] p-[10px] border-[1px] outline-none ${
                      errors.surname ? "border-red-500" : "border-[#808A93]"
                    }`}
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  <div className={`text-[14px] leading-[16.8px] ${errors.surname ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                    <span>
                      <IoCheckmarkSharp />
                    </span>
                    {errors.surname || "მხოლოდ რიცხვები"}
                  </div>
                </div>
              </div>
              <div className="flex gap-[30px] w-full">
                <div className="flex flex-col gap-[4px] w-1/2">
                  <span className="text-[14px] leading-[16.8px] font-medium">
                    რეგიონი
                  </span>
                  <select 
                    id="regions" 
                    name="regions" 
                    className="rounded-[6px] p-[10px] border-[1px] outline-none border-[#808A93]"
                    onChange={(e) => setSelectedRegion(Number(e.target.value))}
                    defaultValue=""
                  >
                    <option value="" hidden disabled>არჩევა</option>
                    {regions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="flex flex-col gap-[4px] w-1/2">
                  <span className="text-[14px] leading-[16.8px] font-medium">
                    ქალაქი
                  </span>
                  <select 
                    id="cities" 
                    name="cities" 
                    className="rounded-[6px] p-[10px] border-[1px] outline-none border-[#808A93]"
                    disabled={!selectedRegion}
                    defaultValue=""
                  >
                    <option value="" hidden disabled>არჩევა</option>
                    {filteredCities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[22px]'>
            <h3>ბინის დეტალები</h3>
            <div className='flex flex-col gap-[20px]'>
              <div className="flex gap-[30px] w-full">
              <div className="flex flex-col gap-[4px] w-1/2">
                  <span className="text-[14px] leading-[16.8px] font-medium">
                    ფასი *
                  </span>
                  <input
                    className={`rounded-[6px] p-[10px] border-[1px] outline-none ${
                      errors.price ? "border-red-500" : "border-[#808A93]"
                    }`}
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div className={`text-[14px] leading-[16.8px] ${errors.price ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                    <span>
                      <IoCheckmarkSharp />
                    </span>
                    {errors.price || "მხოლოდ რიცხვები"}
                  </div>
                </div>
                <div className="flex flex-col gap-[4px] w-1/2">
                  <span className="text-[14px] leading-[16.8px] font-medium">
                    ფართობი *
                  </span>
                  <input
                    className={`rounded-[6px] p-[10px] border-[1px] outline-none ${
                      errors.area ? "border-red-500" : "border-[#808A93]"
                    }`}
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  <div className={`text-[14px] leading-[16.8px] ${errors.area ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                    <span >
                      <IoCheckmarkSharp />
                    </span>
                    {errors.area || "მხოლოდ რიცხვები"}
                  </div>
                </div>

              </div>
              <div className="flex gap-[30px] w-full">
                <div className="flex flex-col gap-[4px] w-[380px]">
                  <span className="text-[14px] leading-[16.8px] font-medium">
                    საძინებლების რაოდენობა
                  </span>
                  <input
                    className={`rounded-[6px] p-[10px] border-[1px] outline-none ${
                      errors.bedrooms ? "border-red-500" : "border-[#808A93]"
                    }`}
                    type="text"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                  />
                  <div className={`text-[14px] leading-[16.8px] ${errors.bedrooms ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                    <span>
                      <IoCheckmarkSharp />
                    </span>
                    {errors.bedrooms || "მხოლოდ რიცხვები"}
                  </div>
                </div>
              </div>
              <div className="flex gap-[30px] w-full">
                <div className="flex flex-col gap-[4px] w-full">
                  <span className="text-[14px] leading-[16.8px] font-medium">
                    აღწერა
                  </span>
                  <textarea
                    className={`rounded-[6px] p-[10px] border-[1px] outline-none h-[135px] resize-none ${
                      errors.description ? "border-red-500" : "border-[#808A93]"
                    }`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className={`text-[14px] leading-[16.8px] ${errors.description ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                    <span>
                      <IoCheckmarkSharp />
                    </span>
                    {errors.description || "მინიმუმ ხუთი სიტყვა"}
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div></div>
        </div>
        <div className="flex justify-end w-full gap-[10px]">
              <a
                className="flex gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] border-[#F93B1D] border-[1px] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-white"
                href="/"
              >
                გაუქმება
              </a>
              <button
                className="flex gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] bg-[#F93B1D] text-white hover:bg-[#DF3014]"
                onClick={handleSubmit}
              >
                დაამატე აგენტი
              </button>
            </div>
      </div>
    </div>
  );
}