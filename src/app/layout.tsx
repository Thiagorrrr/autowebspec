import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import StyledComponentsRegistry from '@/lib/registry'
import { Providers } from './providers'
import { Header } from '@/components/Header'
import { HeaderMobile } from '@/components/HeaderMobile'
import Main from '@/components/Main'
import { Footer } from '@/components/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auto web spec',
  description: 'Seu site de comparativos de carros',
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
  other: {
    "apple-mobile-web-app-title": "AutoWebSpec",
  },
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head>
        <meta
          name="google-adsense-account"
          content={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_TAG_ADS!}`}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_TAG!} />
        <StyledComponentsRegistry>
          <Providers>
            <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-24 md:pb-0">
              <Header />
              <HeaderMobile />
              <Main>
                {children}
              </Main>
              <Footer />
            </div>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
