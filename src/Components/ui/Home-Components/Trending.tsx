"use client";

const trends = [
  { category: "Technology", tag: "#NextJS15", posts: "12,400", hot: true },
  { category: "Dev",        tag: "#TypeScript", posts: "8,900",  hot: false },
  { category: "Community",  tag: "#BuildInPublic", posts: "5,200", hot: false },
  { category: "Design",     tag: "#OpenSource", posts: "3,100", hot: false },
];

export default function Trending() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 w-full max-w-sm mx-auto">
      <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
        Trending
      </h2>

      <div className="flex flex-col divide-y divide-gray-100">
        {trends.map((trend) => (
          <div
            key={trend.tag}
            className="py-3 first:pt-0 last:pb-0 cursor-pointer group"
          >
            <p className="text-xs text-gray-400 mb-0.5">{trend.category}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900 group-hover:text-blue-500 transition-colors">
                {trend.tag}
              </span>
              {trend.hot && (
                <span className="text-xs font-medium text-blue-500 border border-blue-200 bg-blue-50 rounded-full px-2 py-0.5">
                  Hot
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{trend.posts} posts</p>
          </div>
        ))}
      </div>
    </div>
  );
}