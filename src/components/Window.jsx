import { Rnd } from 'react-rnd';
import useStore from '../store/useStore';

export default function Window({ window, isActive }) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } = useStore();

  if (window.minimized) return null;

  const Component = window.component;

  return (
    <Rnd
      default={{
        x: window.x,
        y: window.y,
        width: window.width,
        height: window.height,
      }}
      position={window.maximized ? { x: 0, y: 0 } : undefined}
      size={window.maximized ? { width: '100%', height: 'calc(100vh - 48px)' } : undefined}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-header"
      disableDragging={window.maximized}
      enableResizing={!window.maximized}
      onDragStop={(e, d) => updateWindowPosition(window.id, d.x, d.y)}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWindowSize(window.id, ref.offsetWidth, ref.offsetHeight);
        updateWindowPosition(window.id, position.x, position.y);
      }}
      style={{ zIndex: isActive ? 30 : 20 }}
      onClick={() => focusWindow(window.id)}
    >
      <div className={`h-full flex flex-col rounded-lg overflow-hidden shadow-2xl border ${
        isActive ? 'border-blue-500/50' : 'border-gray-600'
      }`}>
        {/* Title Bar */}
        <div className={`window-header h-10 flex items-center justify-between px-3 cursor-move ${
          isActive ? 'bg-gray-800' : 'bg-gray-900'
        }`}>
          <div className="flex items-center gap-2">
            <span>{window.icon}</span>
            <span className="text-white text-sm font-medium">{window.title}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-600 text-gray-300"
            >
              ─
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-600 text-gray-300"
            >
              □
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-500 text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 bg-gray-900 overflow-auto">
          <Component />
        </div>
      </div>
    </Rnd>
  );
}