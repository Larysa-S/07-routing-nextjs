import React from 'react';
import css from './LayoutNotes.module.css';

interface NotesLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode; // Приймаємо паралельний слот сайдбару
  modal: React.ReactNode; // Приймаємо паралельний слот модалки
}

export default function NotesLayout({ children, sidebar, modal }: NotesLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
      {modal}
    </div>
  );
}
