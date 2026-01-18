"use client";

import { Flame } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Comparar", href: "/comparar" },
  { label: "Produtos", href: "/produtos" },
  { label: "Notícias", href: "/noticias" },
  { label: "Marcas", href: "/marcas" },
  { label: "Ranking", href: "/ranking" },
  { label: "Detalhes", href: "/detalhes" },
  { label: "Custos", href: "/custos" },
  { label: "Eventos", href: "/eventos" },
];

export const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="bg-[#6319F7] p-2.5 rounded-xl shadow-lg shadow-[#6319F7]/30 -rotate-3">
            <Link href="/" aria-label="Home">
              <Flame className="text-white" size={20} fill="currentColor" />
            </Link>
          </div>

          <Link href="/" className="leading-tight">
            <h1 className="text-xl font-black tracking-tighter text-gray-900">
              AUTO<span className="text-[#6319F7]">WEBSPEC</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
              Comparador Pro
            </p>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-sm font-bold">
          {menuItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`
                transition-colors hover:text-[#6319F7]
                ${isActive(href) ? "text-[#6319F7]" : ""}
              `}
            >
              {label.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* HAMBURGER / X */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden relative w-12 h-12 flex items-center justify-center z-60"
        >
          <span
            className={`absolute w-11 h-[3.5px] bg-gray-900 rounded transition-all duration-300 ${open ? "rotate-45" : "-translate-y-3"
              }`}
          />
          <span
            className={`absolute w-11 h-[3.5px] bg-gray-900 rounded transition-all duration-300 ${open ? "opacity-0" : ""
              }`}
          />
          <span
            className={`absolute w-11 h-[3.5px] bg-gray-900 rounded transition-all duration-300 ${open ? "-rotate-45" : "translate-y-3"
              }`}
          />
        </button>
      </div>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* MOBILE MENU */}
      <aside
        className={`
          fixed top-20 right-0 h-full w-7/12 bg-white z-50 shadow-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >

        <nav className="flex flex-col text-md font-bold uppercase ">
          {menuItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`
                px-6 py-6 border-l-4 transition-all  last:border-b-transparent
                ${isActive(href)
                  ? "border-[#6319F7] text-[#6319F7] bg-[#6319F7]/5"
                  : "border-l-transparent border-b  border-b-gray-100 text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
};
