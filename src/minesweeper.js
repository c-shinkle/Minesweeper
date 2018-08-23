const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let i = 0; i < numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let i = 0; i < numberOfRows; i++) {
    let row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;
  let randomRowIndex, randomColumnIndex;

  while( numberOfBombsPlaced < numberOfBombs) {
    randomRowIndex = Math.floor(Math.random() * numberOfRows);
    randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
    //This code might place bombs on top of existing numberOfBombs
    //How could we fix this...?
  }

  return board;
};

const printBoard = board => {
  return board.map(row => {
    return row.join(' | ');
  }).join('\n');
};

const board = generatePlayerBoard(3,4);
const bombBoard = generateBombBoard(3,4,5);

console.log('Player Board:\n' + printBoard(board));
console.log('Bomb Board:\n' + printBoard(bombBoard));
