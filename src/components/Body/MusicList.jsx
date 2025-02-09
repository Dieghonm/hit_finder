import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import cantor from '../../assets/cantor.png';
import musica from '../../assets/musica.png';
import karaokeList from '../../karaoke_lists/Bar Nevada.csv';
import '../../style/MusicList.css';

function MusicList({ escolhido }) {
  const [csvData, setCsvData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);

  useEffect(() => {
    if (escolhido.karaoke === 'Bar Nevada.csv') {
      fetch(karaokeList)
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
    }
  }, [escolhido]);

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
              <td colSpan={3} className="music-card-wrapper">
                <div className="music-card">
                  <img src={cantor} className="cantor-icon" alt="cantor_icon" />
                  <span className = 'cantor-span'>{row["CANTOR"]}</span>
                |
                  <img src={musica} className="musica-icon" alt="musica_icon" />
                  <span>{row["TÍTULO"]}</span>
                </div>
                <div className="cod-card">
                  <p className="inicio-cell">{row["INÍCIO DA LETRA"]}</p>
                  <p className="codigo-cell">{row["CÓD"]}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
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




