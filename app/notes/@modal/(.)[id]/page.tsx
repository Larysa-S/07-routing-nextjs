'use client';

'use client'; // ОБОВ'ЯЗКОВО додаємо для роботи хуків у Next.js

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNoteById } from '@/lib/api';

export default function NotePreviewModalPage() {
  const router = useRouter();
  const params = useParams();

  // Безпечно дістаємо id з параметрів клієнтського роутера
  const id = params?.id as string;

  // Використовуємо React Query для отримання даних нотатки
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id, // запит піде тільки якщо id існує
  });

  // Функція закриття через історію браузера за ТЗ
  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {isLoading ? (
        <p>Loading note...</p>
      ) : note ? (
        <NotePreview note={note} />
      ) : (
        <p>Note not found.</p>
      )}
    </Modal>
  );
}
