"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"


const SortBtn = () => {
  return (
       <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <ArrowUpDown />
          Sort By
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem className="cursor-pointer" value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="cursor-pointer" value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="cursor-pointer" value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortBtn