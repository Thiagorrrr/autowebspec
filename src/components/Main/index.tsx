"use client"
import { usePathname } from 'next/navigation';
import React from 'react';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  return (
    <main className="max-w-7xl mx-auto p-4 md:mt-10">
      {pathname === '/' && <div className='p-8'>
        <h1 className="text-2xl font-bold text-gray-700 text-center">AUTO  <span className="text-[#6319F7]">WEBSPEC</span></h1>
        <p className="text-lg pt-2 font-normal text-gray-700 text-center">O lugar ideal para comparar e ver detalhes sobre carros</p>
      </div>}
      {children}
    </main>
  )
}

export default Main;