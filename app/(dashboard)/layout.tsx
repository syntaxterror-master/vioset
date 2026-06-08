import { ApplicationShell } from "@/components/dashboard/Sidebar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { RefreshProvider } from "@/components/dashboard/RefreshProvider"

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
     const session = await auth.api.getSession({
      headers: await headers()
     })

  if (!session) {
    redirect("/")
  }

  return (
      <main>
        <RefreshProvider>
        <ApplicationShell>
          {children}
        </ApplicationShell>
        </RefreshProvider>
      </main>
  )
}