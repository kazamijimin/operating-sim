import { useState } from 'react';

const fileSystem = {
  'Desktop': ['photo.jpg', 'document.pdf', 'project.zip'],
  'Documents': ['resume.docx', 'notes.txt', 'budget.xlsx'],
  'Downloads': ['installer.exe', 'music.mp3', 'video.mp4'],
  'Pictures': ['vacation.jpg', 'family.png', 'screenshot.png'],
  'Music': ['song1.mp3', 'song2.mp3', 'album/'],
};

export default function FileExplorer() {
  const [currentPath, setCurrentPath] = useState('Desktop');
  
  return (
    <div className="h-full flex flex-col text-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-700 bg-gray-800">
        <button className="p-1 hover:bg-gray-700 rounded">←</button>
        <button className="p-1 hover:bg-gray-700 rounded">→</button>
        <button className="p-1 hover:bg-gray-700 rounded">↑</button>
        <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-sm">
          C:\Users\User\{currentPath}
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-700 p-2 bg-gray-800/50">
          <div className="text-xs text-gray-400 mb-2">Quick Access</div>
          {Object.keys(fileSystem).map((folder) => (
            <button
              key={folder}
              onClick={() => setCurrentPath(folder)}
              className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-700 flex items-center gap-2 ${
                currentPath === folder ? 'bg-gray-700' : ''
              }`}
            >
              📁 {folder}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-4 gap-4">
            {fileSystem[currentPath]?.map((file) => (
              <div
                key={file}
                className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-700 cursor-pointer"
              >
                <span className="text-3xl">
                  {file.endsWith('/') ? '📁' : 
                   file.endsWith('.jpg') || file.endsWith('.png') ? '🖼️' :
                   file.endsWith('.mp3') ? '🎵' :
                   file.endsWith('.mp4') ? '🎬' :
                   file.endsWith('.pdf') ? '📕' :
                   file.endsWith('.docx') || file.endsWith('.txt') ? '📄' :
                   file.endsWith('.xlsx') ? '📊' :
                   file.endsWith('.exe') ? '⚙️' :
                   file.endsWith('.zip') ? '🗜️' : '📄'}
                </span>
                <span className="text-xs text-center truncate w-full">{file}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-gray-800 border-t border-gray-700 px-3 flex items-center text-xs text-gray-400">
        {fileSystem[currentPath]?.length} items
      </div>
    </div>
  );
}