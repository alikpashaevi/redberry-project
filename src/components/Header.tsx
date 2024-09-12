import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full h-6.25">
      <Image src="/header-logo.png" alt="logo" width={200} height={50} />
    </header>
  );
}
