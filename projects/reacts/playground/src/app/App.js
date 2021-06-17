import React from 'react';
import './App.css';

import Ad from '../components/Ad/';
import Counter from '../components/Counter/';
import Feed from '../components/Feed/';
import Request from '../components/Request/';

export default function App() {
  return (
    <div className="App">
      <Request />
      <Counter />
      <Ad>
        Fábio R.
      </Ad>
      <Feed />
    </div>
  );
};