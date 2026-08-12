import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      {/* Gradient number */}
      <p className="text-[12rem] font-extrabold leading-none tracking-tighter bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#EC4899] bg-clip-text text-transparent select-none md:text-[16rem]">
        404
      </p>

      <h1 className="mt-4 text-3xl font-bold text-[#151c27] md:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-base text-[#4a4455] leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all"
        >
          Go Home
        </Link>
        <Link
          href="/find-creators"
          className="inline-flex items-center gap-2 rounded-full border border-[#ccc3d8]/60 bg-white px-7 py-3.5 text-sm font-semibold text-[#151c27] shadow-sm hover:border-[#7C3AED] hover:text-[#630ed4] transition-all"
        >
          Find Creators
        </Link>
      </div>
    </main>
  );
}
