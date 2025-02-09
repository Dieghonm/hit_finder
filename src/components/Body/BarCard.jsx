import React from "react";
import "../../style/BarCard.css"

const BarCard = ({escolhido}) => {
  let { Telefone, endereco} = escolhido;


 return (
    <div className="bar-card">
      <div className="address">
        <p>Endereço: <span>{endereco}</span></p>
      </div>
      <div className="phone">
        <p>Telefone: <span>{Telefone}</span></p>
      </div>
      <div className="hours">
        <ul>
          {Object.entries(escolhido["Horário de funcionamento"]).map(([dia, horario]) => (
            <li key={dia}>
              {dia}: {horario}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BarCard;
