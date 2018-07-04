import {updateStore, findWinner, getCombinations, getMatrix} from './algorithms-methods.js';
import {buildField, createResultField, createRestartBtn} from './render-methods.js';

export default class TicTacToe {
  constructor (selector, options = {n: 3}) {
    this.n = options.n;
    this.clicksCounter = 0;
    this.combinations = getCombinations(this.n);

    this.$el = document.querySelector(selector);

    this.step = this.step.bind(this);
  }

  step (event) {
    const {target} = event;
    const id = parseInt(target.dataset.id, 10);
    const value = this.clicksCounter % 2 ? 'O' : 'X';
    const isEmptyCell = target.tagName === 'TD' && !target.textContent;

    if (isEmptyCell) {
      this.store = updateStore(this.store, id, value);
      target.textContent = value;
      this.clicksCounter += 1;

      const winnerIndex = findWinner(this.store, value);

      if (winnerIndex >= 0) {
        this.highlightWinner(winnerIndex);
        this.$result.textContent += ` ${value} wins!`;
        this.$table.removeEventListener('click', this.step);
      } else if (this.clicksCounter === Math.pow(this.n, 2)) {
        this.$result.textContent += ' Draw!';
      }
    }
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
      const $cell = this.$el.querySelector(`[data-id="${item}"]`);

      $cell.classList.add('highlight');
    });
  }
}
