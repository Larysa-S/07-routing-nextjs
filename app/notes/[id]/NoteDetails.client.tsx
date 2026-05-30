'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.client.module.css';

export default function NoteDetailsClient() {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    // ДОДАЄМО РЯДОК, ЯКИЙ ВИМАГАЄ МЕНТОР:
    refetchOnMount: false,
  });

  // Опрацювання стану isLoading за технічним завданням
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  // Опрацювання помилки за технічним завданням
  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  // Успішна розмітка картки детального перегляду за технічним завданням
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
