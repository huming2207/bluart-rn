import React, { useRef } from 'react';
import './terminal.css';
import { useEffect } from 'react';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';

function App() {
  const fitAddon = new FitAddon();
  const xtermRef = useRef<XTerm>(null);

  useEffect(() => {
    if (!xtermRef?.current) return;
    xtermRef.current.terminal.writeln("Hello, World!");
    fitAddon.fit();
  }, []); 

  return (
    <div className="App" style={{ backgroundColor: 'black' }}>
      <XTerm className="bluartTerminal" ref={xtermRef} addons={[fitAddon]} />
    </div>
  );
}

export default App;
