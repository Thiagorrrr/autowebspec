import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import StyledComponentsRegistry from '@/lib/registry'
import { Providers } from './providers'
import { Header } from '@/components/Header'
import Main from '@/components/Main'
import { Footer } from '@/components/Footer'
import { CookieBanner } from '@/components/CookieBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Auto Web Spec | Comparativos de Carros",
    template: "%s | Auto Web Spec"
  },
  description: "Encontre a ficha técnica completa e compare o desempenho dos modelos que você deseja.",
  applicationName: 'AutoWebSpec', // Indica o nome do app/site
  authors: [{ name: 'TP' }],
  generator: 'Next.js',
  keywords: ['carros', 'comparativo', 'ficha técnica', 'automóveis'],
  referrer: 'origin-when-cross-origin',
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", rel: "shortcut icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://autowebspec.com.br',
    siteName: 'AutoWebSpec',
    title: 'Auto Web Spec | Comparativos de Carros',
    description: 'Compare especificações técnicas e desempenho de carros lado a lado.',
  },
  other: {
    "apple-mobile-web-app-title": "AutoWebSpec",
  },
  alternates: {
    canonical: 'https://autowebspec.com.br',
  },
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Schema para forçar o Google a reconhecer o nome do site
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AutoWebSpec",
    "alternateName": ["Auto Web Spec", "Auto WebSpec"],
    "url": "https://autowebspec.com.br/"
  }

  return (
    <html lang="pt-br">
      <head>
        <meta
          name="google-adsense-account"
          content={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_TAG_ADS!}`}
        />
        {/* Injeção do Schema WebSite no Head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>
            <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-24 md:pb-0">
              <Header />
              <Main>
                {children}
              </Main>
              <CookieBanner />
              <Footer />
            </div>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}