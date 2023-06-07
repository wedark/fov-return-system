import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>some dicks</h1>
      <nav>
        <Link href="/new">New Return</Link>
        <Link href="/overview">Overview of Returns</Link>
      </nav>
    </div>
  );
}
