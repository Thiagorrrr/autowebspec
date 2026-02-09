import ContactPage from "@/components/ContactPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contato | AutoWebSpec",
    description: "Saiba como o autowebspec.com.br protege seus dados e garante sua segurança ao comparar veículos e acompanhar notícias automotivas.",
    alternates: {
        canonical: 'https://autowebspec.com.br/contato/',
    },
};

const contato = () => {
    return (
        <ContactPage />
    )
}

export default contato