import { useState } from 'react';

export default function Browser() {
  const [url, setUrl] = useState('https://example.com');
  const [tabs, setTabs] = useState([{ id: 1, title: 'New Tab', url: 'https://example.com' }]);
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Tab Bar */}
      <div className="flex items-center bg-gray-800 px-2 pt-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm cursor-pointer ${
              activeTab === tab.id ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700/50'
            }`}
          >
            <span className="max-w-32 truncate">{tab.title}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (tabs.length > 1) {
                  setTabs(tabs.filter(t => t.id !== tab.id));
                  if (activeTab === tab.id) setActiveTab(tabs[0].id);
                }
              }}
              className="hover:bg-gray-600 rounded p-0.5"
            >
              ✕
            </button>
          </div>
        ))}
        <button 
          onClick={() => {
            const newId = Math.max(...tabs.map(t => t.id)) + 1;
            setTabs([...tabs, { id: newId, title: 'New Tab', url: '' }]);
            setActiveTab(newId);
          }}
          className="px-3 py-1 hover:bg-gray-700 rounded ml-1"
        >
          +
        </button>
      </div>

      {/* URL Bar */}
      <div className="flex items-center gap-2 p-2 bg-gray-700">
        <button className="p-2 hover:bg-gray-600 rounded">←</button>
        <button className="p-2 hover:bg-gray-600 rounded">→</button>
        <button className="p-2 hover:bg-gray-600 rounded">↻</button>
        
        <div className="flex-1 flex items-center bg-gray-800 rounded-full px-4 py-2">
          <span className="text-gray-400 mr-2">🔒</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Search or enter URL"
          />
        </div>
        
        <button className="p-2 hover:bg-gray-600 rounded">⭐</button>
        <button className="p-2 hover:bg-gray-600 rounded">⋮</button>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="text-center text-gray-800">
          <div className="text-6xl mb-4">🌐</div>
          <h1 className="text-2xl font-bold mb-2">Web Browser</h1>
          <p className="text-gray-500">This is a simulated browser.</p>
          <p className="text-gray-500 text-sm mt-2">Enter a URL above to "navigate"</p>
        </div>
      </div>
    </div>
  );
}