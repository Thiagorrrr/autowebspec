"use client"

import { NewsDetail } from "@/components/NewsDetail"

const noticias = ({ params }: { params: { slug: string } }) => {
    const { slug } = params

    return (
        <NewsDetail newsSlug={slug} />
    )
}

export default noticias