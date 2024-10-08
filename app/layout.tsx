import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import localFont from "next/font/local"

const inter = Inter({ subsets: ["latin"] })

const local = localFont({
  src: [
    {
      path: "../fonts/NeueMachina-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NeueMachina-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/NeueMachina-Ultrabold.otf",
      weight: "800",
      style: "normal",
    },
  ],

  display: "swap",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${local.className} bg-white dark:bg-black`}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  )
}
