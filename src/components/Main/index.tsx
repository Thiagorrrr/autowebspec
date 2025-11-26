"use client"
import React, { useState } from 'react';
import { Flame, Trophy, Calendar, DollarSign, Info} from 'lucide-react';
import { Car, dataCars } from './data';
import { DragRace } from '../DragRace';
import { Ranking } from '../Ranking';
import { CostCalculator } from '../CostCalculator';
import { TechnicalDetails } from '../TechnicalDetails';
import { EventsCalendar } from '../EventsCalendar';


const RAW_CARS = dataCars()

const CARS: Car[] = RAW_CARS.map(c => ({ ...c, name: `${c.make} ${c.model} ${c.version}` }));


const Main: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('versus');
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-24 md:pb-0">
      <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#6319F7] p-2.5 rounded-xl shadow-lg shadow-[#6319F7]/30 transform -rotate-3"><Flame className="text-white" size={20} fill="currentColor" /></div>
            <div><h1 className="text-xl font-black tracking-tighter text-gray-900">AUTO<span className="text-[#6319F7]">WEBSPEC</span></h1><p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Comparador Pro</p></div>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-bold text-gray-400">
            <button onClick={() => setActiveTab('versus')} className={`hover:text-[#6319F7] transition-colors ${activeTab === 'versus' ? 'text-[#6319F7]' : ''}`}>SIMULADOR</button>
            <button onClick={() => setActiveTab('ranking')} className={`hover:text-[#6319F7] transition-colors ${activeTab === 'ranking' ? 'text-[#6319F7]' : ''}`}>RANKING</button>
            <button onClick={() => setActiveTab('details')} className={`hover:text-[#6319F7] transition-colors ${activeTab === 'details' ? 'text-[#6319F7]' : ''}`}>DETALHES</button>
            <button onClick={() => setActiveTab('calculator')} className={`hover:text-[#6319F7] transition-colors ${activeTab === 'calculator' ? 'text-[#6319F7]' : ''}`}>CALCULAR</button>
            <button onClick={() => setActiveTab('events')} className={`hover:text-[#6319F7] transition-colors ${activeTab === 'events' ? 'text-[#6319F7]' : ''}`}>EVENTS</button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4">
       
       {activeTab === 'versus'  && <div className='p-8'>
          <h1 className="text-2xl font-bold text-gray-700 text-center">AUTO  <span className="text-[#6319F7]">WEBSPEC</span></h1>
          <p className="text-lg pt-2 font-normal text-gray-700 text-center">O lugar ideal para comparar e ver detalhes sobre carros</p>
        </div>}
        {activeTab === 'versus' && <div className="animate-fade-in"><DragRace rawCars={RAW_CARS} cars={CARS}/></div>}
        {activeTab === 'ranking' && <Ranking  data={CARS}/>}
        {activeTab === 'calculator' && <CostCalculator data={CARS} />}
        {activeTab === 'details' && <TechnicalDetails data={CARS} />}
        {activeTab === 'events' && <EventsCalendar />}
      </main>
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <NavBtn icon={<Flame size={22} />} label="Versus" active={activeTab === 'versus'} onClick={() => setActiveTab('versus')} />
        <NavBtn icon={<Trophy size={22} />} label="Ranking" active={activeTab === 'ranking'} onClick={() => setActiveTab('ranking')} />
        <NavBtn icon={<DollarSign size={22} />} label="Custos" active={activeTab === 'calculator'} onClick={() => setActiveTab('calculator')} />
        <NavBtn icon={<Info size={22} />} label="Info" active={activeTab === 'details'} onClick={() => setActiveTab('details')} />
        <NavBtn icon={<Calendar size={22} />} label="Eventos" active={activeTab === 'events'} onClick={() => setActiveTab('events')} />
      </nav>
    </div>
  );
};

interface NavBtnProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavBtn: React.FC<NavBtnProps> = ({ icon, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 p-1 rounded-lg transition-all ${active ? 'text-[#6319F7] transform -translate-y-1' : 'text-gray-400 hover:text-gray-600'}`}>{icon}{active && <span className="w-1 h-1 bg-[#6319F7] rounded-full"></span>}</button>
);

export default Main;