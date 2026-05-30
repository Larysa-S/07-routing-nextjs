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
  const id = params?.id as string;

  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
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
