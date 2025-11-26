import { Participant, RaceResult } from "@/types/types";
import { useState } from "react";
import { DetailedCarSelector } from "./components/DetailedCarSelector";
import { StatComparisonRow } from "./components/StatComparisonRow";
import { EquipmentComparison } from "./components/EquipmentComparison";
import { VerdictSection } from "./components/VerdictSection";
import { Activity, Clock, Medal, Plus, Trophy, Zap } from "lucide-react";
import { Car } from "../Main/data";
interface DragRaceProps {
    cars: Car[]
    rawCars: Car[]
}

export const DragRace = ({ rawCars, cars }:DragRaceProps) => {
  const [participants, setParticipants] = useState<Participant[]>([
    { tempId: 1, id: cars[0].id, stage: 'stock' },
    { tempId: 2, id: cars[1].id, stage: 'stock' }
  ]);
  
  const [racing, setRacing] = useState<boolean>(false);
  const [raceResults, setRaceResults] = useState<RaceResult[] | null>(null);

  const addParticipant = () => {
    if (participants.length < 4) {
        const nextId = Math.max(...participants.map(p => p.tempId)) + 1;
        setParticipants([...participants, { tempId: nextId, id: cars[2] ? cars[2].id : cars[0].id, stage: 'stock' }]);
    }
  };

  const removeParticipant = (tempId: number) => {
      if (participants.length > 2) setParticipants(participants.filter(p => p.tempId !== tempId));
  };

  const updateParticipant = (tempId: number, newData: Partial<Participant>) => {
      setParticipants(participants.map(p => p.tempId === tempId ? { ...p, ...newData } : p));
  };

  const handleRace = () => {
    setRacing(true);
    setRaceResults(null);
    
    const results: RaceResult[] = participants.map(p => {
        const car = cars.find(c => c.id === p.id)!;
        return {
            ...p,
            name: `${car.make} ${car.model}`,
            version: car.version,
            time: car.specs[p.stage].zeroToHundred,
            speed: car.specs[p.stage].zeroToHundred // usando para animação
        };
    }).sort((a, b) => a?.time - b.time); // Ordena por tempo (menor primeiro)

    const maxTime = Math.max(...results.map(r => r.time));

    setTimeout(() => {
      setRaceResults(results);
      setRacing(false);
    }, (maxTime * 400) + 1000);
  };

  const gridCols = participants.length === 2 ? 'grid-cols-2' : participants.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-4';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-700">Grid de Largada</h2>
          {participants.length < 4 && (
            <button onClick={addParticipant} className="flex items-center gap-1 text-sm font-bold text-[#6319F7] bg-[#6319F7]/10 px-3 py-2 rounded-lg hover:bg-[#6319F7] hover:text-white transition-all"><Plus size={14} /> Adicionar Carro</button>
          )}
      </div>

      <div className={`grid ${gridCols} gap-4`}>
        {participants.map((p) => (
            <DetailedCarSelector key={p.tempId} rawCars={rawCars} cars={cars} participant={p} onUpdate={updateParticipant} onRemove={removeParticipant} showRemove={participants.length > 2}/>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Simulação 0-100 km/h</h3>
            {/* Ranking simplificado durante a corrida */}
            {raceResults && !racing && (
                <div className="flex gap-2">
                    <span className="text-xs font-bold bg-yellow-400 text-black px-2 py-1 rounded">1º {raceResults[0].name}</span>
                </div>
            )}
        </div>
        
        <div className="space-y-4 relative">
            <div className="absolute right-8 top-0 bottom-0 w-px border-r border-dashed border-gray-300 z-0"></div>
            
            {participants.map((p, idx) => {
                const car = cars.find(c => c.id === p.id)!;
                const time = car.specs[p.stage].zeroToHundred;
                const laneColors = ['bg-gray-800', 'bg-[#6319F7]', 'bg-red-500', 'bg-emerald-500'];
                const laneColor = laneColors[idx % laneColors.length];
                
                // Calcular se este carro venceu (após a corrida)
                const rank = raceResults ? raceResults.findIndex(r => r.tempId === p.tempId) + 1 : null;

                return (
                    <div key={p.tempId} className="relative h-10 bg-gray-50 rounded-lg border border-gray-100 flex items-center px-2 z-10">
                         <div className="absolute p-2 text-[9px] text-gray-400 font-bold w-12 truncate">{car.model}</div>
                        <div 
                            className={`absolute h-6 w-12 ${laneColor} rounded shadow-lg flex items-center justify-center z-10 text-white transition-all`}
                            style={{ 
                                transition: racing ? `left ${time * 0.5}s cubic-bezier(0.25, 1, 0.5, 1)` : 'left 0.5s',
                                left: racing ? 'calc(100% - 4rem)' : '3rem'
                            }}
                        >
                            <span className="text-[8px] font-bold">P{idx+1}</span>
                        </div>
                        
                        {/* Exibir ranking na lane após corrida */}
                        {rank && (
                            <div className="absolute right-2 font-bold text-xs flex items-center gap-1">
                                {rank === 1 && <Trophy size={12} className="text-yellow-500" />}
                                {rank}º Lugar
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

        {/* RESULTS PODIUM */}
        {raceResults && !racing && (
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fade-in">
                <h3 className="text-center font-bold text-gray-700 mb-4 flex justify-center items-center gap-2"><Medal size={18}/> Resultados Finais</h3>
                <div className="space-y-2">
                    {raceResults.map((result, idx) => (
                        <div key={result.tempId} className="flex justify-between items-center p-2 bg-white rounded border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-yellow-400 text-black' : idx === 1 ? 'bg-gray-300 text-black' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    {idx + 1}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-800">{result.name}</div>
                                    <div className="text-[10px] text-gray-400">{result.stage === 'stock' ? 'Stock' : result.stage}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono font-bold text-[#6319F7]">{result.time}s</div>
                                {idx > 0 && <div className="text-[9px] text-red-400">+{ (result.time - raceResults[0].time).toFixed(2) }s</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        <button onClick={handleRace} disabled={racing} className="w-full mt-6 bg-[#6319F7] hover:bg-[#5014c9] text-white font-bold py-4 rounded-xl text-sm uppercase tracking-widest shadow-lg shadow-[#6319F7]/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
          {racing ? 'ACELERANDO...' : `COMPARAR ${participants.length} CARROS`}
        </button>
      </div>

      <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-[#6319F7] rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-800">Raio-X Técnico</h2>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
             <StatComparisonRow label="Potência (CV)" cars={cars} participants={participants} dataKey="hp" unit="cv" icon={Zap} />
             <StatComparisonRow label="Torque (kgfm)" cars={cars} participants={participants} dataKey="torque" unit="kgfm" icon={Activity} />
             <StatComparisonRow label="0-100 km/h" cars={cars} participants={participants} dataKey="zeroToHundred" unit="s" isLowerBetter={true} icon={Clock} />
          </div>

          <EquipmentComparison cars={cars} participants={participants} />
          
          <VerdictSection cars={cars} participants={participants} />
      </div>
    </div>
  );
};
