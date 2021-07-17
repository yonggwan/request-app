import React from 'react';
import RequestContainer from './containers/Request';
import './App.css';

function App() {
  return (
    <div id="app-container">
      <h1 className="app-name">
        <span>soomgo</span>
        <img src="https://static.cdn.soomgo.com/static/img/home/index_soomgo_logo.svg" alt="Soomgo" />
      </h1>
      <RequestContainer />
    </div>
  );
}

export default App;
