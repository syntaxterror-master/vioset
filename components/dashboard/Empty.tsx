import { IconFolderCode } from "@tabler/icons-react"
import { AddBtn } from "./modals/CreateModal"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

const  EmptyComponent = () => {
  return (
    <Empty className="mt-30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No BookMarks Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any BookMarks yet. Get started by creating
          your first BookMark.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2"> 
        <AddBtn />
      </EmptyContent>
    </Empty>
  )
}

export default EmptyComponent