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

export function ArchiveModal({ 
  archiveDialogOpen, 
  setArchiveDialogOpen,
  bookmarkId
}: { 
  archiveDialogOpen: boolean, 
  setArchiveDialogOpen: (open: boolean) => void
  bookmarkId: number
}) {

  return (
    <Dialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Archive Bookmark</DialogTitle>
            <DialogDescription>
              Are you sure you want to archive this bookmark? You can always restore it later from the archive section.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
            className="cursor-pointer"
            onClick={async () => {
              archiveBookmark(bookmarkId);
              setArchiveDialogOpen(false);
            }}
            >
              Archive
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
