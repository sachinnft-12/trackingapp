import { CustomerLayout } from './CustomerLayout'
import { Head } from '@inertiajs/react'

type Props = {
  creatorUserId: number
}

export default function CustomerShow({ creatorUserId }: Props) {
  return (
    <CustomerLayout creatorUserId={creatorUserId}>
      <Head title="Customer Page" />
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold">Customer Page</h1>
        <p className="text-muted-foreground mt-2">
          Accept cookies in the banner below to activate tracking scripts.
        </p>
      </div>
    </CustomerLayout>
  )
}