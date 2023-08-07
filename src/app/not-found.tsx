import Link from "next/link";

export default function Home(): React.JSX.Element {
  return (
    <main className="container">
      <div className="flex flex-col h-[80svh] items-center justify-center">
        <h1 className="text-3xl">404</h1>
        Page Not Found
        <Link href="/" className="text-slate-700 underline mt-3">
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
