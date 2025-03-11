import { PageArgs } from '../../[slug]/page'
import CreateAccountForm from './CreateAccountForm'

export default async function Page({ params: params }: PageArgs) {
  const { locale } = await params
  // console.log('«« LOGIN »»')
  // const headers = await nextHeaders()
  // const payload = await getPayload({ config: configPromise })
  // const user = await payload.auth({ headers })
  // console.log('«« LOGIN AUTH »»', user)

  // try {
  //   const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   const data = await req.json()
  //   console.log('«« LOGIN ME »»', data)
  // } catch (err) {
  //   console.log(err)
  // }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">CREATE ACCOUNT</h2>
      <CreateAccountForm locale={locale} />
    </div>
    // <Fragment>
    //   <HydrateClientUser permissions={permissions} user={user} />
    //   <Gutter className={classes.account}>
    //     <RenderParams className={classes.params} />
    //     <h1>Account</h1>
    //     <p>
    //       {`This is your account dashboard. Here you can update your account information and more. To manage all users, `}
    //       <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/users`}>
    //         login to the admin dashboard
    //       </Link>
    //       .
    //     </p>
    //     <AccountForm />
    //     <Button appearance="secondary" href="/logout" label="Log out" />
    //   </Gutter>
    // </Fragment>
  )
}
