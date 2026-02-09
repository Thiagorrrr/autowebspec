import TermsOfUse from "@/components/TermsOfUse";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Termos de uso| AutoWebSpec",
    description: "Saiba como o autowebspec.com.br protege seus dados e garante sua segurança ao comparar veículos e acompanhar notícias automotivas.",
    alternates: {
        canonical: 'https://autowebspec.com.br/termos-de-uso',
    },
};

const termos = () => {
    return (
        <TermsOfUse />
    )
}

export default termos