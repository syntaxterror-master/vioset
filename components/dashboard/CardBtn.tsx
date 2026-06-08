"use client";
import { Archive, PencilIcon, TrashIcon } from "lucide-react"
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
import { DeleteModal } from "./modals/DeleteModal";
import { useState } from "react";
import { ArchiveModal } from "./modals/ArchiveModal";

const CardBtn = ({ bookmarkId, bookmarkArchived }: { bookmarkId: number; bookmarkArchived: boolean }) => {

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);

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
          <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setArchiveDialogOpen(true)}
          >
            <Archive />
            {bookmarkArchived ? "Unarchive" : "Archive"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem 
          className="cursor-pointer" 
          variant="destructive" 
          onClick={() => setDeleteDialogOpen(true)}>
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>

      {/* Modals */}
        <DeleteModal 
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          bookmarkId={bookmarkId!}
        />
        <ArchiveModal 
          archiveDialogOpen={archiveDialogOpen}
          setArchiveDialogOpen={setArchiveDialogOpen}
          bookmarkId={bookmarkId!}
          bookmarkArchived={bookmarkArchived}
        />
    </>
  )
}

export default CardBtn