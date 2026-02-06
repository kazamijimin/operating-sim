import { useState } from 'react';

export default function Notepad() {
  const [content, setContent] = useState('');

  return (
    <div className="h-full flex flex-col">
      {/* Menu */}
      <div className="flex gap-4 px-3 py-1 bg-gray-800 border-b border-gray-700 text-sm">
        <button className="text-gray-300 hover:text-white">File</button>
        <button className="text-gray-300 hover:text-white">Edit</button>
        <button className="text-gray-300 hover:text-white">Format</button>
        <button className="text-gray-300 hover:text-white">View</button>
        <button className="text-gray-300 hover:text-white">Help</button>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing..."
        className="flex-1 bg-gray-900 text-white p-4 outline-none resize-none font-mono text-sm"
      />
      
      <div className="h-6 bg-gray-800 border-t border-gray-700 px-3 flex items-center justify-between text-xs text-gray-400">
        <span>Ln 1, Col 1</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}