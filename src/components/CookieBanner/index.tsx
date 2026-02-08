"use client";

import { useState, useEffect } from "react";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [allowTracking, setAllowTracking] = useState(false);

    // Configuração: 30 dias em milissegundos
    const EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000;

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        const consentDate = localStorage.getItem("cookie-consent-date");
        const now = new Date().getTime();

        // Se existe consentimento, verifica se expirou
        if (consent && consentDate) {
            const isExpired = now - parseInt(consentDate) > EXPIRATION_TIME;

            if (isExpired) {
                localStorage.removeItem("cookie-consent");
                localStorage.removeItem("cookie-consent-date");
                setIsVisible(true);
            } else if (consent === "enabled") {
                setAllowTracking(true);
            }
        } else {
            setIsVisible(true);
        }
    }, [EXPIRATION_TIME]);

    const saveChoice = (choice: "enabled" | "disabled") => {
        const now = new Date().getTime();
        localStorage.setItem("cookie-consent", choice);
        localStorage.setItem("cookie-consent-date", now.toString());

        setAllowTracking(choice === "enabled");
        setIsVisible(false);
    };

    return (
        <>
            {allowTracking && (
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_TAG!} />
            )}

            {isVisible && (
                <div className="fixed bottom-20 md:bottom-6 left-4 right-4 z-100 md:left-auto md:max-w-md animate-in fade-in slide-in-from-bottom-10 duration-700">
                    <Card className="p-6 border-none shadow-2xl bg-white/95 backdrop-blur-md border border-gray-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[#6319F7]/10 rounded-2xl text-[#6319F7] shrink-0">
                                <Cookie size={24} />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-900">Privacidade e Cookies</h3>
                                    <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600">
                                        <X size={18} />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    O <strong>AutoWebSpec</strong> utiliza cookies para melhorar sua experiência. Solicitamos sua autorização a cada 90 dias para garantir que suas preferências estejam atualizadas.
                                </p>
                                <div className="flex flex-col gap-2 pt-2">
                                    <Button onClick={() => saveChoice("enabled")} className="font-bold">
                                        Aceitar Cookies
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => saveChoice("disabled")}
                                            className="flex-1 text-xs"
                                        >
                                            Recusar
                                        </Button>
                                        <Link href="/politica-de-privacidade" className="flex-1">
                                            <Button className="w-full text-xs">
                                                Ler Política
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};