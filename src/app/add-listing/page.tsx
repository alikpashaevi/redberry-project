"use client"
import { useState } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';

export default function ListingPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [errors, setErrors] = useState({ name: '', surname: '' });

  const handleSubmit = () => {
    let newErrors = { name: '', surname: '' };
    let hasErrors = false;

    if (name.length < 2) {
      newErrors.name = 'მინიმუმ ორი სიმბოლო';
      hasErrors = true;
    }

    if (!/^\d+$/.test(surname)) {
      newErrors.surname = 'მხოლოდ რიცხვები';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      // Proceed with form submission
      console.log('Form submitted successfully');
    }
  };

  return (
    <div className="w-full flex flex-col pt-[62px] pb-[87px] justify-center items-center">
      <div>
        <h3 className="text-center font-medium text-[32px] leading-[38.4px]">ლისტინგის დამატება</h3>
      </div>
      <div>
        <div>
          <h3>გარიგების ტიპი</h3>
          <div>
            <input type="radio" name="rentOrSale" value={'sale'} id="saleInput" />
            <label htmlFor="saleInput">იყიდება</label>
          </div>
          <div>
            <input type="radio" name="rentOrSale" value={'rent'} id="rentInput" />
            <label htmlFor="rentInput">ქირავდება</label>
          </div>
        </div>
        <div>
          <h3>მდებარეობა</h3>
          <div>
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
                <div className={`text-[14px] leading-[16.8px] ${errors.name ? 'text-red-500' : ''} flex items-center gap-[7px]`}>
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
            <div>

            </div>
          </div>
        </div>
        <div></div>
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
  );
}