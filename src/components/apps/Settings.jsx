import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('system');

  const tabs = [
    { id: 'system', icon: '💻', label: 'System' },
    { id: 'display', icon: '🖥️', label: 'Display' },
    { id: 'sound', icon: '🔊', label: 'Sound' },
    { id: 'network', icon: '📶', label: 'Network' },
    { id: 'apps', icon: '📦', label: 'Apps' },
    { id: 'accounts', icon: '👤', label: 'Accounts' },
    { id: 'privacy', icon: '🔒', label: 'Privacy' },
    { id: 'about', icon: 'ℹ️', label: 'About' },
  ];

  return (
    <div className="h-full flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-56 bg-gray-800/50 p-4 border-r border-gray-700">
        <input
          type="text"
          placeholder="Find a setting"
          className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm mb-4 outline-none"
        />
        
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-1 ${
              activeTab === tab.id ? 'bg-gray-700' : 'hover:bg-gray-700/50'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'system' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">System</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium mb-2">Display</h3>
                <p className="text-sm text-gray-400">Brightness, night light, display profile</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium mb-2">Sound</h3>
                <p className="text-sm text-gray-400">Volume levels, output, input</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium mb-2">Power & Battery</h3>
                <p className="text-sm text-gray-400">Battery saver, power mode, screen timeout</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'about' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">About</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-3xl">
                  🪟
                </div>
                <div>
                  <h3 className="text-xl font-medium">OS Simulation</h3>
                  <p className="text-gray-400">Version 1.0.0</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Device name</span>
                  <span>OS-SIM-PC</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Processor</span>
                  <span>Virtual CPU @ 3.0GHz</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">RAM</span>
                  <span>16 GB</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">System type</span>
                  <span>64-bit</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!['system', 'about'].includes(activeTab) && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">{tabs.find(t => t.id === activeTab)?.label}</h2>
            <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
              Settings content for {activeTab} would appear here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}