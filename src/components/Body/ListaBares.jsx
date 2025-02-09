import React from 'react';
import { Link } from 'react-router-dom';
import baresData from '../../assets/bares.json';
import '../../style/ListaBares.css';

const ListaBares = ({ setOrigin }) => {
  return (
    <div className="lista-bares">
      {baresData.map((bar) => (
        <div  key={bar.id}>
          <Link
            className="bar-link"
            onClick={() => {
              setOrigin('List');
            }}
            to={`/musicas/${bar.id}`}
          >
            <p className="bar-container">{bar.nome}</p>
            
          </Link>
        </div>
      ))}
    </div>
  );
};


export default ListaBares;



