"use client"
import { Participant, RaceResult } from "@/types/types";
import { useEffect, useRef, useState, useCallback } from "react";
import { DetailedCarSelector } from "./components/DetailedCarSelector";
import { EquipmentComparison } from "./components/EquipmentComparison";
import { VerdictSection } from "./components/VerdictSection";
import { Medal, Plus, Trophy, RotateCcw, Share2 } from "lucide-react";
import { useCars } from "@/hooks/queries/useCars";
import { Button } from "../Button";
import { Alert } from "../Alert";
import { Loading } from "./loading";
import { TechnicalComparison } from "./components/TechnicalComparison";
import { SectionTitle } from "../SectionTitle";

export type AlertMessage = {
    type: "success" | "error" | "alert";
    message: string;
};

export const DragRace = () => {
    const { data: cars, isLoading, error } = useCars();
    const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [racing, setRacing] = useState<boolean>(false);
    const [raceResults, setRaceResults] = useState<RaceResult[] | null>(null);
    const [showComparison, setShowComparison] = useState(false);
    const initialized = useRef(false);

    const atualizarUrl = useCallback((parts: Participant[]) => {
        const validParts = parts.filter(p => p.id !== "");
        const params = validParts
            .map((item, index) => `carro${index + 1}=${encodeURIComponent(item.id)}`)
            .join("&");

        const novaUrl = validParts.length > 0 ? `?${params}` : window.location.pathname;
        window.history.replaceState(null, "", novaUrl);
    }, []);

    useEffect(() => {
        if (!cars || cars.length === 0 || initialized.current) return;

        const url = new URL(window.location.href);
        const urlCars: Participant[] = [];

        for (let i = 1; i <= 4; i++) {
            const id = url.searchParams.get(`carro${i}`);
            if (id && cars.find(c => c.id === id)) {
                urlCars.push({ tempId: i, id, stage: "stock" });
            }
        }

        if (urlCars.length > 0) {
            setParticipants(urlCars);
            setShowComparison(true);
        } else {
            setParticipants([
                { tempId: 1, id: "", stage: "stock" },
                { tempId: 2, id: "", stage: "stock" }
            ]);
        }
        initialized.current = true;
    }, [cars]);

    useEffect(() => {
        if (initialized.current) {
            atualizarUrl(participants);
        }
    }, [participants, atualizarUrl]);

    const updateParticipant = (tempId: number, newData: Partial<Participant>) => {
        setShowComparison(false);
        setRaceResults(null);
        setParticipants(prev => prev.map(p => p.tempId === tempId ? { ...p, ...newData } : p));
    };

    const handleRace = () => {
        const validOnes = participants.filter(p => p.id !== "");

        // Lógica corrigida: verifica se todos os slots abertos estão preenchidos
        if (validOnes.length < participants.length) {
            setAlertMessage({ type: "alert", message: `Selecione pelo menos ${participants.length} carros para comparar.` });
            return;
        }

        setRacing(true);
        setRaceResults(null);

        const results = validOnes.map(p => {
            const car = cars!.find(c => c.id === p.id)!;
            return {
                ...p,
                name: `${car.make} ${car.model}`,
                version: car.version,
                time: car.specs[p.stage].zeroToHundred,
                speed: car.specs[p.stage].zeroToHundred
            };
        }).sort((a, b) => a.time - b.time);

        const maxTime = Math.max(...results.map(r => r.time));
        setTimeout(() => {
            setRaceResults(results);
            setRacing(false);
            setShowComparison(true);
        }, maxTime * 400 + 1000);
    };

    const handleReset = () => {
        setRaceResults(null);
        setShowComparison(false);
        setParticipants([
            { tempId: 1, id: "", stage: "stock" },
            { tempId: 2, id: "", stage: "stock" }
        ]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const copiarLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => setAlertMessage({ type: "success", message: "Link copiado!" }))
            .catch(() => setAlertMessage({ type: "error", message: "Erro ao copiar link" }));
    };

    if (isLoading) return <Loading />;
    if (error || !cars) return <div className="text-red-500 p-8 text-center font-bold">Erro ao carregar dados.</div>;

    const validParticipants = participants.filter(p => p.id !== "");

    return (
        <div className="space-y-6 mt-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <SectionTitle
                    subtitle="Simulador de Performance"
                    description="Confronte fichas técnicas detalhadas e simule o desempenho de aceleração real entre até quatro veículos simultaneamente."
                >
                    Comparar <br />  Veículos
                </SectionTitle>

                {participants.length < 4 && (
                    <div className="mt-8 lg:pb-12 lg:mt-0">
                        <button
                            onClick={() => {
                                setShowComparison(false);
                                const nextId = participants.length === 0 ? 1 : Math.max(...participants.map(p => p.tempId)) + 1;
                                setParticipants([...participants, { tempId: nextId, id: "", stage: 'stock' }]);
                            }}
                            className="flex items-center gap-1 text-sm font-bold text-[#6319F7] bg-[#6319F7]/10 px-4 py-3 rounded-xl hover:bg-[#6319F7] hover:text-white transition-all whitespace-nowrap h-fit shadow-sm"
                        >
                            <Plus size={16} /> Adicionar Carro
                        </button>
                    </div>
                )}
            </div>

            <div className={`grid gap-20 lg:gap-4 mt-20 lg:mt-40 ${participants.length === 2 ? 'grid-cols-2' :
                participants.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-4'
                }`}>
                {participants.map((p) => (
                    <DetailedCarSelector
                        key={p.tempId}
                        rawCars={cars}
                        cars={cars}
                        participant={p}
                        onUpdate={updateParticipant}
                        onRemove={(id) => {
                            setShowComparison(false);
                            setParticipants(prev => prev.filter(item => item.tempId !== id));
                        }}
                        showRemove={participants.length > 2}
                    />
                ))}
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm text-gray-800 font-bold uppercase tracking-widest">Simulação 0-100 km/h</h3>
                </div>

                <div className="space-y-4 relative mb-6">
                    <div className="absolute right-8 top-0 bottom-0 w-px border-r border-dashed border-gray-300 z-0"></div>
                    {participants.map((p, idx) => {
                        const car = cars.find(c => c.id === p.id);
                        const laneColor = ['bg-gray-800', 'bg-[#6319F7]', 'bg-red-500', 'bg-emerald-500'][idx % 4];
                        const rank = raceResults ? raceResults.findIndex(r => r.tempId === p.tempId) + 1 : null;

                        return (
                            <div key={p.tempId} className="relative h-10 bg-gray-50 rounded-lg border border-gray-100 flex items-center px-2 z-10">
                                {car && (
                                    <div
                                        className={`absolute h-6 w-20 ${laneColor} rounded shadow-lg flex items-center justify-center z-10 text-white transition-all`}
                                        style={{
                                            left: racing ? 'calc(100% - 5.5rem)' : '0.5rem',
                                            transitionDuration: racing ? `${car.specs[p.stage].zeroToHundred * 0.5}s` : '0.5s'
                                        }}
                                    >
                                        <span className="text-[8px] font-bold truncate">{car.model}</span>
                                    </div>
                                )}
                                {rank && (
                                    <div className="absolute right-2 font-bold text-xs flex items-center gap-1 animate-fade-in">
                                        {rank === 1 && <Trophy size={12} className="text-yellow-500" />}
                                        {rank}º Lugar
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {raceResults && !racing && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in duration-500">
                        <h3 className="text-center font-bold text-gray-700 mb-4 flex justify-center items-center gap-2"><Medal size={18} /> Resultados Finais</h3>
                        <div className="space-y-2">
                            {raceResults.map((result, idx) => (
                                <div key={result.tempId} className="flex justify-between items-center p-2 bg-white rounded border border-gray-200 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-500'}`}>
                                            {idx + 1}
                                        </div>
                                        <div className="text-sm font-bold text-gray-800">{result.name}</div>
                                    </div>
                                    <div className="font-mono font-bold text-[#6319F7]">{result.time}s</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Button className="mt-6 p-4 text-3xl " onClick={handleRace} primary fullWidth disabled={racing}>
                    {racing ? 'ACELERANDO...' : validParticipants.length < participants.length ? 'ADICIONE MAIS UM CARRO' : `COMPARAR ${validParticipants.length} CARROS`}
                </Button>

                {raceResults && !racing && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        <Button className="uppercase text-sm py-4 font-bold" fullWidth onClick={copiarLink}>
                            <Share2 size={16} />
                            Compartilhar
                        </Button>
                        <Button
                            onClick={handleReset}
                            className="flex items-center justify-center gap-2 text-sm cursor-pointer font-bold text-red-500 bg-red-50 rounded-lg hover:bg-red-500 hover:text-red-50 transition-all uppercase px-4 py-2"
                        >
                            <RotateCcw size={16} /> Refazer Tudo
                        </Button>
                    </div>
                )}
            </div>

            {showComparison && validParticipants.length === participants.length && !racing && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <TechnicalComparison cars={cars} participants={validParticipants} />
                    <EquipmentComparison cars={cars} participants={validParticipants} />
                    <VerdictSection cars={cars} participants={validParticipants} />
                </div>
            )}

            {alertMessage && <Alert type={alertMessage.type} message={alertMessage.message} onClose={() => setAlertMessage(null)} />}
        </div>
    );
};