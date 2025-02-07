import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import MusicList from './Body/MusicList';
import ListaBares from "./Body/ListaBares";

const Body = ({ barData }) => {
  const [escolhido, setEscolhido] = useState({});
  console.log(escolhido);

  return (
    <main className="flex-1 p-4">
      <Routes>
        <Route path="/" element={<ListaBares func={setEscolhido} />} />
        <Route path="/hitFinder" element={<ListaBares func={setEscolhido} />} />
        <Route path="/musicas/:id" element={<MusicList karaoke={escolhido.karaoke} />} />
      </Routes>
    </main>
  );
};


export default Body;