import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

const App = () => {
  const [origin, setOrigin] = useLocalStorage('app_origin', 'QRCODE');
  const [escolhido, setEscolhido] = useLocalStorage('app_escolhido', { id: 0, nome: '' });
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



