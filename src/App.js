import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    </Router>
  );
};

export default App;



