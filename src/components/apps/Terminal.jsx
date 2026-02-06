import { useState, useRef, useEffect } from 'react';

export default function Terminal() {
  const [lines, setLines] = useState([
    { type: 'output', text: 'Welcome to OS Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands.\n' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [lines]);

  const handleCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    let output = '';

    switch (command) {
      case 'help':
        output = `Available commands:
  help     - Show this help message
  clear    - Clear the terminal
  date     - Show current date and time
  whoami   - Display current user
  echo     - Echo a message
  ls       - List directory contents
  pwd      - Print working directory`;
        break;
      case 'clear':
        setLines([]);
        setInput('');
        return;
      case 'date':
        output = new Date().toString();
        break;
      case 'whoami':
        output = 'user@os-simulation';
        break;
      case 'ls':
        output = 'Desktop  Documents  Downloads  Music  Pictures  Videos';
        break;
      case 'pwd':
        output = '/home/user';
        break;
      case '':
        setLines([...lines, { type: 'input', text: cmd }]);
        setInput('');
        return;
      default:
        if (command.startsWith('echo ')) {
          output = cmd.slice(5);
        } else {
          output = `Command not found: ${command}. Type "help" for available commands.`;
        }
    }

    setLines([
      ...lines,
      { type: 'input', text: cmd },
      { type: 'output', text: output },
    ]);
    setInput('');
  };

  return (
    <div 
      className="h-full bg-black p-4 font-mono text-sm overflow-auto"
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div key={i} className={line.type === 'input' ? 'text-green-400' : 'text-gray-300'}>
          {line.type === 'input' && <span className="text-blue-400">user@os-sim:~$ </span>}
          <span className="whitespace-pre-wrap">{line.text}</span>
        </div>
      ))}
      
      <div className="flex text-green-400">
        <span className="text-blue-400">user@os-sim:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
        />
      </div>
    </div>
  );
}