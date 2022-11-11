import './App.css';
// Import React
import React, { useState } from 'react';
// Import Custom Appbar
import Appbar from './Appbar';
// Import Weather Page
import Weather from './components/Weather';
import Crypto from './components/Crypto';
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
      {activePage.toLowerCase() === "cryptocurrency" ? <Crypto/> : null}
    </div>
  );
}

export default App;
