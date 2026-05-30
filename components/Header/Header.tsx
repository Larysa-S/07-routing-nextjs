import Link from 'next/link'; // Використовуємо компонент від Next.js за умовою
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      {/* Замінюємо <a> на <Link> для оптимізації Next.js */}
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes">Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
