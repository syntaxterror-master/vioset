"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,

} from "@/components/ui/sidebar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "../ui/label";
import { Field, FieldGroup } from "@/components/ui/field"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation";

  interface tags {
    id: number
    title: string
    _count: {
      bookmarks: number
    }
  }

const TagList = () => {
const router = useRouter()
const searchParams = useSearchParams()
const activeTag = searchParams.get("tag")
const pathname = usePathname()

const handleTagClick = (tagTitle: string) => {
  if(activeTag === tagTitle) {
    router.push("/dashboard")
  } else {
    router.push(`/dashboard?tag=${tagTitle}`)
  }
}

const [ tags, setTags ] = useState<tags[]>([])

const totalBookmarks = tags.reduce((sum, t) => sum + (t._count?.bookmarks || 0), 0)

useEffect(() => {
  const isArchived= pathname.includes("archive")
  fetch(`/api/tags?archived=${isArchived}`)
  .then(res => res.json())
  .then(setTags)
}, [pathname])




  return (
              <SidebarGroup>
            <SidebarGroupLabel>Tags</SidebarGroupLabel>
            <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem> 
              <FieldGroup className="mx-auto w-56">
              <RadioGroup className="w-fit">
              
              <div className="flex items-center justify-between w-55">
              <Field orientation="horizontal">
              <div className="flex items-center gap-3">
              <RadioGroupItem
              checked={!activeTag}
              onClick={() => router.push('/dashboard')} 
              value="all"
              id="r1" />
              <Label htmlFor="all">All</Label>
              </div>
              </Field>
              <div className="bg-accent flex items-center justify-center rounded-full h-7 w-7">
              <p>
              {totalBookmarks}
              </p>
              </div>
              
              </div>
              {tags.map((tag) => (
                tag._count.bookmarks > 0 &&           
              <div key={tag.id} className="flex items-center justify-between w-55">
              <Field orientation="responsive">
              <div className="flex items-center gap-3">
              <RadioGroupItem 
              onClick={() => handleTagClick(tag.title)} 
              value={tag.title} 
              id={tag.id.toString()} />
              <Label htmlFor={tag.id.toString()}>{tag.title}</Label>
              </div>
              </Field>
              <div className="bg-accent flex items-center justify-center rounded-full h-7 w-7">
              <p>
              {tag._count.bookmarks}
              </p>
              </div>
              </div>
              ))}
              </RadioGroup>
              </FieldGroup>
              </SidebarMenuItem> 
                   
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
  )
}

export default TagList