import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>FOV Returns manager</h1>
      <nav>
        <Link href="/new">New Return</Link>
        <Link href="/overview">Overview of Returns</Link>
      </nav>
    </main>
  );
}
