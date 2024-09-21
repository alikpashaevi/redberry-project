import { useState, useEffect } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';

export default function AddAgentModal({
  isAgentOpen,
  onClose,
}: {
  isAgentOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });
  const [isValid, setIsValid] = useState({
    name: false,
    surname: false,
    email: false,
    phone: false,
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState("");
  const [isImageRequired, setIsImageRequired] = useState(false);

  const validateName = (value: string) => value.length >= 2;
  const validateSurname = (value: string) => value.length >= 2;
  const validateEmail = (value: string) => value.includes("@redberry.ge");
  const validatePhone = (value: string) => value.startsWith("5") && value.length === 9 && /^\d+$/.test(value);

  const handleInputChange = (field: string, value: string, validator: (value: string) => boolean) => {
    const newErrors = { ...errors, [field]: "" };
    const newIsValid = { ...isValid, [field]: validator(value) };
    
    setErrors(newErrors);
    setIsValid(newIsValid);

    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'surname':
        setSurname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: !validateName(name) ? "შეიყვანეთ ვალიდური მონაცემები" : "",
      surname: !validateSurname(surname) ? "შეიყვანეთ ვალიდური მონაცემები" : "",
      email: !validateEmail(email) ? "შეიყვანეთ ვალიდური მონაცემები" : "",
      phone: !validatePhone(phone) ? "შეიყვანეთ ვალიდური მონაცემები" : "",
    };
    
    setErrors(newErrors);
    setIsImageRequired(!uploadedImage);

    if (Object.values(newErrors).some((error) => error) || !uploadedImage) {
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('surname', surname);
      formData.append('email', email);
      formData.append('phone', phone);
      
      if (uploadedImage) {
        const response = await fetch(uploadedImage);
        const blob = await response.blob();
        formData.append('avatar', blob, 'avatar.jpg');
      }

      const response = await axios.post(
        'https://api.real-estate-manager.redberryinternship.ge/api/agents',
        formData,
        {
          headers: {
            Authorization: "Bearer 9cfe53fd-50ef-4536-87f3-49a80fab2213",
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json'
          }
        }
      );

      console.log('Agent added successfully:', response.data);
      onClose();
      clearInputs();
    } catch (error) {
      console.error('Error adding agent:', error);
      setErrors(prev => ({...prev, general: "Error adding agent. Please try again."}));
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
      setIsImageRequired(false);

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

  const clearInputs = () => {
    setName("");
    setSurname("");
    setEmail("");
    setPhone("");
    setUploadedImage(null);
    setErrors({
      name: "",
      surname: "",
      email: "",
      phone: "",
    });
    setIsValid({
      name: false,
      surname: false,
      email: false,
      phone: false,
    });
    setFileError("");
    setIsImageRequired(false);
  };

  const handleClose = () => {
    clearInputs();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ${
        isAgentOpen ? "block" : "hidden"
      }`}
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-[10px] w-[1009px] flex justify-center items-center px-[105px] py-[87px]">
        <div className="flex flex-col gap-[72px] w-full">
          <h2 className="text-center text-[#021526] font-medium text-[32px] leading-[38.4px]">
            აგენტის დამატება
          </h2>
          <div className="flex flex-col gap-[28px]">
            <div className="flex gap-[30px] w-full">
              <div className="flex flex-col gap-[4px] w-1/2">
                <span className="text-[14px] leading-[16.8px] font-medium">
                  სახელი *
                </span>
                <input
                  className={`rounded-[6px] p-[10px] border-[1px] outline-none ${
                    errors.name ? "border-red-500" : "border-[#808A93]"
                  }`}
                  type="text"
                  value={name}
                  onChange={(e) => handleInputChange('name', e.target.value, validateName)}
                />
                <div className={`text-[14px] leading-[16.8px] ${errors.name ? 'text-red-500' : isValid.name ? 'text-green-500' : ''} flex items-center gap-[7px]`}>
                  <span>
                    <IoCheckmarkSharp />
                  </span>
                  {errors.name || "მინიმუმ ორი სიმბოლო"}
                </div>
              </div>
              <div className="flex flex-col gap-[4px] w-1/2">
                <span className="text-[14px] leading-[16.8px] font-medium">
                  გვარი *
                </span>
                <input
                  className={`rounded-[6px] p-[10px] border-[1px] outline-none ${
                    errors.surname ? "border-red-500" : "border-[#808A93]"
                  }`}
                  type="text"
                  value={surname}
                  onChange={(e) => handleInputChange('surname', e.target.value, validateSurname)}
                />
                <div className={`text-[14px] leading-[16.8px] ${errors.surname ? 'text-red-500' : isValid.surname ? 'text-green-500' : ''} flex items-center gap-[7px]`}>
                  <span>
                    <IoCheckmarkSharp />
                  </span>
                  {errors.surname || "მინიმუმ ორი სიმბოლო"}
                </div>
              </div>
            </div>
            <div className="flex gap-[30px] w-full">
              <div className="flex flex-col gap-[4px] w-1/2">
                <span className="text-[14px] leading-[16.8px] font-medium">
                  ელ-ფოსტა *
                </span>
                <input
                  className={`rounded-[6px] p-[10px] border-[1px] outline-none ${
                    errors.email ? "border-red-500" : "border-[#808A93]"
                  }`}
                  type="text"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value, validateEmail)}
                />
                <div className={`text-[14px] leading-[16.8px] ${errors.email ? 'text-red-500' : isValid.email ? 'text-green-500' : ''} flex items-center gap-[7px]`}>
                  <span>
                    <IoCheckmarkSharp />
                  </span>
                  {errors.email || "გამოიყენეთ @redberry.ge ფოსტა"}
                </div>
              </div>
              <div className="flex flex-col gap-[4px] w-1/2">
                <span className="text-[14px] leading-[16.8px] font-medium">
                  ტელეფონის ნომერი
                </span>
                <input
                  className={`rounded-[6px] p-[10px] border-[1px] outline-none ${
                    errors.phone ? "border-red-500" : "border-[#808A93]"
                  }`}
                  type="text"
                  value={phone}
                  onChange={(e) => handleInputChange('phone', e.target.value, validatePhone)}
                />
                <div className={`text-[14px] leading-[16.8px] ${errors.phone ? 'text-red-500' : isValid.phone ? 'text-green-500' : ''} flex items-center gap-[7px]`}>
                  <span>
                    <IoCheckmarkSharp />
                  </span>
                  {errors.phone || "მხოლოდ რიცხვები"}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] w-full">
              <span className="text-[14px] leading-[16.8px] font-medium">
                ატვირთეთ ფოტო
              </span>
              <div className={`flex items-center justify-center border-[1px] ${
                isImageRequired ? 'border-red-500' : fileError ? 'border-red-500' : 'border-[#2D3648]'
              } h-[120px] rounded-[8px] border-dashed relative`}>
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
              {(isImageRequired || fileError) && (
                <span className="text-red-500 text-sm">
                  {isImageRequired ? "შეიყვანეთ ვალიდური მონაცემებიx" : fileError}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end w-full gap-[10px]">
            <button
              className="flex gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] border-[#F93B1D] border-[1px] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-white"
              onClick={handleClose}
            >
              გაუქმება
            </button>
            <button
              className="flex gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] bg-[#F93B1D] text-white hover:bg-[#DF3014]"
              onClick={handleSubmit}
            >
              დაამატე აგენტი
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}