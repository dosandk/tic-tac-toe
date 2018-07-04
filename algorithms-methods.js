function getEmptyMatrix (n) {
  return Array(n).fill(Array(n).fill(null)).map(item => item.slice());
}

function getReversedMatrix (matrix, n) {
  const emptyMatrix = getEmptyMatrix(n);

  matrix.forEach((subArr, index) => {
    subArr.forEach((item, itemIndex) => {
      emptyMatrix[itemIndex][index] = item;
    });
  });

  return emptyMatrix;
}

function getMatrixDiagonals (matrix, n) {
  const diagonals = Array(2).fill(Array(n).fill(null)).map(item => item.slice());

  matrix.forEach((subArr, index) => {
    diagonals[0][index] = subArr[index];
  });

  matrix.slice().reverse().forEach((subArr, index) => {
    diagonals[1][index] = subArr[index];
  });

  return diagonals;
}

export function getMatrix (n) {
  let counter = 0;

  return getEmptyMatrix(n).map(arr => arr.map(() => ++counter));
}

export function updateStore (arr, id, value) {
  return arr.map(subArr =>
    subArr.map(item => item === id ? value : item));
}

export function findWinner (arr, value) {
  return arr.findIndex(subArr =>
    subArr.every(item => item === value));
}

export function getCombinations (n) {
  const matrixWithValues = getMatrix(n);
  const diagonals = getMatrixDiagonals(matrixWithValues, n);
  const reversedMatrix = getReversedMatrix(matrixWithValues, n);

  return [...matrixWithValues, ...reversedMatrix, ...diagonals];
}
