import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Book's list App",
  description: 'Libreria online',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <main className="px-4 grid min-h-screen max-w-screen-lg m-auto grid-rows-[68px,1fr,68px] gap-4">
          <nav className="flex items-center text-2xl">Book&apos;s list App</nav>
          <section>{children}</section>
          <footer className="flex items-center justify-center">
            Creado por @joarieldev
          </footer>
        </main>
      </body>
    </html>
  )
}
