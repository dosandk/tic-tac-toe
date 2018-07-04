import {updateStore, findWinner, getCombinations, getMatrix, getEmptyCells} from './algorithms-methods.js';
import {buildField, createResultField, createRestartBtn} from './render-methods.js';

export default class TicTacToe {
  constructor (selector, options = {n: 3, mode: 'PvAi'}) {
    this.n = options.n;
    this.mode = options.mode;
    this.clicksCounter = 0;
    this.combinations = getCombinations(this.n);

    this.$el = document.querySelector(selector);

    this.step = this.step.bind(this);
  }

  step (event) {
    const {target} = event;
    const id = parseInt(target.dataset.id, 10);
    const value = this.mode === 'PvAi' ? 'X' : this.clicksCounter % 2 ? 'O' : 'X';
    const isEmptyCell = target.tagName === 'TD' && !target.textContent;

    if (isEmptyCell) {
      this.store = updateStore(this.store, id, value);
      target.textContent = value;
      this.clicksCounter += 1;

      // TODO: move to the some method
      const winnerIndex = findWinner(this.store, value);
      const emptyCells = getEmptyCells(this.store);

      if (winnerIndex >= 0) {
        this.highlightWinner(winnerIndex);
        this.$result.textContent += ` ${value} wins!`;
        this.$table.removeEventListener('click', this.step);
      } else if (emptyCells.length === 0) {
        this.$result.textContent += ' Draw!';
      } else if (this.mode === 'PvAi') {
        this.aiStep();
      }
    }
  }

  aiStep () {
    const value = 'O';
    const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const emptyCells = getEmptyCells(this.store.slice(0, 3));
    const randomValue = getRandomValue(0, emptyCells.length);
    const matrixValue = emptyCells[randomValue];

    this.store = updateStore(this.store, matrixValue, value);

    const $cell = this.getCell(matrixValue);
    $cell.textContent = value;
  }

  // TODO: implement universal "render" method
  render () {
    this.$table = buildField(getMatrix(this.n));
    this.$result = createResultField();
    this.$restartBtn = createRestartBtn();

    this.$el.appendChild(this.$result);
    this.$el.appendChild(this.$table);
    this.$el.appendChild(this.$restartBtn);

    this.store = this.combinations.slice();
    this.$table.addEventListener('click', this.step);
    this.$restartBtn.addEventListener('click', () => document.location.reload());
  }

  highlightWinner (winnerIndex) {
    const cellsArr = this.combinations[winnerIndex];

    cellsArr.forEach(item => {
      const $cell = this.getCell(item);

      $cell.classList.add('highlight');
    });
  }

  getCell (id) {
    return this.$el.querySelector(`[data-id="${id}"]`);
  }
}
