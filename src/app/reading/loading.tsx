export default function Loading() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16">
      <div className="h-3 w-16 bg-border animate-pulse" />

      <div className="h-3 w-20 bg-border animate-pulse mt-8 mb-5" />
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-4 bg-border animate-pulse" style={{ width: `${55 + i * 15}%` }} />
        ))}
      </div>

      <div className="h-3 w-32 bg-border animate-pulse mt-12 mb-5" />
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-7 w-14 shrink-0 bg-border animate-pulse" />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-12 h-3 shrink-0 bg-border animate-pulse" />
            <div
              className="h-4 bg-border animate-pulse"
              style={{ width: `${50 + ((i * 37) % 40)}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
