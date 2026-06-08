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
import { deleteBookmark } from "@/app/actions/bookmark"

export function DeleteModal({
  dialogOpen, setDialogOpen, bookmarkId 
  }: {
  dialogOpen: boolean, 
  setDialogOpen: (open: boolean) => void, 
  bookmarkId: number
}) {

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Bookmark</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this bookmark? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
            className="cursor-pointer" 
            onClick={() => {
              deleteBookmark(bookmarkId)
              setDialogOpen(false)
            }}
            variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
