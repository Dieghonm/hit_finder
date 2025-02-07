import React, { useEffect, useState } from "react";

const BarCard = ({data}) => {
  let { nome, Telefone, endereco, logo} = data;

  console.log( nome, Telefone, endereco, logo);
  

  return (
    <div>
      <h2>{nome}</h2>
      <p>Logo: {logo}</p>
      <p>Endereço: {endereco}</p>
      <p>Telefone: {Telefone}</p>
      <ul>
            {Object.entries(data["Horário de funcionamento"]).map(([dia, horario]) => (
              <li key={dia}>
                {dia}: {horario}
              </li>
            ))}
          </ul>
    </div>
  );
};

export default BarCard;
