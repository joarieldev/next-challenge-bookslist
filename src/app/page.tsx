'use client'
import data from '@/books.json'
import { useMemo, useState } from 'react'

export interface Book {
  title: string
  pages: number
  genre: string
  cover: string
  synopsis: string
  year: number
  ISBN: string
  author: Author
}

export interface Author {
  name: string
  otherBooks: string[]
}

const books: Book[] = data.library.map((item) => item.book)
const genres: Book['genre'][] = Array.from(
  new Set(books.map((book) => book.genre))
)

export default function Home() {
  const [genre, setGenre] = useState<string>('')
  const matches = useMemo(() => {
    if (!genre) return books
    return books.filter((book) => {
      if (book.genre !== genre) return false
      return true
    })
  }, [genre])

  return (
    <article className="grid gap-4">
      <nav>
        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="border rounded p-2 border-gray-600 hover:border-gray-500 max-w-56 w-full cursor-pointer outline-none">
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </nav>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4">
        {matches.map((book) => (
          <li
            key={book.ISBN}
            className="grid gap-2"
          >
            <img src={book.cover} alt={book.title} className="aspect-[9/14]" />
            <p className="flex">
              {book.title}
            </p>
          </li>
        ))}
      </ul>
    </article>
  )
}
