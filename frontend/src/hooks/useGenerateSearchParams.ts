import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useGenerateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (searchTerm: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value && value !== 0) {
      params.delete(searchTerm);
    } else {
      params.set(searchTerm, String(value));
    }

    router.push(`${pathname}?${params.toString()}`);
  };
}
