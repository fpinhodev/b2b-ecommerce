import SideNav from './_components/SideNav'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex h-screen flex-col py-8 md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow px-6 md:overflow-y-auto md:px-12">{children}</div>
    </div>
  )
}
