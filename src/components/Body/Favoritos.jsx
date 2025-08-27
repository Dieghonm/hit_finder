import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import Papa from 'papaparse';
import cantorIcon from '../../assets/cantor.png';
import musicaIcon from '../../assets/musica.png';
import Nevada from '../../karaoke_lists/Bar Nevada.csv';
import syncro from '../../karaoke_lists/syncro_2023.csv';
import baresData from '../../assets/bares.json';
import '../../style/ListaBares.css';
import '../../style/MusicList.css';

const Favoritos = () => {
  const [favoritos, , removerFavorito] = useLocalStorage('karaokeFavoritos', {});
  const [localSelecionado, setLocalSelecionado] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  const baresDisponiveis = Object.keys(favoritos).filter(bar => favoritos[bar].length > 0);
  const navigate = useNavigate();

  // Carrega os dados do CSV e filtra os favoritos
  useEffect(() => {
    if (!localSelecionado) return;

    let karaokeFile = null;
    if (localSelecionado === 'syncro_2023') karaokeFile = syncro;
    if (localSelecionado === 'BarNevada' || localSelecionado === 'bar_nevada') karaokeFile = Nevada;

    if (!karaokeFile) return;

    fetch(karaokeFile)
      .then((response) => response.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (result) => {
            const favoritosDoLocal = favoritos[localSelecionado] || [];
            setCsvData(result.data.filter((musica) => 
              favoritosDoLocal.includes(musica.CÓD)
            ));
          },
          error: (error) => {
            console.error('Erro ao parsear CSV:', error);
          }
        });
      })
      .catch((err) => console.error('Erro ao carregar CSV:', err));
  }, [localSelecionado, favoritos]);

  // Filtra os dados conforme o termo de busca
  useEffect(() => {
    const filtered = csvData.filter((row) => 
      Object.values(row).some(
        (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, csvData]);

  const toggleFavorito = (musica) => {
    removerFavorito({ id: localSelecionado }, { CÓD: musica.CÓD });
  };

  const renderHeart = () => (
    <span className="heart-icon">❤️</span>
  );

  // Função para obter nome amigável do estabelecimento
  const getNomeEstabelecimento = (barId) => {
    const bar = baresData.find(b => b.id === barId);
    return bar ? bar.nome : barId;
  };

  if (!localSelecionado) {
    return (
      <div className="lista-bares">
        {baresDisponiveis.length > 0 ? (
          baresDisponiveis.map((bar) => (
            <div 
              key={bar} 
              className="bar-button"
              onClick={() => setLocalSelecionado(bar)}
            >
              <div className="bar-container">
                <h3>{getNomeEstabelecimento(bar)}</h3>
                <p>{favoritos[bar].length} música(s) favoritada(s)</p>
              </div>
            </div>
        ))) : (
          <p className="empty-message">Nenhum favorito encontrado</p>
        )}
      </div>
    );
  }

  return (
    <div className="app-container">
      <h2 className="favoritos-title">Favoritos - {getNomeEstabelecimento(localSelecionado)}</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        placeholder="Buscar nos favoritos..."
      />
      <table className="music-table">
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index} className="music-row">
              <td colSpan={3} className="music-card-wrapper" onClick={() => setPopupData(row)}>
                <div className="music-card">
                  <img src={cantorIcon} className="cantor-icon" alt="Ícone cantor" />
                  <span className="cantor-span">{row.CANTOR}</span>
                  |
                  <img src={musicaIcon} className="musica-icon" alt="Ícone música" />
                  <span>{row.TÍTULO}</span>
                </div>
                <div className="cod-card">
                  <p className="inicio-cell">{renderHeart()}&nbsp;{row["INÍCIO DA LETRA"]}</p>
                  <p className="codigo-cell">{row.CÓD}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <button
          className="bar-link"
          onClick={() => setLocalSelecionado('')}
        >
          Voltar
        </button>
        <button
          className="bar-link"
          onClick={() => navigate(`/musicas/${localSelecionado}`)}
        >
          Ver lista completa
        </button>
      </div>

      {popupData && (
        <div className="popup-overlay" onClick={() => setPopupData(null)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>
                {popupData.TÍTULO}
                {renderHeart()}
              </h3>
            </div>
            <p><strong>Código:</strong> {popupData.CÓD}</p>
            <p><strong>Cantor:</strong> {popupData.CANTOR}</p>
            <p><strong>Início da letra:</strong> {popupData["INÍCIO DA LETRA"]}</p>
            <button 
              className="popup-btn btn-remove"
              onClick={() => {
                toggleFavorito(popupData);
                setPopupData(null);
              }}
            >
              Remover
            </button>
            <button 
              className="popup-btn btn-close"
              onClick={() => setPopupData(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      {filteredData.length === 0 && csvData.length === 0 && (
        <p className="empty-message">Nenhum favorito encontrado para este estabelecimento</p>
      )}
      {filteredData.length === 0 && csvData.length > 0 && (
        <p className="empty-message">Nenhum favorito encontrado para esta busca</p>
      )}
    </div>
  );
};

export default Favoritos;