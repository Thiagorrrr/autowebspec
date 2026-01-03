"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { Button } from "../Button";

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  return (
    <>
      {isHome && (
        <section className="relative w-full h-[260px] md:h-[400px] overflow-hidden">
          <Image
            src="/hero.webp"
            alt="AutoWebSpec"
            fill
            priority
            className="object-cover object-[50%_60%]"
          />

          {/* Overlay refinado */}
          <div className="absolute inset-0 bg-linear-to-b from-white/85 via-white/40 to-white/95" />

          {/* Conteúdo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-2xl px-4">
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
                Compare. Escolha.
              </h1>

              <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                Compare carros, analise especificações técnicas e tome a melhor
                decisão antes de comprar.
              </p>

              <div className="mt-8 flex justify-center">
                <Button
                  primary
                  onClick={() => router.push("/comparar")}
                >
                  Comparar carros
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONTEÚDO */}
      <main
        className={`
          max-w-7xl mx-auto px-4
          ${isHome ? "mt-10 md:mt-14" : "mt-6 md:mt-10"}
        `}
      >
        {children}
      </main>
    </>
  );
};

export default Main;
