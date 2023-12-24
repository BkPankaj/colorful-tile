// server.js
const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
app.use(express.json());
app.use(cors());

const generateRandomTiles = () => {
  const tiles = [];
  const totalTiles = 10 * 10; 
  const bluePosition = getRandomPositions(12,20, totalTiles);

  for (let i = 0; i < totalTiles; i++) {
    const tile = {
      id: i + 1,
      color: bluePosition.includes(i+1) ? 'blue': ((i+1) %10 === 1 || (i+1) %10 === 2 ) ? 'green': 'black',
    };
    tiles.push(tile);
  }

  return tiles;
};


const getRandomPositions = (count, rangel,rangeh) => {
  const positions = new Set();
  while (positions.size < count) {
    var randomPosition = Math.floor(Math.random() * rangeh);
    (randomPosition %10 != 1 && randomPosition %10 != 2 ) ?positions.add(randomPosition): randomPosition=0;
  }
  return Array.from(positions);
};


app.get('/api/tiles', (req, res) => {
  const tiles = generateRandomTiles();
  res.json(tiles);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
