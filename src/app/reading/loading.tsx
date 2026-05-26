export default function Loading() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-4 h-4 shrink-0" />
        <div className="flex gap-2 flex-1 min-w-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-7 w-14 shrink-0 bg-surface rounded animate-pulse" />
          ))}
        </div>
        <div className="w-4 h-4 shrink-0 bg-surface rounded animate-pulse" />
      </div>
      <div className="space-y-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-5 bg-surface rounded animate-pulse" style={{ width: `${60 + Math.random() * 35}%` }} />
        ))}
      </div>
    </div>
  );
}
