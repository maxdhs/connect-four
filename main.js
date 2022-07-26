let isPlayer1Turn = true;

const board = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
];

function getColumn(col) {
  let output = [];
  for (let arr of board) {
    if (arr[col]) {
      output.push(arr[col]);
    }
  }
  return output;
}

function getRow(row) {
  let output = [];
  for (let i = 0; i < board[row].length; i++) {
    output.push(board[row][i]);
  }
  return output;
}

let boardDiv = document.querySelector("#board");
let player1Span = document.querySelector("#player1Turn");
let player2Span = document.querySelector("#player2Turn");

function refreshBoard() {
  boardDiv.innerHTML = "";
  for (let j = 0; j < board[0].length; j++) {
    let div = document.createElement("div");
    div.classList.add("column");
    boardDiv.appendChild(div);
    for (let i = 0; i < board.length; i++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("data-column", j);
      square.setAttribute("data-row", i);
      square.textContent = board[i][j];
      div.appendChild(square);
    }
  }
  if (isPlayer1Turn) {
    player1Span.textContent = "🔴";
    player2Span.textContent = "";
  } else {
    player2Span.textContent = "🔵";
    player1Span.textContent = "";
  }
}

boardDiv.addEventListener("click", function (event) {
  let selectedColumn = event.target.dataset.column;
  let arr = getColumn(selectedColumn);
  if (arr.length == 6) {
    return;
  }
  isPlayer1Turn ? arr.push("🔴") : arr.push("🔵");
  board[board.length - arr.length][selectedColumn] = arr.pop();
  let selectedRow = board.length - arr.length - 1;
  checkWin(selectedColumn, selectedRow);
  isPlayer1Turn = !isPlayer1Turn;
  refreshBoard();
});

refreshBoard();

function checkWin(col, row) {
  let win = false;
  let token = isPlayer1Turn ? "🔴" : "🔵";

  function checkSouth(col, row) {
    let startCol = col;
    let startRow = row;
    let count = 0;
    while (
      board[startRow] &&
      board[startRow][startCol] &&
      board[startRow][startCol] === token
    ) {
      count = count + 1;
      startRow = startRow + 1;
    }
    if (count === 4) {
      win = true;
    }
  }

  checkSouth(col, row);
  console.log(win);
}

// function checkWin() {
//   let win = false;
//   function checkArrForWin(arr) {
//     for (let i = 0; i < arr.length; i++) {
//       let token = arr[i];
//       let count = 0;
//       for (let j = 0; j < arr.length; j++) {
//         if (token === arr[j]) {
//           count = count + 1;
//         } else {
//           break;
//         }
//       }
//       if (count == 4) {
//         return true;
//       }
//     }
//     return false;
//   }

//   // check all columns for a win
//   for (let i = 0; i < board[0].length; i++) {
//     if (checkArrForWin(getColumn(i))) {
//       win = true;
//     }
//   }

//   // check all rows for a win
//   for (let i = 0; i < board.length; i++) {
//     if (checkArrForWin(getRow(i))) {
//       win = true;
//     }
//   }

//   // check all diagnolas
//   let diag1 = [board[0][3], board[1][2], board[2][1], board[3][0]];
//   let diag2 = [board[0][4], board[1][3], board[2][2], board[3][1], board[4][0]];
// }
