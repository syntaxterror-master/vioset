"use client";
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import { DeleteModal } from "./DeleteModal";
import { useState } from "react";

const CardBtn = ({ bookmarkId }: { bookmarkId: number   }) => {

    const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PencilIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem 
          className="cursor-pointer" 
          variant="destructive" 
          onClick={() => setDialogOpen(true)}>
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>

      {/* Modals */}
        <DeleteModal 
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          bookmarkId={bookmarkId!}
        />
    </>
  )
}

export default CardBtn