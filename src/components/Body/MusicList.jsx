import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
import cantorIcon from '../../assets/cantor.png';
import musicaIcon from '../../assets/musica.png';
import Nevada from '../../karaoke_lists/Bar Nevada.csv';
import syncro from '../../karaoke_lists/syncro_2023.csv';
import useLocalStorage from '../../hooks/useLocalStorage';

import '../../style/MusicList.css';

function MusicList({ escolhido }) {
  const { id } = useParams();
  const [csvData, setCsvData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [popupData, setPopupData] = useState(null);
  const [favoritos, adicionarFavorito, removerFavorito] = useLocalStorage('karaokeFavoritos', {});
  
  // Determina o ID do local atual
  const localAtual = escolhido?.id || id;
  const heart = favoritos[localAtual] || [];

  useEffect(() => {
    let karaokeFile = null;

    if (escolhido && escolhido.karaoke) {
      if (escolhido.karaoke === 'Bar Nevada.csv') karaokeFile = Nevada;
      if (escolhido.karaoke === 'syncro_2023.csv') karaokeFile = syncro;
    } else {
      if (id === 'syncro_2023') karaokeFile = syncro;
      if (id === 'BarNevada' || id === 'bar_nevada') karaokeFile = Nevada;
    }

    if (!karaokeFile) return;

    fetch(karaokeFile)
      .then((response) => response.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (result) => {
            setCsvData(result.data);
            setFilteredData(result.data);
          },
        });
      })
      .catch((err) => console.error('Erro ao carregar CSV:', err));
  }, [escolhido, id]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = csvData.filter((row) => {
      return Object.values(row).some(
        (value) => value && value.toString().toLowerCase().includes(term)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleClick = (row) => {
    setPopupData(row);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const toggleFavorito = (musica, action) => {
    if (action === 'remove') {
      removerFavorito({ id: localAtual }, { CÓD: musica.CÓD });
    } else {
      adicionarFavorito({ id: localAtual }, { CÓD: musica.CÓD });
    }
  };
  
  // Renderização condicional do coração
  const renderHeart = (codigo) => (
    <span className="heart-icon">
      {heart.includes(codigo) ? '❤️' : '♡'}
    </span>
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="app-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        placeholder="Buscar..."
      />
      <table className="music-table">
        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index} className="music-row">
              <td colSpan={3} className="music-card-wrapper" onClick={() => handleClick(row)}>
                <div className="music-card">
                  <img src={cantorIcon} className="cantor-icon" alt="cantor_icon" />
                  <span className="cantor-span">{row["CANTOR"]}</span>
                  |
                  <img src={musicaIcon} className="musica-icon" alt="musica_icon" />
                  <span>{row["TÍTULO"]}</span>
                  
                </div>
                <div className="cod-card">
                  <p className="inicio-cell">{renderHeart(row.CÓD)}&nbsp;{row["INÍCIO DA LETRA"]}</p>
                  <p className="codigo-cell">{row["CÓD"]}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupData && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="popup-header">
              <p>Música:&nbsp;</p>
              <h3>{popupData["TÍTULO"]}&nbsp;{renderHeart(popupData.CÓD)}</h3>
            </div>
            <p><strong>Código:</strong> {popupData["CÓD"]}</p>
            <p><strong>Cantor:</strong> {popupData["CANTOR"]}</p>
            <p><strong>Início da letra:</strong> {popupData["INÍCIO DA LETRA"]}</p>
            {heart.includes(popupData["CÓD"]) ?
              <button className="popup-btn" onClick={() => {
                toggleFavorito(popupData, 'remove');
                closePopup();
              }}>Remover</button>
              : 
              <button className="popup-btn" onClick={() => {
                toggleFavorito(popupData);
                closePopup();
              }}>Favoritar</button>}
            <button className="popup-btn" onClick={closePopup}>Fechar</button>
          </div>
        </div>
      )}

      <div className="pagination-container">
        {currentPage !== 1 && (<button onClick={() => setCurrentPage(1)}>1</button>)}
        {currentPage > 3 && (<button onClick={() => setCurrentPage(currentPage - 2)}>{currentPage - 2}</button>)}
        {currentPage > 2 && (<button onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button>)}
        <span className="current-page">{currentPage}</span>
        {currentPage < totalPages - 1 && (<button onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button>)}
        {currentPage < totalPages - 2 && (<button onClick={() => setCurrentPage(currentPage + 2)}>{currentPage + 2}</button>)}
        {currentPage !== totalPages && (<button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>)}
      </div>
    </div>
  );
}

export default MusicList;