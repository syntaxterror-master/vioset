'use server'
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"
import ogs from "open-graph-scraper"
import * as cheerio from "cheerio"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({model: "gemini-3.5-flash"})

export async function createBookmark(formData: FormData) {
     const session = await auth.api.getSession({
      headers: await headers()
     })
  
    if(!session?.user) {
      throw new Error("Unauthorized")
    }

    const url = formData.get('url')
    const tag = formData.get('tag')?.toString()

    if(!tag){
      throw new Error("Tag is not defined")
    }
    
    if(!url){
      throw new Error("Wrong URL")
    }
   const options = { url: url.toString() }
    
    try {
    const data = await ogs(options);
    if(!data){
      throw new Error("Error occured while creating BookMark")
    }
    
    const $ = cheerio.load(data.html?.toString() ?? "")
    $("script, style, nav, header, footer").remove()
    const cleanText = $("body").text().replace(/\s+/g, " ").trim().slice(0, 5000)

    const result = await model.generateContent(
    `Generate a concise summary (max 500 characters) for the following webpage content:\n\n${cleanText}`
    )

    if(!result){
      throw new Error("Error occured while creating BookMark")
    }

    const aiSummary = result.response.text()
    
    await prisma.bookmark.create({
      data: {
        title: data.result.ogTitle?.trim() ?? "",
        description: data.result.ogDescription?.trim() ?? "",
        url:  data.result.ogUrl?.trim() || url.toString(),
        authorId: session?.user.id,
        image: data.result.ogImage?.[0].url ?? "",
        content: aiSummary,
        tags: {
          connectOrCreate: {
            where: {
              title_authorId: {
                title: tag,
                authorId: session.user.id
              }
            },
            create: {
              title: tag,
              authorId: session.user.id
            }
          }
        }
      }
    })    
  } catch (error) {
    console.log(error);
  }    
}

export async function deleteBookmark(bookmarkId: number) {
  const session = await auth.api.getSession({
    headers: await headers()
   })

  if(!session?.user) {
    throw new Error("Unauthorized")
  }

  try {

    await prisma.bookmark.update({
      where: {
        id: bookmarkId
      },
      data: {
        tags: {
          set: []
        }
      }
    })

    await prisma.bookmark.delete({
      where: {
        id: bookmarkId
      }
    })

    await prisma.tags.deleteMany({
      where: {
        authorId: session.user.id,
        bookmarks: {
          none: {}
        }
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export async function archiveBookmark(bookmarkId: number) {
  const session = await auth.api.getSession({
    headers: await headers()
   })

  if(!session?.user) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.bookmark.update({
      where: {
        id: bookmarkId
      },
      data: {
        archived: true
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export async function unarchiveBookmark(bookmarkId: number) {
  const session = await auth.api.getSession({
    headers: await headers()
   })

  if(!session?.user) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.bookmark.update({
      where: {
        id: bookmarkId
      },
      data: {
        archived: false
      }
    })
  } catch (error) {
    console.log(error);
  }
}