"use client";
import CardBtn from './CardBtn'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { Eye, Calendar } from "lucide-react"
import { useEffect, useState } from 'react';
import EmptyComponent from './Empty';
import { useSearchParams } from 'next/navigation';

interface Bookmark {
  id: number
  title: string
  url: string
  description: string
  image: string
  previews: number
  createdAt: Date
  tags: []
}

const BookmarkList = () => {

  const searchParams = useSearchParams()
  const activeTag = searchParams.get("tag")
  const [ bookmarks, setBookmarks ] = useState<Bookmark[]>([])

  useEffect(() => {
    const url = activeTag
    ? `/api/bookmark?tag=${activeTag}`
    : "/api/bookmark"

    fetch(url)
    .then(res => res.json())
    .then(setBookmarks)
  }, [activeTag])
  
    return (
      <>
    {bookmarks.length > 0 ? (
    <section  className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 py-8'>
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className='bg-background'>
        <div className='flex p-6 justify-between items-start'>
        <div className='flex gap-5'>
        <div className='rounded-4-xl px-2 rounded-4xl'>
        <Image src={bookmark.image} width={40} height={40} alt='companie logo' />
        </div>
        <div className='flex flex-col'>
        <h3>{bookmark.title}</h3>
        <p>{bookmark.url}</p>
        </div>
        </div>
        <CardBtn 
        bookmarkId={bookmark.id}
        />
        </div>
      <div className='px-6'>
      <Separator/>
      </div>
        <div className='p-6'>
          <p>
            {bookmark.description}
          </p>
          <div className='flex flex-wrap gap-3.5 py-5'>
  
            {bookmark.tags.map((tag: {id: number, title: string}) => (
            <div
            key={tag.id} 
            className='bg-accent w-fit px-3'>
              {tag.title}
            </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className='p-6 flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Eye size={18} />
            <p>{bookmark.previews}</p>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar size={18} />
            <p>
            {new Date(bookmark.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
            </p>
          </div>
        </div>
      </div>
      ))}
      </section>
      )
     : (
        <EmptyComponent />
  )}
  </>
)}

export default BookmarkList

