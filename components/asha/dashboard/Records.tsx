export default function Records() {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 h-[270px]">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-[#1f2a44]">
          Records
        </h2>

        <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium">
          This Month
        </button>

      </div>

      <div className="h-full flex items-center justify-center text-gray-400 text-lg">
        Charts Coming Soon
      </div>

    </div>
  );
}