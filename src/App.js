import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import karaokeList from './karaoke_lists/Bar Nevada.csv';

function App() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    fetch(karaokeList)
      .then((response) => response.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (result) => setCsvData(result.data),
        });
      })
      .catch((err) => console.error('Erro ao carregar CSV:', err));
  }, []);

  return (
    <div className="App">
      <h1>Lista de Karaokê</h1>
      <table border="1">
        <thead>
          <tr>
            {csvData.length > 0 && Object.keys(csvData[0]).map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;


