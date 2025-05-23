import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import sanduiche from '../assets/icon sanduiche.png';
import baresData from '../assets/bares.json';
import '../style/Header.css';

const Header = ({ props, setEscolhido, escolhido }) => {
  const location = useLocation();
  const [localId, setLocalId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [localName, setLocalName] = useState('Selecione um local');

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];

    if (location.pathname === '/favoritos') {
      setLocalName('Favoritos');
      setEscolhido({ id: 0, nome: '' });
      setLocalId('');
    } else if (location.pathname === '/' || location.pathname === '') {
      setLocalName('Selecione um local');
      setEscolhido({ id: 0, nome: '' });
      setLocalId('');
    } else {
      setLocalId(decodeURIComponent(lastPart));
    }
  }, [location]);

  useEffect(() => {
    if (!localId) return;

    const localSelecionado = baresData.find((local) => local.id === localId);
    if (localSelecionado) {
      setEscolhido(localSelecionado);
      setLocalName(localSelecionado.nome || 'Selecione um local');
    } else {
      setEscolhido({ id: 0, nome: '' });
      setLocalName('Selecione um local');
    }
  }, [localId]);

  return (
    <header className="header">
      <img src={logo} className="app-logo" alt="logo" />
      <div className="bar-nam-div">
        <p className="bar-name">{localName}</p>
        <p className="bar-name">{escolhido.apelido || ''}</p>
      </div>

      <div className="menu-wrapper">
        <img
          src={sanduiche}
          alt="menu-icon"
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <div className="menu-dropdown">
            {props !== 'QRCODE' && (
              <Link to="/" className="menu-item" onClick={() => setMenuOpen(false)}>
                Locais
              </Link>
            )}
            <Link to="/favoritos" className="menu-item" onClick={() => setMenuOpen(false)}>
              Favoritos
            </Link>
            {/* {escolhido.id !== 0 && (
              <Link to={`/detalhes/${localId}`} className="menu-item" onClick={() => setMenuOpen(false)}>
                Detalhes
              </Link>
            )} */}
            {/* {escolhido.id !== 0 && (
              <Link to={`/musicas/${localId}`} className="menu-item" onClick={() => setMenuOpen(false)}>
                Karaoke
              </Link>
            )} */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;



