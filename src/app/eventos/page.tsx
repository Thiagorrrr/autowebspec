import { EventsCalendar } from "@/components/EventsCalendar"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Eventos e Encontros Automotivos",
    description: "Calendário completo de feiras de acessórios, exposições de carros modificados e eventos do setor automotivo em todo o Brasil.", alternates: {
        canonical: 'https://autowebspec.com.br/eventos/',
    },
};
const eventos = () => {
    return (
        <EventsCalendar />
    )
}

export default eventos