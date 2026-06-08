import { IconFolderCode } from "@tabler/icons-react"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

const  ArchiveEmptyComponent = () => {
  return (
    <Empty className="mt-30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Archived BookMarks Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t archived any BookMarks yet.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export default ArchiveEmptyComponent