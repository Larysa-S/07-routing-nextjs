import React from 'react';
import { fetchNoteById } from '@/lib/api';
import NotePreview from '@/components/NotePreview/NotePreview';
import type { Note } from '@/types/note';

interface NotePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NotePage({ params }: NotePageProps) {
  // 1. Очікуємо отримання id з параметрів URL (Next.js 16)
  const resolvedParams = await params;
  const noteId = resolvedParams.id;

  let note: Note | null = null;

  // 2. У try/catch робимо СУТО асинхронний запит до API, без створення JSX
  try {
    note = await fetchNoteById(noteId);
  } catch (error) {
    console.error('Помилка завантаження нотатки:', error);
    note = null; // Переконуємось, що дані відсутні у разі помилки
  }

  // 3. Уся JSX-розмітка будується в одному місці наприкінці функції за допомогою звичайного if/else
  if (!note) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>404 - Note Not Found</h1>
        <p>Sorry, the note you are looking for could not be found or loaded.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <NotePreview note={note} />
    </main>
  );
}
