"use client"

import { dataNews } from "@/components/Main/data";
import { NewsList } from "@/components/NewsList";



const noticias = () => {
    const NEWS_DATA = dataNews();
    return (
        <NewsList data={NEWS_DATA} />
    )
}

export default noticias