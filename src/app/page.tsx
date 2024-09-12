import MainCard from '@/components/MainPageComponents/MainCard';
import NavBar from '@/components/MainPageComponents/NavBar';
import Properties from '@/components/MainPageComponents/Properties';
import React from 'react';

export default function Home() {
  return (
    <div className='w-[1596px] flex flex-col'>
      <NavBar />
      <Properties />
      <MainCard />
    </div>
  );
}