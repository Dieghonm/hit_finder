import React from "react";
import { Routes, Route } from 'react-router-dom';
import MusicList from './Body/MusicList';
import ListaBares from "./Body/ListaBares";
import Favoritos from "./Body/Favoritos";
import BarCard from "./Body/BarCard";
import '../style/Body.css'

const Body = ({ setOrigin, escolhido }) => {
  return (
    <main className="Body-main">
      <Routes>
        <Route path="/" element={<ListaBares  setOrigin={setOrigin} />} />
        <Route path="/hit_finder" element={<ListaBares  setOrigin={setOrigin}/>} />
        <Route path="/favoritos" element={<Favoritos escolhido={escolhido} />} />
        <Route path="/detalhes/:id" element={<BarCard escolhido={escolhido} />} />
        <Route path="/musicas/:id" element={<MusicList escolhido={escolhido}/>} />
      </Routes>
    </main>
  );
};


export default Body;