import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useGenerateSearchParams(targetUrl?: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (...searchTerm: [name: string, value?: string | number][]) => {
    const params = new URLSearchParams(searchParams.toString());

    for (let [name, value] of searchTerm) {
      if (!value && value !== 0) {
        params.delete(name);
      } else {
        params.set(name, String(value));
      }
    }

    if (!params.toString().length) {
      router.push(targetUrl || pathname);
      return;
    }

    router.push(`${targetUrl || pathname}?${params.toString()}`);
  };
}
