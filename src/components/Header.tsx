import Image from 'next/image';
import logo from '../public/header-logo.png';

export default function Header() {
  return (
    <header className="w-full h-[6.25rem] pl-[162px] flex items-center border-b border-b-[#DBDBDB]">
      <a href="/"><Image src={logo} alt="logo" width={150} height={24} /></a>
    </header>
  );
}