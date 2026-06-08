import SortBtn from "@/components/dashboard/SortBtn"
import ArchivedList from "@/components/dashboard/ArchivedList"

const  Archive = async () => {

  return (
    <section className="px-6 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Archived bookmarks</h1>
        <div className="flex items-center gap-4">
        <SortBtn/>
        </div>
      </div>
      <ArchivedList />
    </section>
  )
}

export default Archive