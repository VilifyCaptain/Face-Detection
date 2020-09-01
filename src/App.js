import React from 'react';
import Navigation from './components/Navigation/navigation.js';
import Logo from './components/logo/logo.js';
import Imagelink from './components/ImageLink/imagelink.js';
import Rank from './components/Rank/rank.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Logo/>
      <Rank/>
      <Imagelink/>
    </div>
  );
}

export default App;
