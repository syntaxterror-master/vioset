import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex justify-center items-center m-auto min-h-screen">
      <Spinner className="size-8" />
    </div>
  )
}