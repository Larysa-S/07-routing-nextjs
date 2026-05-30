export const metadata = {
  title: 'NoteHub - My Notes',
};
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface Props {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function NotesPage({ searchParams }: Props) {
  // Очікуємо отримання параметрів з URL (вимога Next.js 15+)
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  const search = params.search ?? '';
  const perPage = 12;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  // Prefetch робиться саме для тих параметрів, які зараз в URL!
  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
