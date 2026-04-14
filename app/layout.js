import './globals.css'
import { Inter } from 'next/font/google'
import GlobalSpotlight from '../components/GlobalSpotlight'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Haram Yoon | Portfolio',
  description: 'Portfolio Website by Haram Yoon',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍜</text></svg>',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalSpotlight />
        {children}
      </body>
    </html>
  )
}
