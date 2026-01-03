"use client"
import { usePathname } from "next/navigation";
import Image from "next/image";
import React from "react";
import { Button } from "../Button";
import { useRouter } from "next/navigation";

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {pathname === "/" &&
        <section className="relative w-full h-[260px] md:h-[380px] ">
          <Image
            src="/hero.webp"
            alt="AutoWebSpec"
            fill
            priority
            className="object-cover object-[50%_60%]"
          />

          {/* Overlay branco suave */}
          <div className="absolute inset-0 bg-linear-to-b from-gray-50/80 via-gray-50/30 to-gray-50" />


          {/* Conteúdo sobreposto */}
          {pathname === "/" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-2xl px-4">
                <h1 className="text-3xl md:text-4xl font-semibold text-black">
                  Compare. Escolha.
                </h1>

                <p className="mt-3 text-base md:text-lg text-black">
                  Compare carros, veja detalhes técnicos e tome a melhor decisão.
                </p>

                <div className="mt-6 flex justify-center">
                  <Button primary onClick={() => router.push("/comparar")}
                  >Comparar carros
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>
      }

      {/* CONTEÚDO */}
      <main className="max-w-7xl mx-auto px-4 md:mt-12">
        {children}
      </main>
    </>
  );
};

export default Main;
