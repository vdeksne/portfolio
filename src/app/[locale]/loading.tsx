export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 md:px-12 lg:px-16">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-2/3 rounded bg-white/5" />
        <div className="h-5 w-1/2 rounded bg-white/5" />
        <div className="h-5 w-1/3 rounded bg-white/5" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="h-56 rounded-xl bg-white/5" />
          <div className="h-56 rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}

