'use client'; // Обов'язково для роботи клієнтського роутера

import { useRouter } from 'next/navigation';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function CreateNotePage() {
  const router = useRouter();

  // Функція повернення на сторінку нотаток після успіху чи скасування
  const handleBack = () => {
    router.push('/notes');
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Create New Note</h1>
      {/* Передаємо функцію handleBack у проп onCancel форми */}
      <NoteForm onCancel={handleBack} />
    </main>
  );
}
