
"use client"
import { ChevronRight } from "lucide-react";
import { Card } from "../Card";
import { SectionTitle } from "../SectionTitle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useNews } from "@/hooks/queries/useNews";
import { Button } from "../Button";

export const HomePage = () => {
    const pathname = usePathname();

    const { data, isLoading, error } = useNews();

    const dataDestaque = [
        {
            id: "1",
            title: "Corolla vs Sentra",
            subtitle: "Compare especificações técnicas e desempenho lado a lado.",
            image: {
                car1: "/marcas/toyota/corolla/corolla.webp",
                car2: "/marcas/nissan/sentra/sentra.webp"
            },
            url: "comparar/?carro1=toyota-corolla-2025&carro2=nissan-sentra-2025"
        },
        {
            id: "2",
            title: "Polo vs 208",
            subtitle: "Compare especificações técnicas e desempenho lado a lado.",
            image: {
                car1: "/marcas/volkswagen/polo/polo.webp",
                car2: "/marcas/peugeot/208/208.webp"
            },
            url: "comparar/?carro1=volkswagen-polo-2025&carro2=peugeot-208-2025"
        },
        {
            id: "3",
            title: "hb20 vs 208",
            subtitle: "Compare especificações técnicas e desempenho lado a lado.",
            image: {
                car1: "/marcas/hyundai/hb20/hb20.webp",
                car2: "/marcas/peugeot/208/208.webp"
            },
            url: "comparar/?carro1=hyundai-hb20-2025&carro2=peugeot-208-2025"
        }
    ]
    const dataRanking = [
        { id: 1, position: 1, title: "Mobi", image: "/marcas/fiat/mobi/mobi.webp", url: "ranking" },
        { id: 2, position: 2, title: "Kwid", image: "/marcas/renault/kwid/kwid.webp", url: "ranking" },
        { id: 3, position: 3, title: "hb20", image: "/marcas/hyundai/hb20/hb20.webp", url: "ranking" },
    ]
    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar</p>;

    return (
        <div className="grid gap-6 mt-8">
            <div className="space-y-6">
                <SectionTitle>
                    Comparativos em Destaque
                </SectionTitle>


                {/* Comparativos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dataDestaque.map(news => (
                        <Link className="p-0 overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow" href={`${pathname}${news.url}`} key={news.id}>

                            <Card key={news.id} >
                                <div className="flex items-center justify-center  w-full  h-48  relative">
                                    <div className="flex items-center max-h-56 justify-between">
                                        <Image src={news.image.car1} alt={news.title} width={100} height={100} className=" object-contain  " />
                                        <span className="text-[#6319F7] font-bold mt-8">VS</span>
                                        <Image src={news.image.car2} alt={news.title} width={100} height={100} className=" object-contain  " />
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{news.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">{news.subtitle}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-3 mt-auto">
                                        <Button fullWidth primary>Comparar</Button>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="space-y-6 mt-4">
                <SectionTitle>
                    Ranking por preço
                </SectionTitle>


                {/* Lista */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dataRanking.map((item) => (
                        <Link
                            href={`${pathname}${item.url}`}
                            key={item.id}
                            className="group"
                        >
                            <Card className="relative flex flex-col h-full overflow-hidden transition hover:shadow-lg">

                                {/* Badge posição */}
                                <div className="absolute top-3 left-3 z-10">
                                    <span
                                        className={`
              px-3 py-1 rounded-full text-xs font-semibold
              ${item.position === 1
                                                ? "bg-yellow-400 text-black"
                                                : item.position === 2
                                                    ? "bg-gray-300 text-gray-900"
                                                    : item.position === 3
                                                        ? "bg-orange-300 text-gray-900"
                                                        : "bg-gray-200 text-gray-700"}
            `}
                                    >
                                        {item.position}º lugar
                                    </span>
                                </div>

                                {/* Categoria */}
                                <div className="absolute top-3 right-3 z-10">
                                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                        Hatch
                                    </span>
                                </div>

                                {/* Imagem */}
                                <div className="flex items-center justify-center h-44 bg-gray-50">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={140}
                                        height={140}
                                        className="object-contain transition-transform group-hover:scale-105"
                                    />
                                </div>

                                {/* Conteúdo */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-semibold text-base text-gray-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Ranking de preço
                                    </p>

                                    <div className="mt-auto pt-4">
                                        <Button fullWidth primary>
                                            Ver detalhes
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>

            </div>
            <div className="space-y-6 mt-4">
                <SectionTitle>
                    Últimas Notícias
                </SectionTitle>


                {/* Lista */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.slice(0, 3).map(news => (
                        <Link className="p-0 overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow" href={`${pathname}${news.slug}`} key={news.id}>

                            <Card key={news.id} >
                                <div className="h-48 w-full overflow-hidden relative">
                                    <Image src={news.image} alt={news.title} width={100} height={150} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">{news.category}</span>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{news.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">{news.summary}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-3 mt-auto">
                                        <span>{news.date}</span>
                                        <span className="text-[#6319F7] font-bold flex items-center gap-1">Ler mais <ChevronRight size={12} /></span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};