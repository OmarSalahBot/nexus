export default function PostCardSkeleton() {
  return (
    <div className="p-4 border-b border-gray-100 dark:border-white/10 rounded-t-4xl  bg-white dark:bg-[#1a1a1a]">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse shrink-0" />
        <div className="space-y-2">
          <div className="w-28 h-3.5 rounded-md bg-gray-200 dark:bg-white/10 animate-pulse" />
          <div className="w-20 h-3 rounded-md bg-gray-200 dark:bg-white/10 animate-pulse" />
        </div>
      </div>

      {/* Text lines */}
      <div className="space-y-2 mb-4">
        <div className="w-full h-3 rounded-md bg-gray-200 dark:bg-white/10 animate-pulse" />
        <div className="w-3/4 h-3 rounded-md bg-gray-200 dark:bg-white/10 animate-pulse" />
      </div>

      {/* Image */}
      <div className="w-full h-56 rounded-xl bg-gray-200 dark:bg-white/10 animate-pulse mb-4" />

      {/* Actions */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-3 rounded-md bg-gray-200 dark:bg-white/10 animate-pulse" />
        <div className="w-10 h-3 rounded-md bg-gray-200 dark:bg-white/10 animate-pulse" />
      </div>

    </div>
  );
}