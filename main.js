const ticTacToe = {
  clicksCounter: 0,
  combinations: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 5, 9],
    [3, 5, 7]
  ],

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
      } else if (this.clicksCounter === 9) {
        this.$result.textContent += ' Draw!';
      }
    }
  },

  initialize () {
    this.step = this.step.bind(this);

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

