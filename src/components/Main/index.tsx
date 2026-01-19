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
        <section className="relative w-full h-[250px] md:h-[500px] flex items-center overflow-hidden bg-white">
          {/* Imagem posicionada à direita para não brigar com o texto */}
          <div className="absolute inset-0 left-0 ">
            <Image
              src="/hero.webp"
              alt="Carro andando em uma rodovia"
              fill
              priority
              className="object-cover object-[left_center] md:object-center" />
          </div>

          {/* Máscara Branca: 
              Faz a transição suave do fundo branco do site para a imagem.
              No mobile ela cobre mais, no desktop ela abre para mostrar o carro.
          */}
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent md:via-white/40" />

          {/* Degradê na base para sumir com a borda inferior da foto */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-white to-transparent" />

          {/* Conteúdo */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-10 h-0.5 bg-[#6319F7]"></span>
                <span className="text-[#6319F7] text-xs font-black uppercase tracking-widest">
                  Especialistas em Carros
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1]">
                Compare. <br />
                Escolha o <span className="text-[#6319F7]">melhor.</span>
              </h1>

              <p className="mt-6 text-base md:text-lg text-gray-600 font-medium leading-relaxed max-w-md">
                Encontre a ficha técnica completa e compare o desempenho dos modelos que você deseja.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  primary
                  className="h-14 px-8 shadow-xl shadow-[#6319F7]/20 hover:-translate-y-1 transition-all"
                  onClick={() => router.push("/comparar")}
                >
                  Começar Comparação
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONTEÚDO */}
      <main
        className={`
          max-w-7xl mx-auto px-4 pb-20
          ${isHome ? "mt-12 md:mt-16" : "mt-8"}
        `}
      >
        {children}
      </main>
    </>
  );
};

export default Main;