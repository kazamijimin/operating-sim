import useStore from '../store/useStore';

export default function StartMenu({ apps }) {
  const { openWindow } = useStore();

  return (
    <div 
      className="absolute bottom-14 left-2 w-80 bg-gray-800/95 backdrop-blur-md rounded-xl border border-gray-700 shadow-2xl z-50 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search */}
      <div className="p-4">
        <input 
          type="text" 
          placeholder="Search apps..."
          className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Apps Grid */}
      <div className="px-4 pb-4">
        <h3 className="text-gray-400 text-xs font-semibold mb-3">Pinned</h3>
        <div className="grid grid-cols-4 gap-2">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => openWindow(app)}
              className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="text-2xl">{app.icon}</span>
              <span className="text-white text-xs text-center truncate w-full">{app.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            👤
          </div>
          <span className="text-white text-sm">User</span>
        </div>
        <button className="p-2 hover:bg-gray-700 rounded-lg text-white">
          ⏻
        </button>
      </div>
    </div>
  );
}