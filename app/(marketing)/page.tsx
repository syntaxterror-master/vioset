import { Button } from "@/components/ui/button"
import Link from "next/link"

const page = () => {
  return (
    <section>
      <Link href="/sign-in">
      <Button className="cursor-pointer">Sign In</Button>
      </Link>

      <Link href="/sign-up">
      <Button className="cursor-pointer">Sign Up</Button>
      </Link>
    </section>
  )
}

export default page