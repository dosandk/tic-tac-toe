export function buildField (arr) {
  const $table = document.createElement('table');

  $table.setAttribute('id', 'table');

  arr.forEach(subArr => {
    const $tr = document.createElement('tr');

    subArr.forEach(item => $tr.appendChild(createCell(item)));
    $table.appendChild($tr);
  });

  function createCell (id) {
    const $td = document.createElement('td');

    $td.dataset.id = id;

    return $td;
  }

  return $table;
}

export function createResultField () {
  const $result = document.createElement('div');
  $result.textContent = 'Winner:';
  $result.setAttribute('id', 'result');

  return $result;
}

export function createRestartBtn () {
  const $resetBtn = document.createElement('button');
  $resetBtn.textContent = 'Restart Game';
  $resetBtn.setAttribute('id', 'restart-btn');

  return $resetBtn;
}
