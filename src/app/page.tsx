import { Book } from '@/types'
// import ClientPage from './client'
import dynamic from 'next/dynamic'
import Loading from './loading'
const ClientPage = dynamic(() => import('./client'), {
  ssr: false,
  loading: Loading,
})

const api = {
  book: {
    list: async (): Promise<Book[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            import('@/books.json').then((data) =>
              data.library.map((item) => item.book)
            )
          )
        }, 1500)
      })
    },
  },
}

export default async function IndexPage() {
  const books: Book[] = await api.book.list()
  const genres: Book['genre'][] = Array.from(
    new Set(books.map((book) => book.genre))
  )

  return <ClientPage books={books} genres={genres} />
}
