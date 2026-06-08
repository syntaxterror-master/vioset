import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { createBookmark } from "@/app/actions/bookmark"

export function AddBtn() {

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="cursor-pointer" variant="outline">
            <Plus />
            Add BookMark
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
      <form action={createBookmark}>
          <DialogHeader>
            <DialogTitle>Add BookMark</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-10">

          <Field>
          <FieldLabel htmlFor="url">
          Webhook URL{" "}
          </FieldLabel>
          <Input
          id="url"
          name="url"
          type="url"
          placeholder="https://www.vioset.com/contacts"
          />
          </Field>

        <Field>
              <Select name="tag">
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Add Tag" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tags</SelectLabel>
          <SelectItem value="apple">Some</SelectItem>
          <SelectItem value="banana">Tags</SelectItem>
          <SelectItem value="blueberry">Not</SelectItem>
          <SelectItem value="grapes">Working</SelectItem>
          <SelectItem value="pineapple">Well</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </Field>


          </FieldGroup>
          <DialogFooter className="mt-10">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              <Plus />
              Add BookMark
              </Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  )
}
