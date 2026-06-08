import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Eye, Calendar } from "lucide-react"
import prisma from '@/lib/prisma'

const page = async ({ params }: {params: Promise<{ id: string }>}) => {

const { id } = await params

const bookmark = await prisma.bookmark.findUnique({
  where: {
    id: parseInt(id)
  },
  include: {
    tags: true
  }
})

  return (
        <div className='bg-background min-h-screen'>
        <div className='flex p-6 justify-between items-start'>
        <div className='flex gap-5'>
        <div className='rounded-4-xl px-2 rounded-4xl'>
        <Image src={bookmark?.image} width={40} height={40} alt='companie logo' />
        </div>
        <div className='flex flex-col'>
        <h3>{bookmark?.title}</h3>
        <p>{bookmark?.url}</p>
        </div>
        </div>
        </div>
      <div className='px-6'>
      <Separator/>
      </div>
        <div className='p-6'>
          <p>
            {bookmark?.description}
          </p>
          <div className='flex flex-wrap gap-3.5 py-5'>
  
            {bookmark?.tags.map((tag: {id: number, title: string}) => (
            <div
            key={tag.id} 
            className='bg-accent w-fit px-3'>
              {tag.title}
            </div>
            ))}
          </div>

        <div>
          {bookmark?.content && (
            <div className='bg-secondary p-4 rounded-lg'>
              <h4 className='text-sm font-medium mb-2'>Extracted Content:</h4>
              <p className='text-sm text-muted-foreground'>{bookmark?.content}</p>
            </div>
          )}
        </div>

        </div>
        <Separator />
        <div className='p-6 flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Eye size={18} />
            <p>{bookmark?.previews}</p>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar size={18} />
            <p>
            {bookmark?.createdAt && new Date(bookmark?.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
            </p>
          </div>
        </div>
      </div>
  )
}

export default page