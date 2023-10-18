import { useStore } from 'zustand'
import { toastStore } from '@/infrastructure/store/store'

export const Toaster = () => {
  const { toasters } = useStore(toastStore)
  return (
    <div className="fixed bottom-10 right-10 z-50 space-y-2">
      {toasters.map((toaster, index) => (
        <div
          key={index}
          className={`max-w-sm rounded-md text-sm text-black shadow-lg
          ${toaster.type === 'SUCCESS' && 'bg-green-200'}
          ${toaster.type === 'ERROR' && 'bg-red-400 text-white'}
          ${toaster.type === 'INFO' && 'bg-blue-400 text-white'}
        `}
        >
          <div className="flex p-4">{toaster.message}</div>
        </div>
      ))}
    </div>
  )
}
