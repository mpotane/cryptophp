import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} font-sans bg-gradient-to-b from-gray-900 via-[#2e0e66] to-slate-900`}>
      <Component {...pageProps} />
    </div>
  )
}
