export default async function Page() {
  // const { locale } = await params
  // const headers = await nextHeaders()
  // const payload = await getPayload({ config: configPromise })
  // const { user } = await payload.auth({ headers })

  // if (!user) return redirect({ href: '/login', locale: locale })

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        Gráficos
        {/* <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        Resumos
        {/* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense> */}
      </div>
    </main>
  )
}
