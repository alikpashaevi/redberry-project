import { useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

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
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    phone: false,
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState("");

  const handleSubmit = () => {
    const newErrors = {
      name: name.length < 2,
      surname: surname.length < 2,
      email: !email.includes("@redberry.ge"),
      phone: !(phone.startsWith("5") && phone.length === 9 && /^\d+$/.test(phone)),
    };
  
    setErrors(newErrors);
  
    if (Object.values(newErrors).some((error) => error)) {
      setErrorMsg("შეიყვანეთ ვალიდური მონაცემები");
    } else {
      setErrorMsg("");
      onClose();
      clearInputs();
    }
  };

  const clearInputs = () => {
    setName("");
    setSurname("");
    setEmail("");
    setPhone("");
    setUploadedImage(null);
    setErrors({
      name: false,
      surname: false,
      email: false,
      phone: false,
    });
    setErrorMsg("");
    setFileError("");
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

  const handleClose = () => {
    clearInputs();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ${
        isAgentOpen ? "block" : "hidden"
      }`}
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
                  onChange={(e) => setName(e.target.value)}
                />
                <div className={`text-[14px] leading-[16.8px] ${errorMsg ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                  <span>
                    <IoCheckmarkSharp />
                  </span>
                  {errorMsg !== "" ? errorMsg : "მინიმუმ ორი სიმბოლო"}
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
                  onChange={(e) => setSurname(e.target.value)}
                />
                <div className={`text-[14px] leading-[16.8px] ${errorMsg ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                  <span>
                    <IoCheckmarkSharp />
                  </span>
                  {errorMsg !== "" ? errorMsg : "მინიმუმ ორი სიმბოლო"}
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={`text-[14px] leading-[16.8px] ${errorMsg ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                  <span>
                    <IoCheckmarkSharp />
                  </span>
                  {errorMsg !== "" ? errorMsg : "გამოიყენეთ @redberry.ge ფოსტა"}
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
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className={`text-[14px] leading-[16.8px] ${errorMsg ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
                  <span>
                    <IoCheckmarkSharp />
                  </span>
                  {errorMsg !== "" ? errorMsg : "მხოლოდ რიცხვები"}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] w-full">
              <span className="text-[14px] leading-[16.8px] font-medium">
                ატვირთეთ ფოტო
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