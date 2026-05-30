'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchNotes } from '@/lib/api';

import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import EmptyState from '@/components/EmptyState/EmptyState';

import css from './Notes.client.module.css';

const PER_PAGE = 12;

export default function NotesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Беремо значення прямо з URL
  const urlPage = Number(searchParams.get('page')) || 1;
  const urlSearch = searchParams.get('search') || '';

  // 2. Ініціалізуємо локальний стейт один раз з URL-параметра (БЕЗ useEffect)
  const [localSearch, setLocalSearch] = useState<string>(urlSearch);

  // 3. ДОДАНО: Стейт для відслідковування чи відкрите модальне вікно
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Функція для оновлення URL параметрів
  const updateUrl = (newPage: number, newSearch: string) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set('page', newPage.toString());
    if (newSearch.trim()) params.set('search', newSearch.trim());

    router.push(`/notes?${params.toString()}`);
  };

  const debouncedUpdateUrl = useDebouncedCallback((value: string) => {
    updateUrl(1, value);
  }, 500);

  const handleSearchChange = (value: string): void => {
    setLocalSearch(value);
    debouncedUpdateUrl(value);
  };

  const handleClearSearch = (): void => {
    setLocalSearch('');
    updateUrl(1, '');
  };

  // Запит до TanStack Query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['notes', urlPage, urlSearch],
    queryFn: () => fetchNotes({ page: urlPage, perPage: PER_PAGE, search: urlSearch }),
    placeholderData: previousData => previousData,

    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ? Number(data.totalPages) : 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Додаємо key={urlSearch}, щоб компонент SearchBox скидався, коли змінюється URL */}
        <SearchBox key={urlSearch} value={localSearch} onChange={handleSearchChange} />

        {!isLoading && !isError && totalPages > 1 && (
          <Pagination
            currentPage={urlPage}
            totalPages={totalPages}
            onPageChange={p => updateUrl(p, urlSearch)}
          />
        )}

        {/* ВИПРАВЛЕНО: Замість alert тепер відкриваємо стейт модалки */}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <div>
        {isLoading && <Loader message="Fetching your notes from NoteHub..." />}

        {isError && (
          <ErrorMessage message="Failed to load notes. Check your token." onRetry={refetch} />
        )}

        {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}

        {!isLoading && !isError && notes.length === 0 && (
          <EmptyState isSearchActive={urlSearch.length > 0} onClearSearch={handleClearSearch} />
        )}
      </div>

      {/* ДОДАНО: Модальне вікно, яке рендерить твою форму створення нотатки */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
