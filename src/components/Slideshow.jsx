import React, { useEffect, useState, useRef } from 'react';

export default function Slideshow({ breed }) {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(false);
  const [loading, setLoading] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    if (!breed) return;
    setLoading(true);
    (async () => {
      const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const json = await res.json();
      setImages(json.message || []);
      setIndex(0);
      setLoading(false);
    })();
  }, [breed]);

  useEffect(() => {
    if (auto && images.length > 0) {
      timer.current = setInterval(() => setIndex(i => (i + 1) % images.length), 3000);
      return () => clearInterval(timer.current);
    } else {
      clearInterval(timer.current);
    }
  }, [auto, images]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading {breed} images...</p>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return <p>No images found for this breed.</p>;
  }

  return (
    <div className="slideshow">
      <div className="image-wrapper" title={`Breed: ${breed}`}>
        <img
          key={images[index]}
          src={images[index]}
          alt={`${breed} ${index + 1}`}
          className="dog-image"
        />
      </div>
      <div className="controls">
        <button onClick={() => setIndex(i => (i - 1 + images.length) % images.length)}>Prev</button>
        <button onClick={() => setIndex(i => (i + 1) % images.length)}>Next</button>
        <label>
          <input type="checkbox" checked={auto} onChange={e => setAuto(e.target.checked)} /> Autoplay
        </label>
      </div>
      <p>Image {index + 1} of {images.length}</p>
    </div>
  );
}
