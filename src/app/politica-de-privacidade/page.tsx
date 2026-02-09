import PrivacyPolicy from "@/components/PrivacyPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidade | AutoWebSpec",
    description: "Saiba como o autowebspec.com.br protege seus dados e garante sua segurança ao comparar veículos e acompanhar notícias automotivas.",
    alternates: {
        canonical: 'https://autowebspec.com.br/politica-de-privacidade',
    },
};
const politica = () => {
    return (
        <PrivacyPolicy />
    )
}

export default politica