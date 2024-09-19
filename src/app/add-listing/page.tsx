"use client"
import { useState, useEffect } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { FaP, FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';

export default function ListingPage() {
  const [address, setAddress] = useState('');
  const [postal, setPostal] = useState('');
  const [errors, setErrors] = useState({ address: '', postal: '',area: '', price: '', bedrooms: '', description: '' });
  const [area, setArea] = useState<number | ''>('');
  const [price, setPrice] = useState<number | ''>('');
  const [bedrooms, setBedrooms] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [agentNames, setAgentNames] = useState<{id: number; name: string; surname:string; avatar: string}[]>([]);

  //dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);


  // fetched data from API
  const [regions, setRegions] = useState<{ id: number; name: string }[]>([]);
  const [cities, setCities] = useState<{ id: number; name: string; region_id: number }[]>([]);;
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [filteredCities, setFilteredCities] = useState<{ id: number; name: string; region_id: number }[]>([]);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState("");

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
    const fetchCities = async () => {
      try {
        const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/cities", {
          headers: {
            Authorization: "Bearer 9cfe53fd-50ef-4536-87f3-49a80fab2213",
          },
        });
        const data = await response.json();
        setCities(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchCities();
  }, []);


  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(
          'https://api.real-estate-manager.redberryinternship.ge/api/agents',
          {
            headers: {
              Authorization: 'Bearer 9cfe53fd-50ef-4536-87f3-49a80fab2213',
            },
          }
        );
        const data = await response.json();
        // console.log('agent object: ', data);
        setAgentNames(data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };
    fetchAgents();
  }, []);

  // Log agentNames when they are updated
  useEffect(() => {
    console.log('Updated agent names:', agentNames);
  }, [agentNames]);

  useEffect(() => {
    // console.log("Selected Region:", selectedRegion);
    
    if (selectedRegion) {
      const filtered = cities.filter(city => city.region_id === selectedRegion);
      setFilteredCities(filtered);
      // console.log("Filtered Cities:", filtered);
    } else {
      setFilteredCities([]);
    }
  }, [selectedRegion, cities]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = { address: '', postal: '', area: '', price: '', bedrooms: '', description: '' };
    let hasErrors = false;

    if (address.length < 2) {
      newErrors.address = 'მინიმუმ ორი სიმბოლო';
      hasErrors = true;
    }

    if (!/^\d+$/.test(postal)) {
      newErrors.postal = 'მხოლოდ რიცხვები';
      hasErrors = true;
    }

    // if (!/^\d+$/.test(area)) {
    //   newErrors.area = 'მხოლოდ რიცხვები';
    //   hasErrors = true;
    // }

    // if (!/^\d+$/.test(price)) {
    //   newErrors.price = 'მხოლოდ რიცხვები';
    //   hasErrors = true;
    // }

    // if (!/^\d+$/.test(bedrooms)) {
    //   newErrors.bedrooms = 'მხოლოდ რიცხვები';
    //   hasErrors = true;
    // }

    if (description.trim().split(/\s+/).length < 5) {
      newErrors.description = 'მინიმუმ ხუთი სიტყვა';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      try {
        const formData = new FormData();
        formData.append('is_rental', (document.querySelector('input[name="rentOrSale"]:checked') as HTMLInputElement)?.value === '1' ? '1' : '0');
        formData.append('address', address);
        formData.append('zip_code', postal);
        formData.append('region_id', selectedRegion?.toString() || '');
        formData.append('city_id', (document.getElementById('cities') as HTMLSelectElement).value);
        formData.append('price', price.toString());
        formData.append('area', area.toString());
        formData.append('bedrooms', bedrooms.toString());
        formData.append('description', description);
        formData.append('agent_id', selectedAgentId !== null ? selectedAgentId.toString() : '0');

        console.log('is_rental:', (document.querySelector('input[name="rentOrSale"]:checked') as HTMLInputElement)?.value || '');
        console.log('address:', address);
        console.log('zip_code:', postal);
        console.log('region_id:', selectedRegion?.toString() || '');
        console.log('city_id:', (document.getElementById('cities') as HTMLSelectElement).value);
        console.log('price:', price);
        console.log('area:', area);
        console.log('bedrooms:', bedrooms);
        console.log('description:', description);
        console.log('agent_id:', selectedAgentId);
      
        console.log('is_rental type:', typeof ((document.querySelector('input[name="rentOrSale"]:checked') as HTMLInputElement)?.value || ''));
        console.log('address type:', typeof address);
        console.log('zip_code type:', typeof postal);
        console.log('region_id type:', typeof (selectedRegion?.toString() || ''));
        console.log('city_id type:', typeof (parseInt((document.getElementById('cities') as HTMLSelectElement).value)));
        console.log('price type:', typeof price);
        console.log('area type:', typeof area);
        console.log('bedrooms type:', typeof bedrooms);
        console.log('description type:', typeof description);
        console.log('agent_id type:', typeof selectedAgentId);

        // Append the image file if it exists
        if (uploadedImage) {
          // Convert base64 to blob
          const response = await fetch(uploadedImage);
          const blob = await response.blob();
          formData.append('image', blob, 'avatar.jpg');
        }

        const response = await axios.post(
          'https://api.real-estate-manager.redberryinternship.ge/api/real-estates',
          formData,
          {
            headers: {
              Authorization: "Bearer 9cfe53fd-50ef-4536-87f3-49a80fab2213",
              'Content-Type': 'multipart/form-data',
              'accept': 'application/json'
            }
          }
        );

        console.log('API Response:', response.data);
        // Handle successful submission (e.g., show success message, redirect, etc.)
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error (e.g., show error message to user)
      }
      window.location.href = '/';
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFileError("ფაილი უნდა იყოს სურათი");
        return;
      }
      if (file.size > 1024 * 1024) {
        setFileError("სურათი უნდა იყოს 1MB-ზე ნაკლები");
        return;
      }

      setFileError("");

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedImage(null);
  };
  
  // {agentNames.map((agent, index) => (
  //   <div
  //     key={index}
  //     className={`p-[10px] cursor-pointer hover:bg-gray-100 ${
  //       index !== agentNames.length - 1 ? 'border-b-[1px] border-[#808A93]' : ''
  //     }`}
  //     onClick={() => {
  //       setSelectedAgent(agent);
  //       setIsDropdownOpen(false);
  //     }}
  //   >
  //     {agent}
  //   </div>
  // ))}

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[790px] flex flex-col pt-[62px] pb-[87px] justify-center items-center">
        <div className='mb-[61px]'>
          <h3 className="text-center font-medium text-[32px] leading-[38.4px] text-[#021526]">ლისტინგის დამატება</h3>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[40px]">
        <div className='w-full flex flex-col gap-[80px]'>
          <div className='flex flex-col gap-[10px]'>
            <h3 className='font-medium text-[16px] leading-[19.5px] text-[#1A1A1F]'>გარიგების ტიპი</h3>
            <div className='flex gap-[32px]'>
              <div className='w-[134px] flex gap-[6px] items-center'>
                <input 
                  type="radio" 
                  name="rentOrSale" 
                  value={0} 
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
                  value={1} 
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
                      errors.address ? "border-red-500" : "border-[#808A93]"
                    }`}
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <div className={`text-[14px] leading-[16.8px] ${errors.address ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                    <span>
                      <IoCheckmarkSharp />
                    </span>
                    {errors.address || "მინიმუმ ორი სიმბოლო"}
                  </div>
                </div>
                <div className="flex flex-col gap-[4px] w-1/2">
                  <span className="text-[14px] leading-[16.8px] font-medium">
                    საფოსტო ინდექსი *
                  </span>
                  <input
                    className={`rounded-[6px] p-[10px] border-[1px] outline-none ${
                      errors.postal ? "border-red-500" : "border-[#808A93]"
                    }`}
                    type="text"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                  />
                  <div className={`text-[14px] leading-[16.8px] ${errors.postal ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                    <span>
                      <IoCheckmarkSharp />
                    </span>
                    {errors.postal || "მხოლოდ რიცხვები"}
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
                    onChange={(e) => setPrice(parseInt(e.target.value))}
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
                    onChange={(e) => setArea(parseInt(e.target.value))}
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
                    onChange={(e) => setBedrooms(parseInt(e.target.value))}
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
              <div className="flex flex-col gap-[4px] w-full">
                <span className="text-[14px] leading-[16.8px] font-medium">
                      ატვირთეთ ფოტო *
                    </span>
                <div className={`flex items-center justify-center border-[1px] ${fileError ? 'border-red-500' : 'border-[#2D3648]'} h-[120px] rounded-[8px] border-dashed relative`}>
                  {uploadedImage ? (
                    <div className="relative h-[82px] w-[92px] rounded-[8px] ">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="h-full w-full object-cover rounded-[8px]"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="z-10 w-[24px] h-[24px] text-[14px] absolute bottom-[-4px] right-[-4px] flex items-center justify-center rounded-full border-[1px] border-[#021526] bg-white text-[#021526]"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="fileInput" className="cursor-pointer w-full h-full flex items-center justify-center">
                      <div className="w-[24px] h-[24px] flex items-center justify-center border border-[#2D3648] rounded-full text-center">
                        <span className="text-[#2D3648] text-[14px] font-bold">
                          <FaPlus />
                        </span>
                      </div>
                    </label>
                  )}
                </div>
                <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                />
                {fileError && (
                  <span className="text-red-500 text-sm">{fileError}</span>
                )}
              </div>
            </div>
          </div>
          <div className='mb-[80px]'>
            {/* ---------the agent dropdown menu------- */}
            <div className="relative w-[384px] font-normal">
              <div
                className={`w-full flex justify-between items-center p-[10px] border border-[#808A93] ${isDropdownOpen ? "rounded-t-[6px] border-b-0" : "rounded-[6px]"} cursor-pointer`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedAgent || 'აირჩიე'} 
                <IoIosArrowDown />
              </div>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-0 bg-white border border-[#808A93] rounded-b-[6px] shadow-lg">
                  <button className="flex items-center gap-[10px] w-full p-[10px] text-left hover:bg-gray-100 border-b-[1px] border-[#808A93]">
                    <span className='border-[1px] border-[#021526] rounded-full text-[#021526] text-[11px] p-[3px]'><FaPlus /></span> დაამატე აგენტი
                  </button>
                  {agentNames.map((agent, index) => (
                    <div
                      key={agent.id}
                      className={`p-[10px] cursor-pointer hover:bg-gray-100 ${
                        index !== agentNames.length - 1 ? 'border-b-[1px] border-[#808A93]' : ''
                      }`}
                      onClick={() => {
                        setSelectedAgentId(agent.id);
                        setSelectedAgent(`${agent.name} ${agent.surname}`);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {`${agent.name} ${agent.surname}`}
                    </div>
                  ))}
                </div>
              )}
            </div>
        </div>
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
            დაამატე ლისტინგი
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}