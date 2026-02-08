import AboutUs from "@/components/AboutUs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre Nós| AutoWebSpec",
    description: "Saiba como o autowebspec.com.br protege seus dados e garante sua segurança ao comparar veículos e acompanhar notícias automotivas.",
};

const sobre = () => {
    return (
        <AboutUs />
    )
}

export default sobre