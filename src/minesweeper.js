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
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }

  return board;
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  let neighborOffsets = [];
  for (let i = 0; i < 9; i++) {
    neighborOffsets.push([]);
  }
  neighborOffsets[0] = [-1, -1];
  neighborOffsets[1] = [-1, 0];
  neighborOffsets[2] = [-1, 1];
  neighborOffsets[3] = [0, -1];
  neighborOffsets[4] = [0, 0];
  neighborOffsets[5] = [0, 1];
  neighborOffsets[6] = [1, -1];
  neighborOffsets[7] = [1, 0];
  neighborOffsets[8] = [1, 1];

  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
    neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {

      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      }
    }
  });

  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] === '') {
    console.log('This tile has already been flipped');
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] =
    getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

const printBoard = board => {
  return board.map(row => {
    return row.join(' | ');
  }).join('\n');
};

const board = generatePlayerBoard(3, 4);
const bombBoard = generateBombBoard(3, 4, 2);

console.log('Player Board:\n' + printBoard(board));
console.log('Bomb Board:\n' + printBoard(bombBoard));

flipTile(board, bombBoard, 1, 1);
console.log('Updated Playr Board:');
console.log('Player Board:\n' + printBoard(board));
