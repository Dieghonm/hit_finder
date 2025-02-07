import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import karaokeList from '../../karaoke_lists/Bar Nevada.csv';

function MusicList() {
  const [csvData, setCsvData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);

  useEffect(() => {
    fetch(karaokeList)
      .then((response) => response.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (result) => {
            setCsvData(result.data);
            setFilteredData(result.data); // Inicializa com todos os dados
          },
        });
      })
      .catch((err) => console.error('Erro ao carregar CSV:', err));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = csvData.filter((row) => {
      return Object.values(row).some(
        (value) => value && value.toString().toLowerCase().includes(term)
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Resetar para a primeira página ao buscar
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextThreePages = () => {
    if (currentPage + 3 <= totalPages) {
      setCurrentPage(currentPage + 3);
    } else {
      setCurrentPage(totalPages); // Caso haja menos de 3 páginas à frente
    }
  };

  const handlePrevThreePages = () => {
    if (currentPage - 3 >= 1) {
      setCurrentPage(currentPage - 3);
    } else {
      setCurrentPage(1); // Caso haja menos de 3 páginas atrás
    }
  };

  // Exibe apenas as linhas da página atual
  const displayedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="App">
      <h1>Lista de Karaokê</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar..."
      />
      <table border="1">
        <thead>
          <tr>
            {csvData.length > 0 && Object.keys(csvData[0]).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="pagination">
        <button onClick={handlePrevThreePages} disabled={currentPage <= 3}>
          -3 Páginas
        </button>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
        <button onClick={handleNextThreePages} disabled={currentPage + 3 > totalPages}>
          +3 Páginas
        </button>
      </div>
    </div>
  );
}

export default MusicList;



