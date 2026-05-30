import React, { Suspense } from 'react'; // <-- 1. ДОДАЄМО СЮДИ ІМПОРТ Suspense
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '../../Notes.client';
import Loader from '@/components/Loader/Loader'; // Можна використати ваш лоадер

interface ContentPageProps {
  params: Promise<{
    tag?: string[];
  }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function FilteredNotesPage({ params, searchParams }: ContentPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const currentTag = resolvedParams.tag?.[0] || 'all';
  const page = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;
  const search = resolvedSearchParams.search ?? '';
  const perPage = 12;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search, currentTag],
    queryFn: () => fetchNotes({ page, perPage, search, tag: currentTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* 2. Огортаємо в Suspense для безпечної роботи useSearchParams на клієнті */}
      <Suspense fallback={<Loader message="Preparing your workspace..." />}>
        <NotesClient currentTag={currentTag} />
      </Suspense>
    </HydrationBoundary>
  );
}
