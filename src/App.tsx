import React from 'react';
import Request from './containers/Request';
import './App.css';

function App() {
  return (
    <div id="app-container">
      <h1 className="app-name">
        <span>Request</span>
      </h1>
      <Request />
    </div>
  );
}

export default App;
