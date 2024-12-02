import React, { FC } from 'react';
import Square from './pages/square';
import Room from './pages/room';
import './App.css';

const App: FC = () => {
  return (
    <div className="App">
      <Square />
      <Room />
    </div>
  );
}

export default App;
