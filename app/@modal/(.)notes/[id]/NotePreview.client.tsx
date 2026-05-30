'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNoteById } from '@/lib/api';

export default function NotePreviewClient() {
  const router = useRouter();
  const params = useParams();

  // Дістаємо ID на клієнті для синхронізації кешу
  const id = params?.id as string;

  // useQuery миттєво бере дані з HydrationBoundary
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    // ОБОВ'ЯЗКОВА ВИМОГА МЕНТОРА: явно вказуємо false
    refetchOnMount: false,
  });

  // Функція для кнопки закриття
  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {/* ОБОВ'ЯЗКОВА ВИМОГА МЕНТОРА: окрема кнопка закриття всередині модалки */}
      <button
        type="button"
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
        aria-label="Close modal"
      >
        ×
      </button>

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
