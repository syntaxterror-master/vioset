import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { archiveBookmark } from "@/app/actions/bookmark"
import { unarchiveBookmark } from "@/app/actions/bookmark"

export function ArchiveModal({ 
  archiveDialogOpen, 
  setArchiveDialogOpen,
  bookmarkId,
  bookmarkArchived
}: { 
  archiveDialogOpen: boolean, 
  setArchiveDialogOpen: (open: boolean) => void
  bookmarkId: number
  bookmarkArchived: boolean
}) {

  return (
    <Dialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{bookmarkArchived ? "Unarchive" : "Archive"} Bookmark</DialogTitle>
            <DialogDescription>
              Are you sure you want to {bookmarkArchived ? "unarchive" : "archive"} this bookmark? You can always restore it later from the archive section.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
            className="cursor-pointer"
            onClick={async () => {
              if (bookmarkArchived) {
                await unarchiveBookmark(bookmarkId);
              } else {
                await archiveBookmark(bookmarkId);
              }
              setArchiveDialogOpen(false);
            }}
            >
              {bookmarkArchived ? "Unarchive" : "Archive"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
