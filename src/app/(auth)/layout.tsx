import Header from '@/components/header/header';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />

      <section className='w-screen h-screen flex flex-col justify-center items-center'>
        {children}
      </section>
    </main>
  );
}
