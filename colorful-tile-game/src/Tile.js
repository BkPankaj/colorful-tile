import React from 'react';
import './Tile.css';

const Tile = ({ className, onClick, isBlinking }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={`tile ${className} ${isBlinking ? 'blink' : ''}`}
      onClick={handleClick}
    ></div>
  );
};

export default Tile;
