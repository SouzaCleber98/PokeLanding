export default function PokedexFooter() {
  return (
    <div className='border-2 border-t-0 border-red-800 bg-red-600'>
      <div className=' flex items-center justify-between px-2 pb-4'>
        <div className='relative h-16 w-16'>
          <div className='absolute top-0 left-1/2 h-5 w-5 -translate-x-1/2 rounded-t-sm bg-gray-800' />
          <div className='absolute bottom-0 left-1/2 h-5 w-5 -translate-x-1/2 rounded-b-sm bg-gray-800' />
          <div className='absolute top-1/2 left-0 h-5 w-5 -translate-y-1/2 rounded-l-sm bg-gray-800' />
          <div className='absolute top-1/2 right-0 h-5 w-5 -translate-y-1/2 rounded-r-sm bg-gray-800' />
          <div className='absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 bg-gray-800' />
        </div>

        <div className='flex flex-col gap-1.5'>
          <div className='h-0.5 w-12 rounded bg-red-800/40' />
          <div className='h-0.5 w-12 rounded bg-red-800/40' />
          <div className='h-0.5 w-12 rounded bg-red-800/40' />
          <div className='h-0.5 w-12 rounded bg-red-800/40' />
        </div>

        <div className='flex gap-3'>
          <span className='h-5 w-5 rounded-full border-2 border-red-400 bg-red-300 shadow-[inset_0_-2px_3px_rgba(0,0,0,0.15)]' />
          <span className='h-5 w-5 rounded-full border-2 border-blue-400 bg-blue-300 shadow-[inset_0_-2px_3px_rgba(0,0,0,0.15)]' />
        </div>
      </div>
    </div>
  );
}
