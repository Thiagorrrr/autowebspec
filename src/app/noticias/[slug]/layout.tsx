import { ReactNode } from "react";
import { dataNews } from "@/components/Main/data";

export function generateStaticParams() {
    const NEWS_DATA = dataNews();

    return NEWS_DATA.map(n => ({
        slug: String(n.slug)
    }));
}


export default function Layout({ children }: {
    children: ReactNode;
}) {
    return children;
}
