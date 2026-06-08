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
import { useRefresh } from "../RefreshProvider"

export function DeleteModal({
  deleteDialogOpen, setDeleteDialogOpen, bookmarkId
  }: {
  deleteDialogOpen: boolean, 
  setDeleteDialogOpen: (open: boolean) => void, 
  bookmarkId: number,
}) {

  const { refresh } = useRefresh()

  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
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
              setDeleteDialogOpen(false)
              refresh()
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
