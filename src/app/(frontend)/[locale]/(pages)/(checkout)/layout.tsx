import { CheckoutSummary } from './CheckoutSummary'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex h-screen flex-col gap-10 py-8 md:flex-row md:overflow-hidden">
      <div className="flex-grow md:overflow-y-auto">{children}</div>
      <div className="w-full flex-none sm:w-[360px]">
        <CheckoutSummary />
      </div>
    </div>
  )
}
