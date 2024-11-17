import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => response.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;
