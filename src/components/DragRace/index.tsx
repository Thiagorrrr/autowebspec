"use client"
import { Participant, RaceResult } from "@/types/types";
import { useEffect, useState } from "react";
import { DetailedCarSelector } from "./components/DetailedCarSelector";
import { EquipmentComparison } from "./components/EquipmentComparison";
import { VerdictSection } from "./components/VerdictSection";
import { Medal, Plus, Trophy } from "lucide-react";
import { useCars } from "@/hooks/queries/useCars";
import { Button } from "../Button";
import { Alert } from "../Alert";
import { Loading } from "./loading";
import { TechnicalComparison } from "../TechnicalComparison";
export type AlertMessage = {
    type: "success" | "error" | "alert";
    message: string;
};

export const DragRace = () => {
    const { data, isLoading, error } = useCars();
    const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);

    const cars = data;


    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        if (!cars || cars.length === 0 || participants.length > 0) return;

        const url = new URL(window.location.href);
        const urlCars: Participant[] = [];

        for (let index = 1; index <= 4; index++) {
            const param = url.searchParams.get(`carro${index}`);
            if (!param) continue;

            const carExists = cars.find((c) => c.id === param);
            const isDuplicate = urlCars.some((c) => c.id === param);

            if (carExists && !isDuplicate) {
                urlCars.push({
                    tempId: urlCars.length + 1, // tempId sequencial baseado nos válidos encontrados
                    id: param,
                    stage: "stock",
                });
            }
        }

        if (urlCars.length > 0) {
            setParticipants(urlCars);
        } else if (cars.length >= 2) {
            setParticipants([
                { tempId: 1, id: cars[0].id, stage: "stock" },
                { tempId: 2, id: cars[1].id, stage: "stock" }
            ]);
        }

    }, [cars, participants.length]);


    const [racing, setRacing] = useState<boolean>(false);
    const [raceResults, setRaceResults] = useState<RaceResult[] | null>(null);

    const addParticipant = () => {
        if (participants.length < 4 && cars && cars.length > 0) {

            const nextId =
                participants.length === 0
                    ? 1
                    : Math.max(...participants.map(p => p.tempId)) + 1;

            const fallbackCarId = cars[2]?.id ?? cars[0].id;

            setParticipants(prev => [
                ...prev,
                { tempId: nextId, id: fallbackCarId, stage: 'stock' }
            ]);
        }
    };


    const removeParticipant = (tempId: number) => {
        if (participants.length > 2) setParticipants(participants.filter(p => p.tempId !== tempId));
    };

    const updateParticipant = (tempId: number, newData: Partial<Participant>) => {
        setParticipants(participants.map(p => p.tempId === tempId ? { ...p, ...newData } : p));
    };

    const handleRace = () => {
        if (!cars || cars.length === 0) return;

        setRacing(true);
        setRaceResults(null);

        const results: RaceResult[] = participants
            .map(p => {
                const car = cars.find(c => c.id === p.id)!;
                return {
                    ...p,
                    name: `${car.make} ${car.model}`,
                    version: car.version,
                    time: car.specs[p.stage].zeroToHundred,
                    speed: car.specs[p.stage].zeroToHundred // animação
                };
            })
            .sort((a, b) => a.time - b.time);

        const maxTime = Math.max(...results.map(r => r.time));

        setTimeout(() => {
            setRaceResults(results);
            setRacing(false);
        }, maxTime * 400 + 1000);
    };

    const atualizarUrl = (participants: Participant[]) => {
        const params = participants
            .map((item, index) => `carro${index + 1}=${encodeURIComponent(item.id)}`)
            .join("&");

        const novaUrl = `?${params}`;
        history.replaceState(null, "", novaUrl);
    };
    const copiarLink = () => {
        const urlAtual = window.location.href;

        navigator.clipboard.writeText(urlAtual)
            .then(() => {
                setAlertMessage({
                    type: "success",
                    message: "Link copiado!"
                });
            })
            .catch(() => {
                setAlertMessage({
                    type: "error",
                    message: "Erro ao copiar link"
                });
            });
    };


    const gridCols = participants.length === 2 ? 'grid-cols-2' : participants.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-4';
    if (isLoading) return <Loading />
    if (error) return <p>Erro ao carregar</p>;
    if (!data) return <div className="text-red-500">carro não encontrado.</div>;
    return (
        <div className="space-y-6 mt-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-700">Grid de Largada</h2>
                {participants.length < 4 && (
                    <button onClick={addParticipant} className="flex items-center gap-1 text-sm font-bold text-[#6319F7] bg-[#6319F7]/10 px-3 py-2 rounded-lg hover:bg-[#6319F7] hover:text-white transition-all"><Plus size={14} /> Adicionar Carro</button>
                )}
            </div>

            <div className={`grid ${gridCols} ${participants?.length > 2 ? 'gap-16' : 'gap-4'} mt-20 lg:gap-4  lg:mt-40`}>
                {participants.map((p) => (
                    cars && <DetailedCarSelector key={p.tempId} rawCars={cars} cars={cars} participant={p} onUpdate={updateParticipant} onRemove={removeParticipant} showRemove={participants.length > 2} />
                ))}
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm text-gray-800 font-bold uppercase tracking-widest">Simulação 0-100 km/h</h3>
                    {/* Ranking simplificado durante a corrida */}
                    {raceResults && !racing && (
                        <div className="flex gap-2">
                            <span className="text-xs font-bold bg-yellow-400 text-black px-2 py-1 rounded">1º {raceResults[0].name}</span>
                        </div>
                    )}
                </div>

                <div className="space-y-4 relative">
                    <div className="absolute right-8 top-0 bottom-0 w-px border-r border-dashed border-gray-300 z-0"></div>

                    {!cars ? null : participants.map((p, idx) => {
                        const car = cars.find(c => c.id === p.id)!;
                        const time = car.specs[p.stage].zeroToHundred;
                        const laneColors = ['bg-gray-800', 'bg-[#6319F7]', 'bg-red-500', 'bg-emerald-500'];
                        const laneColor = laneColors[idx % laneColors.length];

                        const rank = raceResults
                            ? raceResults.findIndex(r => r.tempId === p.tempId) + 1
                            : null;

                        return (
                            <div key={p.tempId} className="relative h-10 bg-gray-50 rounded-lg border border-gray-100 flex items-center px-2 z-10">
                                <div className="absolute p-2 text-[9px] text-gray-400 font-bold w-12 truncate">
                                    {car.model}
                                </div>

                                <div
                                    className={`absolute h-6 w-12 ${laneColor} rounded shadow-lg flex items-center justify-center z-10 text-white transition-all`}
                                    style={{
                                        transition: racing
                                            ? `left ${time * 0.5}s cubic-bezier(0.25, 1, 0.5, 1)`
                                            : 'left 0.5s',
                                        left: racing ? 'calc(100% - 4rem)' : '3rem'
                                    }}
                                >
                                    <span className="text-[8px] font-bold">P{idx + 1}</span>
                                </div>

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
                        <h3 className="text-center font-bold text-gray-700 mb-4 flex justify-center items-center gap-2"><Medal size={18} /> Resultados Finais</h3>
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
                                        {idx > 0 && <div className="text-[9px] text-red-400">+{(result.time - raceResults[0].time).toFixed(2)}s</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {alertMessage && (
                    <Alert
                        type={alertMessage.type}
                        message={alertMessage.message}
                        onClose={() => setAlertMessage(null)}
                    />
                )}

                <Button className="mt-6" onClick={() => {
                    handleRace()
                    atualizarUrl(participants)
                }} primary fullWidth disabled={racing} >
                    {racing ? 'ACELERANDO...' : `COMPARAR ${participants.length} CARROS`}
                </Button>

                {raceResults && <Button className="mt-6 uppercase text-sm py-4 font-bold" fullWidth
                    onClick={copiarLink}
                >COMPARTILHAR RESULTADOS</Button>}
            </div>

            <div>

                {cars && <TechnicalComparison cars={cars} participants={participants} />}

                {cars && <EquipmentComparison cars={cars} participants={participants} />}

                {cars && <VerdictSection cars={cars} participants={participants} />}
            </div>
        </div>
    );
};
