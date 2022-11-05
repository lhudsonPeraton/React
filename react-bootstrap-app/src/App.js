import logo from './logo.svg';
import './App.css';
// Import React
import React, { useState } from 'react';
// Import Custom Appbar
import Appbar from './Appbar';
// Import Weather Page
import Weather from './Weather';

function App() {
  // In function components use React Hooks to manage your state
  const [activePage, setActivePage] = useState("Weather"); // Setting the default landing page to Weather

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
      {activePage.toLowerCase() === "weather" ? <Weather/> : null}
      {activePage.toLowerCase() === "cryptocurrency" ? <div><h1>cryptocurrency!</h1></div>: null}
      {activePage.toLowerCase() === "security" ? <div><h1>security!</h1></div>: null}
    </div>
  );
}

export default App;
