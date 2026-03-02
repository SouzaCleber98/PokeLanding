import { ReactNode } from 'react';

type PokedexMainProps = {
  mainColor: string;
  children: ReactNode;
};

export default function PokedexMain({ children, mainColor }: PokedexMainProps) {
  return (
    <main>
      <div className='border-x-4 border-red-800 bg-red-700'>
        <div className='h-2 bg-red-800' />
      </div>

      <div className='w-full h-full border-2 border-y-0 border-red-800 bg-red-600 px-5 pt-4 pb-6'>
        <div
          className='rounded-xl border-4 border-gray-600 p-4 shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]
        '
          style={{ backgroundColor: mainColor }}
        >
          <div className='mb-2 flex items-center gap-1.5'>
            <span className='h-1.5 w-1.5 rounded-full bg-emerald-400' />

            <span className='h-1.5 w-1.5 rounded-full bg-emerald-400' />
          </div>
          <main> {children}</main>

          <div className='w-full mt-2 flex justify-end'>
            <div className='h-1 w-8 rounded bg-emerald-300' />
          </div>
        </div>
      </div>
    </main>
  );
}
