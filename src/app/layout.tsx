import type { Metadata } from "next";
import { Instrument_Serif, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import ConditionalPageBlur from "@/components/ConditionalPageBlur"

const hkGrotesk = Montserrat({
  weight: ['400'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-hk-grotesk',
  display: 'swap',
})


const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-instrument-serif'
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Yuvraj Sharma',
  description: 'AI engineer and full‑stack developer. I build products end‑to‑end.',
  openGraph: {
    url: 'http://localhost:3000/',
    siteName: 'Yuvraj Sharma Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{
      url: '/open-graph.png',
      width: 1200,
      height: 630,
      alt: 'Yuvraj Sharma - Portfolio'
    }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="tMCNs2fgM6voEHBd3JsySffMFSiUCQDEFEF1iYI3-ZQ" />
      </head>
      <body className={`${instrumentSerif.variable} ${hkGrotesk.variable}`} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10">
            {children}
          </div>
          <ConditionalPageBlur />
        </ThemeProvider>
      </body>
    </html>
  );
}
