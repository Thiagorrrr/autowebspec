"use client"
import { Flame } from "lucide-react";
import Link from "next/link"
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path ? "text-[#6319F7]" : "";

  return (
    <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#6319F7] p-2.5 rounded-xl shadow-lg shadow-[#6319F7]/30 transform -rotate-3">
            <Link href="/">
              <Flame className="text-white" size={20} fill="currentColor" />
            </Link>
          </div>
          <div>
            <Link href="/"><h1 className="text-xl font-black tracking-tighter text-gray-900">AUTO<span className="text-[#6319F7]">WEBSPEC</span></h1><p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Comparador Pro</p></Link></div>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-400">

          <Link href="/">
            <span className={`hover:text-[#6319F7] transition-colors ${isActive("/")}`}>
              HOME
            </span>
          </Link>

          <Link href="/marcas">
            <span className={`hover:text-[#6319F7] transition-colors ${isActive("/marcas")} ${pathname.includes("/marcas") ? "text-[#6319F7]" : ""} `}>
              MARCAS
            </span>
          </Link>

          <Link href="/ranking">
            <span className={`hover:text-[#6319F7] transition-colors ${isActive("/ranking")}`}>
              RANKING
            </span>
          </Link>

          <Link href="/detalhes">
            <span className={`hover:text-[#6319F7] transition-colors ${isActive("/detalhes")}`}>
              DETALHES
            </span>
          </Link>

          <Link href="/custos">
            <span className={`hover:text-[#6319F7] transition-colors ${isActive("/custos")}`}>
              CUSTOS
            </span>
          </Link>

          <Link href="/eventos">
            <span className={`hover:text-[#6319F7] transition-colors ${isActive("/eventos")}`}>
              EVENTOS
            </span>
          </Link>

        </nav>
      </div>
    </header >
  )
}