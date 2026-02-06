import useStore from '../store/useStore';

export default function DesktopIcon({ app }) {
  const { openWindow } = useStore();

  return (
    <button
      onDoubleClick={() => openWindow(app)}
      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors group"
    >
      <span className="text-4xl drop-shadow-lg">{app.icon}</span>
      <span className="text-white text-xs text-center drop-shadow-md px-1 rounded">
        {app.title}
      </span>
    </button>
  );
}