import React, { Suspense } from 'react';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '../../Notes.client';
import Loader from '@/components/Loader/Loader';

interface ContentPageProps {
  params: Promise<{
    slug: string[]; // Чітко приймаємо slug, як просив ментор
  }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function FilteredNotesPage({ params, searchParams }: ContentPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  // 1. Дістаємо перший елемент з масиву slug (наприклад, 'all', 'Work' або 'Personal')
  const currentTag = resolvedParams.slug?.[0] || 'all';

  const page = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;
  const search = resolvedSearchParams.search ?? '';
  const perPage = 12;

  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });

  // 2. Передаємо currentTag у ключ кешу та як параметр фільтрації для API запиту
  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search, currentTag],
    queryFn: () => fetchNotes({ page, perPage, search, tag: currentTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loader message="Filtering your notes..." />}>
        {/* 3. Передаємо поточний тег у клієнтський компонент */}
        <NotesClient currentTag={currentTag} />
      </Suspense>
    </HydrationBoundary>
  );
}
