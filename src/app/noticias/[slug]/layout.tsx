import { ReactNode } from "react";
import { fetchNews } from "@/lib/api";
import { Metadata } from "next";

export async function generateStaticParams() {
    const NEWS_DATA = await fetchNews();

    return NEWS_DATA?.map(n => ({
        slug: String(n.slug)
    }));
}

type Props = {
    params: { slug: string };
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const titleFromSlug = params.slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

    return {
        title: `${titleFromSlug}`,
        description: `${titleFromSlug}. Confira todos os detalhes, fotos e informações completas sobre esta notícia no portal Auto Web Spec.`,
        alternates: {
            canonical: `https://autowebspec.com.br/noticias/${params.slug}/`,
        },
    };
}


export default function Layout({ children }: {
    children: ReactNode;
}) {
    return children;
}
