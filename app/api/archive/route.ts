import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request){
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session?.user){
    throw new Error("Unauthorized")
  }

  const { searchParams } = new URL(req.url)
  const tag = searchParams.get("tag")
  
   const bookmarks = await prisma.bookmark.findMany({
    where: {
      authorId: session?.user.id,
      archived: true,
      ...(tag && {
        tags: {
          some: { title: tag }
        }
      })
    },
    include: { tags: true },
    orderBy: { createdAt: "desc"}
    })

  return NextResponse.json(bookmarks)
}