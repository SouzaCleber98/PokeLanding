export default function PokedexHeader() {
  return (
    <div>
      <div className='border-2 border-b-0 border-red-800 bg-red-600 px-5 pt-5 pb-4'>
        <div className='flex items-center gap-2'>
          <div className='led-pulse flex h-12 w-12 items-center justify-center rounded-full border-4 border-sky-600 bg-sky-300 shadow-[inset_0_-4px_6px_rgba(0,0,0,0.15)]'>
            <div className='h-5 w-5 rounded-full bg-sky-100 opacity-70' />
          </div>

          <div className='ml-2 flex items-center gap-2'>
            <span className='h-3 w-3 rounded-full border border-red-400 bg-red-300 shadow-[0_0_4px_rgba(239,68,68,0.6)]' />
            <span className='h-3 w-3 rounded-full border border-yellow-400 bg-yellow-300 shadow-[0_0_4px_rgba(234,179,8,0.6)]' />
            <span className='h-3 w-3 rounded-full border border-green-400 bg-green-400 shadow-[0_0_4px_rgba(34,197,94,0.6)]' />
          </div>
        </div>
      </div>
    </div>
  );
}
