import logo from './logo.svg';
import './App.css';
// Import React
import React, { useState } from 'react';
// Import Custom Appbar
import Appbar from './Appbar';

function App() {
  const [activePage, setActivePage] = useState("Home");

  const handleSelectPage = (page) => {
    setActivePage(page);
  }

  return (
    <div className="App">
      <Appbar activePage={activePage} handleSelectPage={handleSelectPage}/>
    </div>
  );
}

export default App;
