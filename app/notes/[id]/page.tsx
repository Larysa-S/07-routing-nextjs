import React from 'react';
import NoteDetailsClient from './NoteDetails.client';

interface NotePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NotePage({ params }: NotePageProps) {
  // Очікуємо параметри URL для відповідності стандартам Next.js 16
  await params;

  // Просто викликаємо клієнтський компонент, який ментор вимагає бачити в цій папці
  return <NoteDetailsClient />;
}
