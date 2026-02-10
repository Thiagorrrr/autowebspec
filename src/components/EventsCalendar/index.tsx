"use client"
import { ChevronRight, MapPin } from "lucide-react";
import { SectionTitle } from "../SectionTitle";

interface EventData {
  id: number;
  name: string;
  date: string;
  location: string;
  type: 'Racing' | 'Meet' | 'Drag' | 'Exhibition' | 'Drift';
}

export const EVENTS: EventData[] = [
  {
    id: 1,
    name: "Track Day Interlagos 2026",
    date: "14 Mar 2026",
    location: "São Paulo, SP",
    type: "Racing",
  },
  {
    id: 2,
    name: "Encontro JDM Brasil 2026",
    date: "28 Mar 2026",
    location: "Curitiba, PR",
    type: "Meet",
  },
  {
    id: 3,
    name: "Arrancada Nacional",
    date: "18 Abr 2026",
    location: "Velopark, RS",
    type: "Drag",
  },
  {
    id: 4,
    name: "Festival Brasileiro de Carros Antigos",
    date: "23 Mai 2026",
    location: "Águas de Lindóia, SP",
    type: "Exhibition",
  },
  {
    id: 5,
    name: "Drift Brasil Series",
    date: "06 Jun 2026",
    location: "Piracicaba, SP",
    type: "Drift",
  },
  {
    id: 6,
    name: "Track Day Velocitta",
    date: "20 Jun 2026",
    location: "Mogi Guaçu, SP",
    type: "Racing",
  },
  {
    id: 7,
    name: "Euro Cars Experience",
    date: "11 Jul 2026",
    location: "Belo Horizonte, MG",
    type: "Meet",
  },
  {
    id: 8,
    name: "Arrancada Internacional 2026",
    date: "08 Ago 2026",
    location: "Canelinha, SC",
    type: "Drag",
  },
  {
    id: 9,
    name: "Salão de Performance Automotiva",
    date: "19 Set 2026",
    location: "São Paulo, SP",
    type: "Exhibition",
  },
  {
    id: 10,
    name: "Encontro Nacional de Superesportivos",
    date: "24 Out 2026",
    location: "Rio de Janeiro, RJ",
    type: "Meet",
  },
];


export const EventsCalendar: React.FC = () => (
  <div className="space-y-4 mt-8">
    <SectionTitle
      principal
      subtitle="Calendário Automotivo"
      description="Fique por dentro das datas mais importantes do setor: de encontros de clássicos a competições de arrancada e track days oficiais."
    >
      Próximos <br /> Eventos
    </SectionTitle>

    {EVENTS.map(evt => (
      <div key={evt.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-4 items-center hover:shadow-md transition-all cursor-pointer group">
        <div className="bg-gray-50 group-hover:bg-[#6319F7] group-hover:text-white transition-colors w-16 h-16 rounded-xl flex flex-col items-center justify-center border border-gray-100 group-hover:border-[#6319F7]">
          <span className="text-xs font-bold uppercase">{evt.date.split(' ')[1]}</span>
          <span className="text-xl font-black">{evt.date.split(' ')[0]}</span>
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-gray-800 text-lg group-hover:text-[#6319F7] transition-colors">{evt.name}</h2>
          <div className="flex items-center gap-1 text-gray-400 text-sm mt-1"><MapPin size={14} /> {evt.location}</div>
        </div>
        <div className="text-gray-300"><ChevronRight /></div>
      </div>
    ))}
  </div>
);