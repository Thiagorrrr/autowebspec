import { PropsWithChildren } from 'react'
import './globals.css'  
import GlobalStyles from '@/styles/global'

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  )
}
