import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(){
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session?.user){
    throw new Error("Unauthorized")
  }

  const tags = await prisma.tags.findMany({
    where: {authorId: session.user.id},
    include: {
      _count: {
        select: { bookmarks: true }
      }
    }
  })
  return NextResponse.json(tags)
  }