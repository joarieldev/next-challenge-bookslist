'use client'
import data from '@/books.json'
import { useEffect, useMemo, useState } from 'react'

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
const api = {
  readList: {
    update: (readList: Set<Book['ISBN']>)=>{
      const array = Array.from(readList)
      window.localStorage.setItem('readList', JSON.stringify(array))
    },
    onCahnge: (callback: (readList: Set<Book['ISBN']>) => void) => {
      const getReadList = () => {
        const array = JSON.parse(window.localStorage.getItem('readList') ?? '')
        const set = new Set<Book['ISBN']>(array)
        callback(set)
      }
      window.addEventListener('storage', getReadList)
      getReadList()
      return () => window.removeEventListener('storage', getReadList)
    }
  }
}

export default function Home() {
  const [genre, setGenre] = useState<string>('')
  const [readList, setReadList] = useState<Set<Book['ISBN']>>(new Set())
  const matches = useMemo(() => {
    if (!genre) return books
    return books.filter((book) => {
      if (book.genre !== genre) return false
      return true
    })
  }, [genre])

  const handleBookClick = (book: Book['ISBN']) => {
    const draft = structuredClone(readList)
    if (draft.has(book)) {
      draft.delete(book)
    } else {
      draft.add(book)
    }
    setReadList(draft)
    api.readList.update(draft)
  }
  useEffect(() => {
    const unsuscribe = api.readList.onCahnge(setReadList)
    return () => unsuscribe()
  }, [])
  return (
    <article className="grid gap-4">
      <nav>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border rounded p-2 border-gray-600 hover:border-gray-500 max-w-56 w-full cursor-pointer outline-none"
        >
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </nav>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 max-sm:grid-cols-2">
        {matches.map((book) => (
          <li
            key={book.ISBN}
            className="grid gap-2 cursor-pointer group"
            onClick={() => handleBookClick(book.ISBN)}
          >
            <img
              src={book.cover}
              alt={book.title}
              className="aspect-[9/14] group-hover:scale-[1.025] duration-500 transition ease-in-out"
            />
            <p className="flex justify-between">
              {book.title}
              {readList.has(book.ISBN) && <span>⭐</span>}
            </p>
          </li>
        ))}
      </ul>
    </article>
  )
}
