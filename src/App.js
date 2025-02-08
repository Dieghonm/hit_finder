import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import './App.css';

const App = () => {
  const [origin, setOrigin] = useState('QRCODE');
  const [escolhido, setEscolhido] = useState({id: 0, nome: ''});
  return (
    <Router>
      <div>
        <Header props = {origin} setEscolhido={setEscolhido} escolhido={escolhido} />
        <Body setOrigin={setOrigin} escolhido={escolhido}/>
        <Footer />
      </div>
    </Router>
  );
};

export default App;



