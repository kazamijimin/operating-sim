import { useState } from 'react';
import Taskbar from './Taskbar';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import StartMenu from './StartMenu';
import useStore from '../store/useStore';

import FileExplorer from './apps/FileExplorer';
import Notepad from './apps/Notepad';
import Calculator from './apps/Calculator';
import Terminal from './apps/Terminal';
import Settings from './apps/Settings';
import Browser from './apps/Browser';

const desktopApps = [
  { id: 'explorer', title: 'File Explorer', icon: '📁', component: FileExplorer },
  { id: 'notepad', title: 'Notepad', icon: '📝', component: Notepad },
  { id: 'calculator', title: 'Calculator', icon: '🔢', component: Calculator, width: 320, height: 480 },
  { id: 'terminal', title: 'Terminal', icon: '💻', component: Terminal },
  { id: 'browser', title: 'Browser', icon: '🌐', component: Browser, width: 900, height: 600 },
  { id: 'settings', title: 'Settings', icon: '⚙️', component: Settings },
];

export default function Desktop() {
  const { windows, activeWindowId, startMenuOpen, closeStartMenu } = useStore();
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    setContextMenu(null);
    if (startMenuOpen) closeStartMenu();
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-cover bg-center select-none"
      style={{ 
        backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      {/* Desktop Icons */}
      <div className="p-4 grid grid-cols-1 gap-2 w-24">
        {desktopApps.map((app) => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Window 
          key={window.id} 
          window={window}
          isActive={window.id === activeWindowId}
        />
      ))}

      {/* Start Menu */}
      {startMenuOpen && <StartMenu apps={desktopApps} />}

      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="absolute bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 min-w-48 z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm">
            View
          </button>
          <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm">
            Sort by
          </button>
          <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm">
            Refresh
          </button>
          <hr className="border-gray-600 my-1" />
          <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm">
            New Folder
          </button>
          <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-sm">
            Display Settings
          </button>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}