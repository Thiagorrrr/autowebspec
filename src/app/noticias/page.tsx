import { NewsList } from "@/components/NewsList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Notícias e Tendências Automotivas",
    description: "Fique por dentro das últimas novidades do mundo automotivo, lançamentos de acessórios, tecnologia e atualizações do mercado."
};
const noticias = () => {
    return (
        <NewsList />
    )
}

export default noticias