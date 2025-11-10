import React, { useEffect, useState } from 'react';
import BreedSelector from './components/BreedSelector';
import Slideshow from './components/Slideshow';

export default function App(){
  const [breeds, setBreeds] = useState({});
  const [selectedBreed, setSelectedBreed] = useState('beagle');

  useEffect(() => {
    // fetch list of breeds
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(r => r.json())
      .then(data => setBreeds(data.message));
  }, []);

  return (
    <div className="app">
      <h1>Dogs — fetch, promises & async/await</h1>
      <BreedSelector breeds={breeds} selected={selectedBreed} onChange={setSelectedBreed} />
      <Slideshow breed={selectedBreed} />
    </div>
  );
}
