import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: 'Note Details - NoteHub',
};

export default async function NoteDetailPage({ params }: Props) {
  // Налаштовуємо staleTime, щоб дані з сервера вважалися свіжими протягом 1 хвилини
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
