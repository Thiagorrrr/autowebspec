import { ReactNode } from "react";
import { fetchNews } from "@/lib/api";

export async function generateStaticParams() {
    const NEWS_DATA = await fetchNews();

    return NEWS_DATA?.map(n => ({
        slug: String(n.slug)
    }));
}


export default function Layout({ children }: {
    children: ReactNode;
}) {
    return children;
}
