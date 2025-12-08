"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type AlertProps = {
    type: "success" | "error" | "alert";
    message: string;
    onClose: () => void;
};

export const Alert = ({ type, message, onClose }: AlertProps) => {
    const [closing, setClosing] = useState(false);

    const colors = {
        success: "bg-green-600",
        error: "bg-red-600",
        alert: "bg-yellow-600",
    };

    const fecharAnimado = useCallback(() => {
        setClosing(true);
        setTimeout(onClose, 300); // espera a animação antes de sumir
    }, [onClose]);

    // Fecha automaticamente depois de 3s
    useEffect(() => {
        const timer = setTimeout(() => fecharAnimado(), 3000);
        return () => clearTimeout(timer);
    }, [fecharAnimado]);

    return (
        <div
            className={`
                fixed top-24 right-4 z-50
                px-4 py-3 shadow-lg rounded-lg text-white
                flex items-center gap-3
                transition-all duration-300 transform
                ${colors[type]}
                ${closing ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
            `}
        >
            <span>{message}</span>

            <button onClick={fecharAnimado} className="hover:opacity-70 transition">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
