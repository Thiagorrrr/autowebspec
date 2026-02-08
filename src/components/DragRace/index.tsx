"use client"
import { Participant, RaceResult, Car } from "@/types/types";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { DetailedCarSelector } from "./components/DetailedCarSelector";
import { EquipmentComparison } from "./components/EquipmentComparison";
import { VerdictSection } from "./components/VerdictSection";
import { Medal, Plus, Trophy, RotateCcw, Share2 } from "lucide-react";
import { useCarsSummary } from "@/hooks/queries/useCarsSummary";
import { useApi } from "@/hooks/useApi"
import { Button } from "../Button";
import { Alert } from "../Alert";
import { Loading } from "./loading";
import { TechnicalComparison } from "./components/TechnicalComparison";
import { SectionTitle } from "../SectionTitle";
import Script from "next/script";

export type AlertMessage = {
    type: "success" | "error" | "alert";
    message: string;
};

export const DragRace = () => {
    const { data: carsSummary, isLoading, error } = useCarsSummary();
    const { getCarById } = useApi();

    const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [racing, setRacing] = useState<boolean>(false);
    const [raceResults, setRaceResults] = useState<RaceResult[] | null>(null);
    const [detailedCars, setDetailedCars] = useState<Car[]>([]);
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

    const buscarDetalhesIniciais = useCallback(async (parts: Participant[]) => {
        try {
            const ids = parts.map(p => p.id).filter(id => id !== "");
            if (ids.length === 0) return;

            const data = await Promise.all(ids.map(id => getCarById(id)));
            setDetailedCars(data);
            setShowComparison(true);
        } catch (err) {
            console.error("Erro ao carregar carros da URL", err);
        }
    }, [getCarById]);

    useEffect(() => {
        if (!carsSummary || carsSummary.length === 0 || initialized.current) return;

        const url = new URL(window.location.href);
        const urlCars: Participant[] = [];

        for (let i = 1; i <= 4; i++) {
            const id = url.searchParams.get(`carro${i}`);
            if (id && carsSummary.find(c => c.id === id)) {
                urlCars.push({ tempId: i, id, stage: "stock" });
            }
        }

        if (urlCars.length > 0) {
            setParticipants(urlCars);
            buscarDetalhesIniciais(urlCars);
        } else {
            setParticipants([
                { tempId: 1, id: "", stage: "stock" },
                { tempId: 2, id: "", stage: "stock" }
            ]);
        }
        initialized.current = true;
    }, [carsSummary, buscarDetalhesIniciais]);

    useEffect(() => {
        if (initialized.current) {
            atualizarUrl(participants);
        }
    }, [participants, atualizarUrl]);

    const updateParticipant = (tempId: number, newData: Partial<Participant>) => {
        setShowComparison(false);
        setRaceResults(null);

        setParticipants(prev => {
            const updated = prev.map(p => p.tempId === tempId ? { ...p, ...newData } : p);

            // Se o ID mudou, removemos o carro antigo do estado de detalhados
            if (newData.id !== undefined) {
                setDetailedCars(current => current.filter(c =>
                    updated.some(p => p.id === c.id)
                ));
            }
            return updated;
        });
    };

    const handleRace = async () => {
        const validOnes = participants.filter(p => p.id !== "");

        if (validOnes.length < participants.length) {
            setAlertMessage({ type: "alert", message: `Selecione todos os veículos para iniciar a comparação.` });
            return;
        }

        setRacing(true);
        setRaceResults(null);

        try {
            const carPromises = validOnes.map(p => getCarById(p.id));
            const fullCarsData = await Promise.all(carPromises);
            setDetailedCars(fullCarsData);

            const results = validOnes.map(p => {
                const car = fullCarsData.find(c => c.id === p.id)!;
                const specs = car.specs[p.stage] || car.specs.stock;
                return {
                    ...p,
                    name: `${car.make} ${car.model}`,
                    version: car.version,
                    time: specs.zeroToHundred,
                    speed: specs.zeroToHundred
                };
            }).sort((a, b) => a.time - b.time);

            // Tempo de animação baseado no desempenho (mínimo 1.5s para efeito visual)
            setTimeout(() => {
                setRaceResults(results);
                setRacing(false);
                setShowComparison(true);
            }, 2000);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setAlertMessage({ type: "error", message: "Falha ao obter dados técnicos. Verifique sua conexão." });
            setRacing(false);
        }
    };

    const handleReset = () => {
        setRaceResults(null);
        setShowComparison(false);
        setDetailedCars([]);
        setParticipants([
            { tempId: 1, id: "", stage: "stock" },
            { tempId: 2, id: "", stage: "stock" }
        ]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const copiarLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => setAlertMessage({ type: "success", message: "Link da comparação copiado!" }))
            .catch(() => setAlertMessage({ type: "error", message: "Erro ao copiar link" }));
    };

    const comparisonSchema = useMemo(() => {
        if (!detailedCars || detailedCars.length === 0) return null;

        return {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": `Comparativo de Performance: ${detailedCars.map(c => `${c.make} ${c.model}`).join(' vs ')}`,
            "description": `Simulação de aceleração e comparação técnica detalhada entre ${detailedCars.map(c => `${c.make} ${c.model} ${c.version}`).join(' e ')}.`,
            "brand": {
                "@type": "Brand",
                "name": "AutoWebSpec"
            },
            "isRelatedTo": detailedCars.map(car => ({
                "@type": "Product",
                "name": `${car.make} ${car.model} ${car.version}`,
                "image": car.image,
                "description": `Ficha técnica completa de ${car.make} ${car.model}`
            }))
        };
    }, [detailedCars]);

    if (isLoading) return <Loading />;
    if (error || !carsSummary) return <div className="text-red-500 p-8 text-center font-bold">Erro ao carregar banco de dados.</div>;

    const validParticipants = participants.filter(p => p.id !== "");



    return (
        <div className="space-y-6 mt-8">
            {/* Injeção do Schema Dinâmico */}
            {comparisonSchema && (
                <Script
                    id="comparison-schema"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
                />
            )}
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <SectionTitle
                    subtitle="Simulador de Performance"
                    description="Confronte fichas técnicas detalhadas e simule o desempenho de aceleração real entre até quatro veículos simultaneamente."
                >
                    Comparar <br /> Veículos
                </SectionTitle>

                {participants.length < 4 && (
                    <div className="lg:pb-12">
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

            <div className={`grid gap-6 lg:gap-4 mt-20 lg:mt-40 ${participants.length === 2 ? 'grid-cols-2' :
                participants.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-4'
                }`}>
                {participants.map((p) => (
                    <DetailedCarSelector
                        key={p.tempId}
                        rawCars={carsSummary}
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
                <div className="space-y-4 relative mb-6">
                    <div className="absolute right-8 top-0 bottom-0 w-px border-r border-dashed border-gray-300 z-0"></div>
                    {participants.map((p, idx) => {
                        const car = detailedCars.find(c => c.id === p.id) || carsSummary.find(c => c.id === p.id);
                        const laneColor = ['bg-gray-800', 'bg-[#6319F7]', 'bg-red-500', 'bg-emerald-500'][idx % 4];
                        const rank = raceResults ? raceResults.findIndex(r => r.tempId === p.tempId) + 1 : null;

                        const det = detailedCars.find(c => c.id === p.id);
                        const accelTime = det ? (det.specs[p.stage]?.zeroToHundred || det.specs.stock.zeroToHundred) : 10;

                        return (
                            <div key={p.tempId} className="relative h-10 bg-gray-50 rounded-lg border border-gray-100 flex items-center px-2 z-10">
                                {car && (
                                    <div
                                        className={`absolute h-6 w-20 ${laneColor} rounded shadow-lg flex items-center justify-center z-10 text-white transition-all`}
                                        style={{
                                            left: racing ? 'calc(100% - 5.5rem)' : '0.5rem',
                                            transitionDuration: racing ? `${accelTime * 0.4}s` : '0.5s'
                                        }}
                                    >
                                        <span className="text-[8px] font-bold truncate px-1">{car.model}</span>
                                    </div>
                                )}
                                {rank && (
                                    <div className="absolute right-2 font-bold text-xs flex items-center gap-1 animate-fade-in text-gray-700">
                                        {rank === 1 && <Trophy size={12} className="text-yellow-500" />}
                                        {rank}º Lugar
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <Button className="mt-6 p-4 text-3xl font-black" onClick={handleRace} primary fullWidth disabled={racing}>
                    {racing ? 'ACELERANDO...' : validParticipants.length < participants.length ? 'COMPLETE A SELEÇÃO' : `COMPARAR ${validParticipants.length} VEÍCULOS`}
                </Button>

                {raceResults && !racing && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
                        <h3 className="text-center font-bold text-gray-700 mb-4 flex justify-center items-center gap-2"><Medal size={18} /> Resultados Finais</h3>
                        <div className="space-y-2">
                            {raceResults.map((result, idx) => (
                                <div key={result.tempId} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-500'}`}>
                                            {idx + 1}
                                        </div>
                                        <div className="text-sm font-bold text-gray-800">{result.name} <span className="text-gray-400 font-normal text-[10px] ml-1">{result.version}</span></div>
                                    </div>
                                    <div className="font-mono font-bold text-[#6319F7]">{result.time.toFixed(2)}s</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {raceResults && !racing && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        <Button className="uppercase text-sm py-4 font-bold" fullWidth onClick={copiarLink}>
                            <Share2 size={16} /> Compartilhar
                        </Button>
                        <Button onClick={handleReset} className="flex items-center justify-center gap-2 text-sm font-bold text-red-500 bg-red-50 rounded-lg hover:bg-red-500 hover:text-red-50 transition-all uppercase px-4 py-2">
                            <RotateCcw size={16} /> Resetar
                        </Button>
                    </div>
                )}
            </div>

            {showComparison && detailedCars.length === validParticipants.length && !racing && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <TechnicalComparison cars={detailedCars} participants={validParticipants} />
                    <EquipmentComparison cars={detailedCars} participants={validParticipants} />
                    <VerdictSection cars={detailedCars} participants={validParticipants} />
                </div>
            )}

            {alertMessage && <Alert type={alertMessage.type} message={alertMessage.message} onClose={() => setAlertMessage(null)} />}
        </div>
    );
};