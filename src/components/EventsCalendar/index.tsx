import { ChevronRight, MapPin } from "lucide-react";

interface EventData {
  id: number;
  name: string;
  date: string;
  location: string;
  type: 'Racing' | 'Meet' | 'Drag';
}

const EVENTS: EventData[] = [
  { id: 1, name: 'Track Day Interlagos', date: '15 Out', location: 'São Paulo, SP', type: 'Racing' },
  { id: 2, name: 'Encontro JDM Brasil', date: '22 Out', location: 'Curitiba, PR', type: 'Meet' },
  { id: 3, name: 'Arrancada Noturna', date: '05 Nov', location: 'Velopark, RS', type: 'Drag' },
];

export const EventsCalendar: React.FC = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Próximos Eventos</h2>
    {EVENTS.map(evt => (
      <div key={evt.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-4 items-center hover:shadow-md transition-all cursor-pointer group">
        <div className="bg-gray-50 group-hover:bg-[#6319F7] group-hover:text-white transition-colors w-16 h-16 rounded-xl flex flex-col items-center justify-center border border-gray-100 group-hover:border-[#6319F7]">
          <span className="text-xs font-bold uppercase">{evt.date.split(' ')[1]}</span>
          <span className="text-xl font-black">{evt.date.split(' ')[0]}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#6319F7] transition-colors">{evt.name}</h3>
          <div className="flex items-center gap-1 text-gray-400 text-sm mt-1"><MapPin size={14} /> {evt.location}</div>
        </div>
        <div className="text-gray-300"><ChevronRight /></div>
      </div>
    ))}
  </div>
);