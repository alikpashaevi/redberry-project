// import { IoIosClose } from "react-icons/io";
import Image from "next/image";
import closeIcon from  "../../public/icons/closeIcon.png";

export default function DeleteModal({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {


  const handleClose = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (

    <div
      className={`fixed w-auto inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ${
      isOpen ? "block" : "hidden"
    }`}
    onClick={handleBackdropClick}
  >
    <div className="relative w-[623px] bg-white rounded-[20px] py-[58px]">
      <span className="text-[47px] absolute right-[13px] top-[6px] cursor-pointer"
        onClick={handleClose}
      >
        <Image src={closeIcon} alt="closeIcon" />
      </span>
      <div className="w-full flex flex-col items-center gap-[35px]">
        <h3 className="font-normal text-[20px] leading-[24px] text-[#2D3648]">გსურთ წაშალოთ ლისტინგი?</h3>
        <div className="flex justify-center w-full gap-[10px]">
            <button
              className="flex gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] border-[#F93B1D] border-[1px] text-[#F93B1D] hover:bg-[#F93B1D] hover:text-white"
              onClick={handleClose}
            >
              გაუქმება
            </button>
            <button
              className="flex gap-[2px] items-center font-medium text-[16px] text-center cursor-pointer py-[10px] px-[16px] rounded-[10px] bg-[#F93B1D] text-white hover:bg-[#DF3014]"
              onClick={onDelete}
            >
              დაამატე აგენტი
            </button>
          </div>
      </div>
    </div>
  </div>
  )
}