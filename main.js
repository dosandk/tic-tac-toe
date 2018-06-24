const ticTacToe = {
  n: 3,
  clicksCounter: 0,
  combinations: [],

  step (event) {
    const {target} = event;
    const id = parseInt(target.dataset.id, 10);
    const value = this.clicksCounter % 2 ? 'O' : 'X';
    const isEmptyCell = target.tagName === 'TD' && !target.textContent;

    if (isEmptyCell) {
      this.store = this.updateStore(this.store, id, value);
      target.textContent = value;
      this.clicksCounter += 1;

      const winner = this.findWinner(this.store, value);

      if (winner >= 0) {
        this.highlightWinner(winner);
        this.$result.textContent += ` ${value} wins!`;
        this.$table.removeEventListener('click', this.step);
      } else if (this.clicksCounter === Math.pow(this.n, 2)) {
        this.$result.textContent += ' Draw!';
      }
    }
  },

  initialize () {
    this.step = this.step.bind(this);
    this.combinations = getCombinations(this.n);

    this.$table = document.getElementById('table');
    this.$restartBtn = document.getElementById('restart-btn');
    this.$result = document.getElementById('result');

    this.store = this.combinations.slice();
    this.$table.addEventListener('click', this.step);
    this.$restartBtn.addEventListener('click', () => document.location.reload());
  },

  updateStore (arr, id, value) {
    return arr.map(subArr =>
      subArr.map(item => item === id ? value : item));
  },

  findWinner (arr, value) {
    return arr.findIndex(subArr =>
      subArr.every(item => item === value));
  },

  highlightWinner (winnerIndex) {
    const cellsArr = this.combinations[winnerIndex];

    cellsArr.forEach(item => {
      const $el = document.querySelector(`[data-id="${item}"]`);

      $el.classList.add('highlight');
    });
  }
};

// Work with matrix
function getEmptyMatrix (n) {
  return Array(n).fill(Array(n).fill(null)).map(item => item.slice());
}

function reverseMatrix (matrix, n) {
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

function getCombinations (n) {
  let counter = 0;

  const matrixWithValues = getEmptyMatrix(n).map(arr => arr.map(() => ++counter));
  const diagonals = getMatrixDiagonals(matrixWithValues, n);
  const reversedMatrix = reverseMatrix(matrixWithValues, n);

  return [...matrixWithValues, ...reversedMatrix, ...diagonals];
}
