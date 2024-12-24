import { useStore } from 'zustand';
import { toastStore } from '@/infrastructure/toast/toastStore';

export const Toaster = () => {
  const { toasters } = useStore(toastStore);
  return (
    <div className="fixed bottom-0 z-50 m-4 w-screen min-w-40 sm:!bottom-8 sm:!right-8 sm:!m-0 sm:!w-auto">
      {toasters.map((toaster, index) => (
        <div
          key={index}
          className={`body1 max-w-sm rounded-md drop-shadow-xl
          ${toaster.type === 'SUCCESS' && 'bg-core-success-1'}
          ${toaster.type === 'ERROR' && 'bg-core-error-1 text-white'}
          ${toaster.type === 'INFO' && 'bg-background-accent-500'}
        `}
        >
          <div className="flex items-center justify-center p-4">
            {toaster.message}
          </div>
        </div>
      ))}
    </div>
  );
};
