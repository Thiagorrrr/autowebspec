"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { Flame, Trophy, Calendar, DollarSign, Activity, ChevronRight, Info, MapPin, Clock, Zap, Scale, Check, X, Camera, Grid, Plus, Medal, Star, ThumbsUp } from 'lucide-react';
import { Car, CarSpecsData, dataCars } from './data';

// --- TYPES & INTERFACES ---

type StageType = 'stock' | 'stage1' | 'stage2' | 'stage3';

interface Participant {
  tempId: number;
  id: string;
  stage: StageType;
}

interface RaceResult extends Participant {
  name: string;
  version: string;
  time: number;
  speed: number;
}

interface RankingItem extends Participant {
  car: Car;
  stats: CarSpecsData;
  equipCount: number;
  totalScore: number;
  pricePerHp: number;
}

interface EventData {
  id: number;
  name: string;
  date: string;
  location: string;
  type: 'Racing' | 'Meet' | 'Drag';
}

// --- DADOS MOCKADOS ---

const RAW_CARS = dataCars()

const CARS: Car[] = RAW_CARS.map(c => ({ ...c, name: `${c.make} ${c.model} ${c.version}` }));

const EVENTS: EventData[] = [
  { id: 1, name: 'Track Day Interlagos', date: '15 Out', location: 'São Paulo, SP', type: 'Racing' },
  { id: 2, name: 'Encontro JDM Brasil', date: '22 Out', location: 'Curitiba, PR', type: 'Meet' },
  { id: 3, name: 'Arrancada Noturna', date: '05 Nov', location: 'Velopark, RS', type: 'Drag' },
];

// --- UTILITÁRIOS ---

const getBestValue = (items: { val: number }[], key: string, isLowerBetter = false): number => {
    const values = items.map(i => i.val);
    if (isLowerBetter) return Math.min(...values);
    return Math.max(...values);
};

// Função para calcular pontuação e ranking geral
const calculateOverallRanking = (participants: Participant[]): RankingItem[] => {
    return participants.map(p => {
        const car = CARS.find(c => c.id === p.id)!;
        const stats = car.specs[p.stage];
        const equipCount = Object.values(car.equipment).filter(Boolean).length;
        
        // Algoritmo de Pontuação Simplificado (0 a 100)
        // 1. Potência (peso 40%)
        // 2. Preço (peso 30% - menor é melhor)
        // 3. Equipamentos (peso 30%)
        
        // Normalização grosseira para o exemplo
        const scoreHp = stats.hp ? (stats.hp / 600) * 40 : 0 
        const scorePrice = (1 - (car.price / 500000)) * 30;
        const scoreEquip = (equipCount / 10) * 30;
        
        const totalScore = scoreHp + scorePrice + scoreEquip;

        return {
            ...p,
            car,
            stats,
            equipCount,
            totalScore,
            pricePerHp: stats.hp ? car.price / stats.hp : 0
        };
    }).sort((a, b) => b.totalScore - a.totalScore); // Maior score primeiro
};

// --- COMPONENTES ---

interface EquipmentComparisonProps {
  participants: Participant[];
}

const EquipmentComparison: React.FC<EquipmentComparisonProps> = ({ participants }) => {
    const allFeatures = Array.from(new Set(
        participants.flatMap(p => Object.keys(CARS.find(c => c.id === p.id)!.equipment))
    ));

    // Calcular quem tem mais equipamentos para destacar
    const participantsWithCount = participants.map(p => {
        const car = CARS.find(c => c.id === p.id)!;
        const count = Object.values(car.equipment).filter(Boolean).length;
        return { ...p, count };
    });
    
    const maxEquipCount = Math.max(...participantsWithCount.map(p => p.count));

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-6 overflow-x-auto">
            <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2"><Scale size={18} className="text-[#6319F7]" /> Lista de Equipamentos</h3>
            <div className="min-w-[500px]">
                <div className="grid grid-cols-12 gap-2 text-xs text-gray-400 font-bold uppercase mb-2 pb-2 border-b border-gray-100">
                    <div className="col-span-4 text-left pl-2">Item</div>
                    {participantsWithCount.map(p => {
                        const car = CARS.find(c => c.id === p.id)!;
                        const isWinner = p.count === maxEquipCount;
                        return (
                            <div key={p.tempId} className="col-span-2 text-center flex flex-col items-center px-1 relative">
                                {isWinner && (
                                    <div className="absolute -top-6 bg-yellow-100 text-yellow-700 text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                        <Trophy size={10} /> Vencedor
                                    </div>
                                )}
                                <span className="truncate w-full" title={car.model}>{car.make}</span>
                                <span className="text-[9px] text-gray-300 block truncate w-full">{car.version}</span>
                                <span className={`text-[10px] mt-1 font-bold ${isWinner ? 'text-[#6319F7]' : 'text-gray-400'}`}>
                                    {p.count} itens
                                </span>
                            </div>
                        );
                    })}
                </div>
                
                {allFeatures.map((feature) => (
                    <div key={feature} className="grid grid-cols-12 gap-2 items-center py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded px-2">
                        <div className="col-span-4 text-xs font-medium text-gray-600 truncate" title={feature}>{feature}</div>
                        {participants.map(p => {
                            const car = CARS.find(c => c.id === p.id)!;
                            const hasItem = car.equipment[feature];
                            return (
                                <div key={p.tempId} className="col-span-2 flex justify-center">
                                    {hasItem ? <Check size={16} className="text-[#6319F7]" /> : <X size={16} className="text-gray-300" />}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

interface VerdictSectionProps {
  participants: Participant[];
}

const VerdictSection: React.FC<VerdictSectionProps> = ({ participants }) => {
    const ranking = useMemo(() => calculateOverallRanking(participants), [participants]);

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg text-white mt-8 border-l-4 border-[#6319F7]">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#6319F7] p-2 rounded-lg">
                    <Star className="text-white" fill="currentColor" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Veredito AutoWebSpec</h2>
                    <p className="text-xs text-gray-400">Análise baseada em Potência, Preço e Equipamentos</p>
                </div>
            </div>

            <div className="grid gap-3">
                {ranking.map((item, index) => (
                    <div key={item.tempId} className={`relative p-4 rounded-lg flex items-center gap-4 transition-all ${index === 0 ? 'bg-white/10 border border-[#6319F7]/50 shadow-lg' : 'bg-white/5 border border-white/5'}`}>
                        
                        {/* Rank Badge */}
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full font-black text-sm ${
                            index === 0 ? 'bg-yellow-400 text-black' : 
                            index === 1 ? 'bg-gray-300 text-black' : 
                            index === 2 ? 'bg-amber-700 text-white' : 'bg-gray-700 text-gray-400'
                        }`}>
                            {index + 1}º
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className={`font-bold text-sm md:text-base ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>
                                    {item.car.name}
                                </h3>
                                {index === 0 && <span className="bg-[#6319F7] text-[10px] px-2 py-1 rounded font-bold flex items-center gap-1"><ThumbsUp size={10}/> MELHOR ESCOLHA</span>}
                            </div>
                            <div className="flex gap-4 text-[10px] text-gray-400 mt-1">
                                <span>R$ {item.car.price.toLocaleString('pt-BR', { notation: "compact" })}</span>
                                <span>•</span>
                                <span>{item.stats.hp}cv ({item.stage === 'stock' ? 'Stock' : item.stage})</span>
                                <span>•</span>
                                <span>{item.equipCount} Opcionais</span>
                            </div>
                        </div>

                        {/* Score Bar */}
                        <div className="w-20 text-right hidden sm:block">
                            <div className="text-xs font-bold text-[#6319F7]">Nota {item.totalScore.toFixed(1)}</div>
                            <div className="h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-[#6319F7]" style={{ width: `${item.totalScore}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface DetailedCarSelectorProps {
  participant: Participant;
  onUpdate: (tempId: number, newData: Partial<Participant>) => void;
  onRemove: (tempId: number) => void;
  showRemove: boolean;
}

const DetailedCarSelector: React.FC<DetailedCarSelectorProps> = ({ participant, onUpdate, onRemove, showRemove }) => {
    const car = CARS.find(c => c.id === participant.id)!;
    const [selectedMake, setSelectedMake] = useState(car.make);
    const [selectedModel, setSelectedModel] = useState(car.model);
    const [selectedYear, setSelectedYear] = useState(car.year);
    
    const makes = [...new Set(RAW_CARS.map(c => c.make))];
    const models = [...new Set(RAW_CARS.filter(c => c.make === selectedMake).map(c => c.model))];
    const years = [...new Set(RAW_CARS.filter(c => c.make === selectedMake && c.model === selectedModel).map(c => c.year))];
    const versions = RAW_CARS.filter(c => c.make === selectedMake && c.model === selectedModel && c.year == selectedYear);

    useEffect(() => {
        setSelectedMake(car.make);
        setSelectedModel(car.model);
        setSelectedYear(car.year);
    }, [participant.id]);

    const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMake = e.target.value;
        setSelectedMake(newMake);
        const firstCar = RAW_CARS.find(c => c.make === newMake);
        if (firstCar) onUpdate(participant.tempId, { id: firstCar.id });
    };
    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newModel = e.target.value;
        setSelectedModel(newModel);
        const firstCar = RAW_CARS.find(c => c.make === selectedMake && c.model === newModel);
        if (firstCar) onUpdate(participant.tempId, { id: firstCar.id });
    };
    const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => { onUpdate(participant.tempId, { id: e.target.value }); };
    const handleStageChange = (stage: StageType) => { onUpdate(participant.tempId, { stage }); };

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full relative group">
            {showRemove && (
                <button onClick={() => onRemove(participant.tempId)} className="absolute -top-2 -right-2 bg-red-100 text-red-500 rounded-full p-1 shadow-sm hover:bg-red-500 hover:text-white transition-colors z-10"><X size={14} /></button>
            )}
            <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Fabricante</label>
                    <select value={selectedMake} onChange={handleMakeChange} className="w-full bg-gray-50 text-xs font-bold p-2 rounded border border-gray-200 focus:border-[#6319F7] outline-none">
                        {makes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Modelo</label>
                    <select value={selectedModel} onChange={handleModelChange} className="w-full bg-gray-50 text-xs font-bold p-2 rounded border border-gray-200 focus:border-[#6319F7] outline-none">
                        {models.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Ano</label>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="w-full bg-gray-50 text-xs font-bold p-2 rounded border border-gray-200 focus:border-[#6319F7] outline-none">
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Versão</label>
                    <select value={car.id} onChange={handleVersionChange} className="w-full bg-gray-50 text-xs font-bold p-2 rounded border border-gray-200 focus:border-[#6319F7] outline-none text-ellipsis">
                        {versions.map(v => <option key={v.id} value={v.id}>{v.version}</option>)}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-1 mb-3 w-full">
                {(['stock', 'stage1', 'stage2', 'stage3'] as StageType[]).map(stg => (
                <button key={stg} onClick={() => handleStageChange(stg)} className={`text-[9px] py-1 rounded uppercase font-bold transition-all ${participant.stage === stg ? 'bg-[#6319F7] text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    {stg === 'stock' ? 'Stock' : stg.replace('stage', 'S')}
                </button>
                ))}
            </div>
            <div className="flex-1 flex items-end w-full mt-2">
                <div className="relative w-full h-20 rounded-lg overflow-hidden group-hover:shadow-md transition-all">
                    <img src={car.image} alt="car" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 text-white font-bold text-[10px]">{car.specs[participant.stage].hp}cv</div>
                </div>
            </div>
        </div>
    );
};

interface StatComparisonRowProps {
  label: string;
  participants: Participant[];
  dataKey: keyof CarSpecsData;
  unit: string;
  isLowerBetter?: boolean;
  icon: React.ElementType;
}

const StatComparisonRow: React.FC<StatComparisonRowProps> = ({ label, participants, dataKey, unit, isLowerBetter = false, icon: Icon }) => {
    const currentValues = participants.map(p => {
        const car = CARS.find(c => c.id === p.id)!;
        return { id: p.id, val: car.specs[p.stage][dataKey] };
    });
    const bestVal = getBestValue(currentValues, 'val', isLowerBetter);
    const maxRef = isLowerBetter ? Math.max(...currentValues.map(v => v.val)) * 1.2 : bestVal * 1.2;

    return (
        <div className="bg-gray-50 p-3 rounded-lg mb-2 border border-gray-100">
            <div className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold mb-2">
                {Icon && <Icon size={14} className="text-[#6319F7]" />}
                {label}
            </div>
            <div className="space-y-3">
                {participants.map((p) => {
                    const car = CARS.find(c => c.id === p.id)!;
                    const val = car.specs[p.stage][dataKey];
                    const isBest = val === bestVal;
                    let barWidth = 0;
                    if (isLowerBetter) {
                        barWidth = ((maxRef - val) / maxRef) * 100;
                        if (barWidth < 10) barWidth = 10;
                    } else {
                        barWidth = (val / maxRef) * 100;
                    }
                    return (
                        <div key={p.tempId} className="flex items-center gap-3">
                            <div className="w-8 text-[10px] font-bold text-gray-400 uppercase truncate">{car.make}</div>
                            <div className="flex-1">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden relative">
                                    <div className={`h-full transition-all duration-500 ${isBest ? 'bg-[#6319F7]' : 'bg-gray-400'}`} style={{ width: `${barWidth}%` }}/>
                                </div>
                            </div>
                            <div className={`w-16 text-right font-mono text-sm font-bold ${isBest ? 'text-[#6319F7]' : 'text-gray-600'}`}>
                                {val} <span className="text-[9px] text-gray-400">{unit}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const DragRace: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    { tempId: 1, id: CARS[0].id, stage: 'stock' },
    { tempId: 2, id: CARS[1].id, stage: 'stock' }
  ]);
  
  const [racing, setRacing] = useState<boolean>(false);
  const [raceResults, setRaceResults] = useState<RaceResult[] | null>(null);

  const addParticipant = () => {
    if (participants.length < 4) {
        const nextId = Math.max(...participants.map(p => p.tempId)) + 1;
        setParticipants([...participants, { tempId: nextId, id: CARS[2] ? CARS[2].id : CARS[0].id, stage: 'stock' }]);
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
        const car = CARS.find(c => c.id === p.id)!;
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
          <h2 className="text-lg font-bold text-gray-700">Grid de Largada</h2>
          {participants.length < 4 && (
            <button onClick={addParticipant} className="flex items-center gap-1 text-xs font-bold text-[#6319F7] bg-[#6319F7]/10 px-3 py-2 rounded-lg hover:bg-[#6319F7] hover:text-white transition-all"><Plus size={14} /> Adicionar Carro</button>
          )}
      </div>

      <div className={`grid ${gridCols} gap-4`}>
        {participants.map((p) => (
            <DetailedCarSelector key={p.tempId} participant={p} onUpdate={updateParticipant} onRemove={removeParticipant} showRemove={participants.length > 2}/>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Simulação 0-100 km/h</h3>
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
                const car = CARS.find(c => c.id === p.id)!;
                const time = car.specs[p.stage].zeroToHundred;
                const laneColors = ['bg-gray-800', 'bg-[#6319F7]', 'bg-red-500', 'bg-emerald-500'];
                const laneColor = laneColors[idx % laneColors.length];
                
                // Calcular se este carro venceu (após a corrida)
                const rank = raceResults ? raceResults.findIndex(r => r.tempId === p.tempId) + 1 : null;

                return (
                    <div key={p.tempId} className="relative h-10 bg-gray-50 rounded-lg border border-gray-100 flex items-center px-2 z-10">
                         <div className="absolute left-2 text-[9px] text-gray-400 font-bold w-12 truncate">{car.model}</div>
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
             <StatComparisonRow label="Potência (CV)" participants={participants} dataKey="hp" unit="cv" icon={Zap} />
             <StatComparisonRow label="Torque (kgfm)" participants={participants} dataKey="torque" unit="kgfm" icon={Activity} />
             <StatComparisonRow label="0-100 km/h" participants={participants} dataKey="zeroToHundred" unit="s" isLowerBetter={true} icon={Clock} />
          </div>

          <EquipmentComparison participants={participants} />
          
          <VerdictSection participants={participants} />
      </div>
    </div>
  );
};

const Ranking: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const categories = ['Todas', ...new Set(CARS.map(c => c.category))];
  const filteredCars = selectedCategory === 'Todas' ? CARS : CARS.filter(c => c.category === selectedCategory);
  const sortedCars = [...filteredCars].sort((a, b) => a.price - b.price);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Ranking por Preço</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-[#6319F7] text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>{cat}</button>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        {sortedCars.map((car, index) => (
          <div key={car.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="text-2xl font-black text-gray-200 w-8 text-center">#{index + 1}</div>
                <img src={car.image} alt={car.name} className="w-full sm:w-32 h-20 object-cover rounded-lg shadow-sm" />
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                 <h3 className="font-bold text-gray-800 text-lg">{car.name}</h3>
                 <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded font-bold uppercase inline-block w-max mx-auto sm:mx-0">{car.category}</span>
              </div>
              <p className="text-gray-500 text-sm">{car.year} • {car.specs.stock.hp}cv</p>
            </div>
            <div className="text-center sm:text-right w-full sm:w-auto bg-gray-50 sm:bg-transparent p-2 rounded-lg">
              <div className="text-[#6319F7] font-bold text-xl">{car.fipe}</div>
              <div className="text-xs text-gray-400">Preço Médio</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TechnicalDetails: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<string>(CARS[0].id);
  const car = CARS.find(c => c.id === selectedCar)!;

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Selecione o Carro</label>
          <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} className="w-full bg-gray-50 text-gray-900 p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#6319F7] font-bold">
            {CARS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
      </div>
      <div className="space-y-2">
          <h3 className="flex items-center gap-2 font-bold text-gray-800 text-sm uppercase"><Camera size={16} className="text-[#6319F7]" /> Galeria de Fotos</h3>
          <div className="grid grid-cols-3 gap-2">
              {car.photos.map((photo, idx) => (
                  <div key={idx} className={`rounded-lg overflow-hidden border border-gray-200 shadow-sm h-24 ${idx === 0 ? 'col-span-3 h-48' : ''}`}>
                      <img src={photo} alt={`${car.name} ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
              ))}
          </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
            <Activity size={18} className="text-[#6319F7]" />
            <h3 className="font-bold text-gray-800">Ficha Técnica (Motor Stock)</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-4">
            <div><div className="text-xs text-gray-400 uppercase font-bold">Potência</div><div className="text-xl font-bold text-gray-800">{car.specs.stock.hp} <span className="text-sm text-gray-400 font-normal">cv</span></div></div>
            <div><div className="text-xs text-gray-400 uppercase font-bold">Torque</div><div className="text-xl font-bold text-gray-800">{car.specs.stock.torque} <span className="text-sm text-gray-400 font-normal">kgfm</span></div></div>
            <div><div className="text-xs text-gray-400 uppercase font-bold">0-100 km/h</div><div className="text-xl font-bold text-gray-800">{car.specs.stock.zeroToHundred} <span className="text-sm text-gray-400 font-normal">s</span></div></div>
            <div><div className="text-xs text-gray-400 uppercase font-bold">Peso</div><div className="text-xl font-bold text-gray-800">{car.weight} <span className="text-sm text-gray-400 font-normal">kg</span></div></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
         <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2"><Grid size={18} className="text-[#6319F7]" /><h3 className="font-bold text-gray-800">Lista de Equipamentos</h3></div>
        <div className="divide-y divide-gray-50">
            {Object.entries(car.equipment).map(([item, hasItem]) => (
                <div key={item} className="p-3 flex justify-between items-center hover:bg-gray-50">
                    <span className={`text-sm font-medium ${hasItem ? 'text-gray-700' : 'text-gray-400 line-through'}`}>{item}</span>
                    {hasItem ? <Check size={16} className="text-[#6319F7]" /> : <X size={16} className="text-gray-300" />}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const CostCalculator: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<string>(CARS[0].id);
  const car = CARS.find(c => c.id === selectedCar)!;
  const ipva = car.price * 0.04;
  const insurance = car.price * 0.05;
  const fuelPrice = 5.80;
  const consumption = 9.0;
  const kmMonthly = 1000;
  const fuelMonthly = (kmMonthly / consumption) * fuelPrice;
  const maintenanceMonthly = 300;
  const totalMonthly = (ipva / 12) + (insurance / 12) + fuelMonthly + maintenanceMonthly;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><div className="p-2 bg-green-100 rounded-lg text-green-600"><DollarSign size={20} /></div>Simulador Mensal</h2>
      <div className="mb-6">
        <label className="text-gray-500 text-xs font-bold uppercase mb-2 block">Selecione o Veículo</label>
        <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} className="w-full bg-gray-50 text-gray-900 p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6319F7]">
          {CARS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm text-gray-600"><span>IPVA (Mensalizado)</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ipva / 12)}</span></div>
        <div className="flex justify-between text-sm text-gray-600"><span>Seguro (Estimado)</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(insurance / 12)}</span></div>
        <div className="flex justify-between text-sm text-gray-600"><span>Combustível ({kmMonthly}km)</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(fuelMonthly)}</span></div>
        <div className="flex justify-between text-sm text-gray-600"><span>Provisão Manutenção</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(maintenanceMonthly)}</span></div>
      </div>
      <div className="border-t border-dashed border-gray-200 pt-6 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-700">Total Mensal</span>
        <span className="text-3xl font-black text-[#6319F7]">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalMonthly)}</span>
      </div>
    </div>
  );
};

const EventsCalendar: React.FC = () => (
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
      <main className="max-w-7xl mx-auto p-6">
        {activeTab === 'versus' && <div className="animate-fade-in"><DragRace /></div>}
        {activeTab === 'ranking' && <Ranking />}
        {activeTab === 'calculator' && <CostCalculator />}
        {activeTab === 'details' && <TechnicalDetails />}
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