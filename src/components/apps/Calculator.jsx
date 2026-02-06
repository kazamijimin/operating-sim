import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperator = (op) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleEquals = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const Button = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`h-14 rounded-lg text-xl font-medium transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="h-full flex flex-col p-4 bg-gray-900">
      {/* Display */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="text-gray-400 text-sm h-6">{equation}</div>
        <div className="text-white text-4xl text-right font-light">{display}</div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        <Button onClick={handleClear} className="bg-gray-600 hover:bg-gray-500 text-white">C</Button>
        <Button onClick={() => {}} className="bg-gray-600 hover:bg-gray-500 text-white">±</Button>
        <Button onClick={() => handleOperator('%')} className="bg-gray-600 hover:bg-gray-500 text-white">%</Button>
        <Button onClick={() => handleOperator('/')} className="bg-orange-500 hover:bg-orange-400 text-white">÷</Button>

        <Button onClick={() => handleNumber('7')} className="bg-gray-700 hover:bg-gray-600 text-white">7</Button>
        <Button onClick={() => handleNumber('8')} className="bg-gray-700 hover:bg-gray-600 text-white">8</Button>
        <Button onClick={() => handleNumber('9')} className="bg-gray-700 hover:bg-gray-600 text-white">9</Button>
        <Button onClick={() => handleOperator('*')} className="bg-orange-500 hover:bg-orange-400 text-white">×</Button>

        <Button onClick={() => handleNumber('4')} className="bg-gray-700 hover:bg-gray-600 text-white">4</Button>
        <Button onClick={() => handleNumber('5')} className="bg-gray-700 hover:bg-gray-600 text-white">5</Button>
        <Button onClick={() => handleNumber('6')} className="bg-gray-700 hover:bg-gray-600 text-white">6</Button>
        <Button onClick={() => handleOperator('-')} className="bg-orange-500 hover:bg-orange-400 text-white">−</Button>

        <Button onClick={() => handleNumber('1')} className="bg-gray-700 hover:bg-gray-600 text-white">1</Button>
        <Button onClick={() => handleNumber('2')} className="bg-gray-700 hover:bg-gray-600 text-white">2</Button>
        <Button onClick={() => handleNumber('3')} className="bg-gray-700 hover:bg-gray-600 text-white">3</Button>
        <Button onClick={() => handleOperator('+')} className="bg-orange-500 hover:bg-orange-400 text-white">+</Button>

        <Button onClick={() => handleNumber('0')} className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white">0</Button>
        <Button onClick={() => handleNumber('.')} className="bg-gray-700 hover:bg-gray-600 text-white">.</Button>
        <Button onClick={handleEquals} className="bg-orange-500 hover:bg-orange-400 text-white">=</Button>
      </div>
    </div>
  );
}