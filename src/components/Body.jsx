import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import MusicList from './Body/MusicList';
import ListaBares from "./Body/ListaBares";
import Favoritos from "./Body/Favoritos";
import BarCard from "./Body/BarCard";

const Body = ({ barData }) => {
  const [escolhido, setEscolhido] = useState({});
  console.log(escolhido);

  return (
    <main className="flex-1 p-4">
      <Routes>
        <Route path="/" element={<ListaBares func={setEscolhido} />} />
        <Route path="/hit_finder" element={<ListaBares func={setEscolhido} />} />
        <Route path="/favoritos" element={<Favoritos data={escolhido} />} />
        <Route path="/detalhes" element={<BarCard data={escolhido} />} />
        <Route path="/musicas/:id" element={<MusicList karaoke={escolhido.karaoke} />} />
      </Routes>
    </main>
  );
};


export default Body;