'use client'
import { UsersAddress } from '@/payload-types'
import { Loader2, Trash2 } from 'lucide-react'
import { useTransition } from 'react'
import { Button } from '../../../_components/ui/button'
import { useToast } from '../../../_hooks/use-toast'
import { deleteAddress } from '../../../_server/delete-address'

const DeleteButton: React.FC<{
  id: UsersAddress['id']
}> = ({ id }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  return (
    <Button
      className="flex w-full items-center justify-center gap-3"
      variant={'destructive'}
      onClick={() =>
        startTransition(async () => {
          const { success, message } = await deleteAddress(id)
          if (success)
            toast({
              description: message,
            })
        })
      }
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 size={16} /> Delete Address
        </>
      )}
    </Button>
  )
}

export default DeleteButton
