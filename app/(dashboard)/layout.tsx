import { ApplicationShell } from "@/components/dashboard/Sidebar"

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
      <main>
        <ApplicationShell>
          {children}
        </ApplicationShell>
      </main>
  )
}