// app/notes/page.tsx
import { redirect } from 'next/navigation';

export default function NotesPage() {
  // Автоматичний перехід на сторінку з паралельними маршрутами та фільтром
  redirect('/notes/filter/all');
}
