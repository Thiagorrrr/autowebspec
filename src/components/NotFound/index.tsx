"use client"
import { AlertOctagon } from "lucide-react";
import { Button } from "../Button";

export const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-fadeIn">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
            <AlertOctagon size={64} className="text-[#6319F7]" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Pista Errada!</h2>
        <p className="text-gray-500 max-w-md mb-8">
            Parece que a página que procura não existe ou o carro já cruzou a linha de chegada.
        </p>
        <Button primary>
            Voltar ao Início
        </Button>
    </div>
);