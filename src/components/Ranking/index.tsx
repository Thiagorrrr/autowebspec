import { useState } from "react";
import { Car } from "../Main/data";
import Image from "next/image";
import Link from "next/link";
interface RankingProps {
  data: Car[]
}

export const Ranking = ({ data }: RankingProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const categories = ['Todas', ...new Set(data.map(c => c.category))];
  const filteredCars = selectedCategory === 'Todas' ? data : data.filter(c => c.category === selectedCategory);
  const sortedCars = [...filteredCars].sort((a, b) => a.price - b.price);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Ranking por Preço</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-[#6319F7] text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>{cat}</button>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        {sortedCars.map((car, index) => (
          <Link href={`/marcas/${car.make.toLowerCase().replace(/\s+/g, "-")}/${car.model.toLowerCase().replace(/\s+/g, "-")}/${car.year}/${car.version.toLowerCase().replace(/\s+/g, "-")}`} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 hover:shadow-md transition-all" key={car.id} >

            <div className="flex items-center justify-center  gap-4 w-full sm:w-auto pb-2">
              <div className="text-2xl font-black text-[#6319F7] w-8 text-center">#{index + 1}</div>
              <Image src={car.image} alt={`${car.make}-${car.model}-${car.year}-${car.version}`} width={150} height={100} className="w-full  lg:w-48 ml-2  sm:max-w-52 h-36  object-cover rounded-lg shadow-sm" />
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-800 text-lg truncate">{`${car.make} ${car.model} ${car.year} ${car.version}`} </h3>
                <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded font-bold uppercase inline-block w-max mx-auto sm:mx-0">{car.category}</span>
              </div>
              <p className="text-gray-500 text-sm">{car.year} • {car.specs.stock.hp}cv</p>
            </div>
            <div className="text-center sm:text-right w-full sm:w-auto bg-gray-50 sm:bg-transparent p-2 rounded-lg">
              <div className="text-[#6319F7] font-bold text-xl">{car.fipe}</div>
              <div className="text-xs text-gray-400">Preço Médio</div>
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
};