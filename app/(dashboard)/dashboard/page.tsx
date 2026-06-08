import SortBtn from "@/components/dashboard/SortBtn"
import { AddBtn } from "@/components/dashboard/AddBtn"
import BookmarkList from "@/components/dashboard/BookmarkList"

const  Dashboard = async () => {

  return (
    <section className="px-6 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">All bookmarks</h1>
        <div className="flex items-center gap-4">
        <AddBtn />
        <SortBtn/>
        </div>
      </div>
      <BookmarkList />
    </section>
  )
}

export default Dashboard