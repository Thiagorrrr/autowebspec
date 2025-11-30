"use client"
import { ArrowLeft } from "lucide-react";

export const BackButton: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = 'Voltar' }) => (
    <button onClick={onClick} className="flex  cursor-pointer items-center gap-1 text-[#6319F7] hover:text-[#5014c9] text-sm font-bold mb-4">
        <ArrowLeft size={16} /> {label}
    </button>
);