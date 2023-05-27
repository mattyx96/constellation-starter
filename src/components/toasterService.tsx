import { useReactFeatureStore } from '@features/shared';
import { toastStore } from '@features/toast';


export const ToasterService = () => {
  const {toasters} = useReactFeatureStore(toastStore);
  return (
    <div className='fixed right-10 bottom-10 z-50 space-y-2'>
      {toasters.map((toaster, index) => (
        <div
          key={index}
          className={`max-w-sm text-sm text-black rounded-md shadow-lg
          ${toaster.type === 'SUCCESS' && 'bg-green-200'}
          ${toaster.type === 'ERROR' && 'bg-red-400 text-white'}
          ${toaster.type === 'INFO' && 'bg-blue-400 text-white'}
        `}
        >
          <div className='flex p-4'>{toaster.message}</div>
        </div>
      ))}
    </div>
  );
};
