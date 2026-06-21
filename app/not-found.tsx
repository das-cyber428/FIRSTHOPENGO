import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-canvas px-5 pt-24">
      <div className="text-center">
        <p className="font-display text-8xl font-semibold text-gradient">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">This page wandered off.</h1>
        <p className="mt-3 text-ink/60">But hope is never lost — let&apos;s get you back home.</p>
        <Link href="/" className="btn-primary mt-8">Return Home</Link>
      </div>
    </section>
  );
}
