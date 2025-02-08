import React from 'react';
import { Link } from 'react-router-dom';
import baresData from '../../assets/bares.json';
import '../../style/ListaBares.css';

const ListaBares = ({ setOrigin }) => {
  return (
    <div className="lista-bares">
      <h1 className="titulo">Lista de Bares</h1>
      {baresData.map((bar) => (
        <div className="bar-container" key={bar.id}>
          <Link
            className="bar-link"
            onClick={() => {
              // func(bar);
              setOrigin('List');
            }}
            to={`/musicas/${bar.id}`}
          >
            {bar.nome}
          </Link>
        </div>
      ))}
    </div>
  );
};


export default ListaBares;



