import logo from './logo.svg';
import './App.css';
// Import React
import React, { useState } from 'react';
// Import Custom Appbar
import Appbar from './Appbar';

function App() {
  // In function components use React Hooks to manage your state
  const [activePage, setActivePage] = useState("Home"); // Setting the default landing page to Home

  // This method is called from within the child component Appbar
  const handleSelectPage = (page) => {
    setActivePage(page);
  }

  return (
    <div className="App">
      {
        /* Passing the field activePage and the method handleSelectPage as props into the Appbar
        to make them available to the child component */
      }
      <Appbar activePage={activePage} handleSelectPage={handleSelectPage}/>
    </div>
  );
}

export default App;
