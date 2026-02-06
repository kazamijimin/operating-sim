import { useState, useEffect } from 'react';
import useStore from '../store/useStore';

export default function Taskbar() {
  const { windows, activeWindowId, toggleStartMenu, focusWindow } = useStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900/90 backdrop-blur-md border-t border-gray-700 flex items-center px-2 z-40">
      {/* Start Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleStartMenu();
        }}
        className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-700 transition-colors"
      >
        <span className="text-xl">🪟</span>
      </button>

      {/* Running Apps */}
      <div className="flex-1 flex items-center gap-1 px-2">
        {windows.map((window) => (
          <button
            key={window.id}
            onClick={() => focusWindow(window.id)}
            className={`h-10 px-3 flex items-center gap-2 rounded-lg transition-colors ${
              window.id === activeWindowId 
                ? 'bg-gray-600' 
                : window.minimized 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-700/50 hover:bg-gray-700'
            }`}
          >
            <span>{window.icon}</span>
            <span className="text-white text-sm max-w-32 truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-3 px-3">
        <button className="text-white hover:bg-gray-700 p-1 rounded">🔊</button>
        <button className="text-white hover:bg-gray-700 p-1 rounded">📶</button>
        <button className="text-white hover:bg-gray-700 p-1 rounded">🔋</button>
        
        <div className="text-white text-sm text-right">
          <div>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-xs text-gray-400">{time.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}