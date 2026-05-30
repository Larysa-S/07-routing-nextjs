'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Імпортуємо Link

import css from './not-found.module.css';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Автоматичний редірект через 3 секунди
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>

      {/* Додаткова кнопка для тих, хто не хоче чекати 3 секунди */}
      <Link href="/" className={css.link}>
        Go Home Instantly
      </Link>
    </div>
  );
};

export default NotFound;
