"use client"

import { Activity, Camera, Check, CheckCircle, Fuel, Grid, Ruler, Text, X } from "lucide-react"
import { SectionTitle } from "../SectionTitle"
import { Label } from "../Label"
import Image from "next/image";
import { Car } from "@/types/types";

export const CarDetails = (car: Car) => {

    return (
        <>
            <div className="space-y-2">
                <SectionTitle>
                    <Camera size={16} className="text-[#6319F7]" /> Galeria de Fotos</SectionTitle>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {car.photos.map((photo, idx) => (
                        <div
                            key={idx}
                            className={`rounded-lg overflow-hidden border border-gray-200 sm:h-[500px] ${idx === 0 ? 'col-span-2 md:col-span-3 h-64' : ''}`}
                        >
                            <Image
                                src={`/${photo}`}
                                alt={`${car.make} ${idx}`}
                                width={300}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </div>

                    ))}
                </div>
            </div>

            {
                car.description && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                            <Text size={18} className="text-[#6319F7]" />
                            <h3 className="font-bold text-gray-800">Descrição</h3>
                        </div>
                        <div className="p-4">
                            <div className="text-md  lg:text-lg font-bold text-gray-800">
                                {car.description}
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                    <Activity size={18} className="text-[#6319F7]" />
                    <h3 className="font-bold text-gray-800">Ficha Técnica</h3>
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div><Label>Marca</Label><div className="text-md  lg:text-lg font-bold">{car?.make}</div></div>
                    <div><Label>Modelo</Label><div className="text-md  lg:text-lg font-bold">{car?.model}</div></div>
                    <div><Label>Ano</Label><div className="text-md  lg:text-lg font-bold">{car?.year}</div></div>
                    <div><Label>FIPE</Label><div className="text-md  lg:text-lg font-bold">{car?.fipe}</div></div>
                    <div><Label>Combustível</Label><div className="text-md  lg:text-lg font-bold">{car?.fuel}</div></div>
                    <div><Label>Portas</Label><div className="text-md  lg:text-lg font-bold">{car?.doors}</div></div>
                    <div><Label>Lugares</Label><div className="text-md  lg:text-lg font-bold">{car?.seats}</div></div>
                    <div><Label>Origem</Label><div className="text-md  lg:text-lg font-bold">{car?.origin}</div></div>
                </div>
            </div>
            {
                car.performance && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                            <Activity size={18} className="text-[#6319F7]" />
                            <h3 className="font-bold">Desempenho</h3>
                        </div>
                        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><Label>0–100 km/h</Label><div className="text-md  lg:text-lg font-bold">{car.performance.zeroToHundred}s</div></div>
                            <div><Label>Velocidade Máx.</Label><div className="text-md  lg:text-lg font-bold">{car.performance.topSpeed} km/h</div></div>
                            <div><Label>Tração</Label><div className="text-md  lg:text-lg font-bold">{car.performance.traction}</div></div>
                            <div><Label>Peso/Potência</Label><div className="text-md  lg:text-lg font-bold">{car.performance.powerToWeight}</div></div>
                        </div>
                    </div>
                )
            }

            {
                car.consumption && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                            <Fuel size={18} className="text-[#6319F7]" />
                            <h3 className="font-bold">Consumo</h3>
                        </div>
                        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><Label>Cidade (G)</Label><div className="text-md  lg:text-lg font-bold">{car.consumption.cityGasoline}</div></div>
                            <div><Label>Estrada (G)</Label><div className="text-md  lg:text-lg font-bold">{car.consumption.highwayGasoline}</div></div>
                            <div><Label>Cidade (E)</Label><div className="text-md  lg:text-lg font-bold">{car.consumption.cityEthanol}</div></div>
                            <div><Label>Estrada (E)</Label><div className="text-md  lg:text-lg font-bold">{car.consumption.highwayEthanol}</div></div>
                        </div>
                    </div>
                )
            }

            {
                car.engine && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                            <Activity size={18} className="text-[#6319F7]" />
                            <h3 className="font-bold">Motor (Detalhes)</h3>
                        </div>
                        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><Label>Motor</Label><div className="text-md  lg:text-lg font-bold">{car.engine.displacement}</div></div>
                            <div><Label>Aspiração</Label><div className="text-md  lg:text-lg font-bold">{car.engine.aspiration}</div></div>
                            <div><Label>Injeção</Label><div className="text-md  lg:text-lg font-bold">{car.engine.injection}</div></div>
                            <div><Label>Cilindros</Label><div className="text-md  lg:text-lg font-bold">{car.engine.cylinders}</div></div>
                            <div><Label>Válvulas</Label><div className="text-md  lg:text-lg font-bold">{car.engine.valves}</div></div>
                            <div><Label>Potência</Label><div className="text-md  lg:text-lg font-bold">{car.engine.powerHp} cv</div></div>
                            <div><Label>Torque</Label><div className="text-md  lg:text-lg font-bold">{car.engine.torqueKgfM} kgfm</div></div>
                            <div><Label>RPM Potência</Label><div className="text-md  lg:text-lg font-bold">{car.engine.powerRpm}</div></div>
                            <div><Label>RPM Torque</Label><div className="text-md  lg:text-lg font-bold">{car.engine.torqueRpm}</div></div>
                            <div><Label>Código do Motor</Label><div className="text-md  lg:text-lg font-bold">{car.engine.engineCode}</div></div>
                        </div>
                    </div>
                )
            }

            {
                car.transmissionDetails && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                            <Grid size={18} className="text-[#6319F7]" />
                            <h3 className="font-bold text-gray-800">Câmbio</h3>
                        </div>

                        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><Label>Tipo</Label><div className="text-md  lg:text-lg font-bold text-gray-800">{car.transmissionDetails.type}</div></div>
                            <div><Label>Marchas</Label><div className="text-md  lg:text-lg font-bold text-gray-800">{car.transmissionDetails.gears}</div></div>
                            <div><Label>Tração</Label><div className="text-md  lg:text-lg font-bold text-gray-800">{car.transmissionDetails.traction}</div>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                car.dimensions && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                            <Ruler size={18} className="text-[#6319F7]" />
                            <h3 className="font-bold">Dimensões</h3>
                        </div>
                        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><Label>Comprimento</Label><div className="text-md  lg:text-lg font-bold">{car.dimensions.length} mm</div></div>
                            <div><Label>Largura</Label><div className="text-md  lg:text-lg font-bold">{car.dimensions.width} mm</div></div>
                            <div><Label>Altura</Label><div className="text-md  lg:text-lg font-bold">{car.dimensions.height} mm</div></div>
                            <div><Label>Porta-malas</Label><div className="text-md  lg:text-lg font-bold">{car.dimensions.trunkCapacity} L</div></div>
                        </div>
                    </div>
                )
            }

            {
                car.brakes && car.suspension && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                            <Ruler size={18} className="text-[#6319F7]" />
                            <h3 className="font-bold">Freios & Suspensão</h3>
                        </div>
                        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><Label>Freio Dianteiro</Label><div className="text-md  lg:text-lg font-bold">{car.brakes.front}</div></div>
                            <div><Label>Freio Traseiro</Label><div className="text-md  lg:text-lg font-bold">{car.brakes.rear}</div></div>
                            <div><Label>Suspensão Dianteira</Label><div className="text-md  lg:text-lg font-bold">{car.suspension.front}</div></div>
                            <div><Label>Suspensão Traseira</Label><div className="text-md  lg:text-lg font-bold">{car.suspension.rear}</div></div>
                        </div>
                    </div>
                )
            }

            {
                car.tires && (
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                            <Ruler size={18} className="text-[#6319F7]" />
                            <h3 className="font-bold">Rodas & Pneus</h3>
                        </div>
                        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><Label>Pneu Dianteiro</Label><div className="text-md  lg:text-lg font-bold">{car.tires.front}</div></div>
                            <div><Label>Pneu Traseiro</Label><div className="text-md  lg:text-lg font-bold">{car.tires.rear}</div></div>
                            <div><Label>Aro</Label><div className="text-md  lg:text-lg font-bold">{car.tires.wheelSize}"</div></div>
                        </div>
                    </div>
                )
            }

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                    <Grid size={18} className="text-[#6319F7]" />
                    <h3 className="font-bold text-gray-800">Lista de Equipamentos</h3>
                </div>
                <div className="p-2">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden gap-1">
                        {
                            Object.entries(car.equipment).map(([category, items]) => (
                                <div key={category} className="mb-6">
                                    <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                                        <CheckCircle size={18} className="text-[#6319F7]" />
                                        <h3 className="font-bold text-gray-800">{category}</h3>
                                    </div>
                                    <div className="rounded-lg overflow-hidden">
                                        {Object.entries(items).map(([item, hasItem]) => (
                                            <div key={item} className="p-3 flex justify-between items-center border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                                <span className={`text-sm font-medium ${hasItem ? 'text-gray-800' : 'text-gray-600'}`}>{item}</span>
                                                {hasItem ? <Check size={16} className="text-[#6319F7]" /> : <X size={16} className="text-gray-400" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}