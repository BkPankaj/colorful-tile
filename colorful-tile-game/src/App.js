
// src/App.js
import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import './App.css';

const App = () => {
  const redTileRows = 10;
  // var score= 0;
  var i =0;
  var j =0;

  const [redTileColumn, setRedTileColumn] = useState(2);
  const [blinkTile, setBlinkTile] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [redSpeedSelect, setRedSpeedSelect] = useState(250);




  useEffect(() => {
    // Fetch data from the backend API
    fetch('https://colorful-tile-game-backend.onrender.com/api/tiles')
      .then((response) => response.json())
      .then((data) => {console.log('Fetched data:', data);setTiles(data);})
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // console.log('Fetched data:', tiles);
      
  useEffect(() => {
    let intervalId;

    if (isAnimating) {
      intervalId = setInterval(() => {
        setRedTileColumn((prevColumn) => (prevColumn === 10 ? 2 : prevColumn + 1));
      }, redSpeedSelect);
    }

    return () => clearInterval(intervalId);

  }, [redSpeedSelect,isAnimating]);

  const handleTileClick = (id,score,color) => {
    if(isAnimating){
      if(color === 'blue'){
        setScore(score+10);
      
      }else if(color === 'red'){
        if(score-10<0){
          console.log('F');
          setScore('Game Over')
          setIsAnimating(false);
        }else{
          setScore(score-10);
        }
       
        
      }
      setBlinkTile({id});
      
    }
    

    setTimeout(() => {
      setBlinkTile(null);
    }, 500);
  };


  const handleStartClick = () => {
    if(score === 'Game Over'){
      setScore(0);
    }
    setIsAnimating(true);
  };

  const handleStopClick = () => {
    setIsAnimating(false);
  };

  const handleDropdownChange = (event) => {
    const parsedValue = parseInt(event.target.value, 10);
    // console.log(parsedValue);
    setRedSpeedSelect(parsedValue);
  };

  const renderGrid = () => {
    const grid = [];
    var row = [];
    
      tiles.forEach((tile) => {
        
        const tileClass = i < redTileRows && j >= redTileColumn && j < redTileColumn + 2 ? 'red' : tile.color;
        const isBlinking = blinkTile && blinkTile.id === tile.id;
        // console.log(tile.id,blinkTile);
        // console.log('j',j);
        row.push(
         ( <Tile key={tile.id} className={`tile ${tileClass}`} onClick={() => handleTileClick(tile.id, score,tileClass)}
            isBlinking={isBlinking} />)
        );
        j++;
        if(tile.id % 10 === 0){
          // console.log('i', i);
          grid.push(<div className="row" key={i}>{row}</div>);
          i++;
          j=0;
          row =[];
        } 
        
      });

    return grid;
  };

  return (
    <div className="App">
      <div className="score-container">
        <h1>Score: {score}</h1>
      </div>
      {renderGrid()}
      <div className="button-container">
        <button onClick={handleStartClick}>Restart</button>
        <button onClick={handleStopClick}>Stop</button>
        <select className="drop-down" value={redSpeedSelect} onChange={handleDropdownChange}>
        <option value="250" className="option">Select speed</option>
        <option value="250" className="option">One</option>
        <option value="200" className="option">Two</option>
        <option value="150" className="option">Three</option>
        <option value="100" className="option">Four</option>
        <option value="50" className="option">Five</option>

      </select>
      </div>
    </div>
  );
};

export default App;


