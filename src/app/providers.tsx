"use client"
import { PropsWithChildren, useState } from 'react'
import './globals.css'
import GlobalStyles from '@/styles/global'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>

    </>
  )
}
