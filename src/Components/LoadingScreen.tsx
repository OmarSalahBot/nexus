

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f0f0f] flex flex-col items-center justify-center gap-5 transition-colors">

      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <span className="w-3 h-3 rounded-full bg-blue-500" />
        <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Nexus
        </span>
      </div>

      {/* Animated dots */}
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:300ms]" />
      </div>

    </div>
  );
}