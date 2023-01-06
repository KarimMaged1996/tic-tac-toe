// factory function that will create the players
function player(name, marker) {
  return { name, marker };
}

/* the Module that will control the board on the page
   includes a function rebder that will render the Xs and Os on the page,
   includes a function add to board that will add Xs abd Ox to board array,
   includes a function restart that will reset everything when restart button 
   is clicked. (All properties and methods are private)
*/
const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];
  let counter = 0;

  // select the markers from the dom
  let markers = Array.from(document.querySelectorAll('.marker'));

  function render(board) {
    markers.forEach((marker, index) => {
      marker.textContent = board[index];
    });
  }

  function addToBoard(marker, index) {
    board[index] = marker;
  }

  // event handler for the markers
  markers.forEach((elem, index) => {
    elem.addEventListener('click', function (e) {
      // the if condition is used so this function won't replace existing marker
      if (e.target.textContent === '') {
        addToBoard(gameController.activePlayer(counter).marker, index);
        render(board);
        counter++;
        gameController.checkWinOrDraw(board, counter);
      }
    });
  });

  function restart() {
    const message = document.querySelector('.message');
    const gameBrd = document.querySelector('.board');
    const players = document.querySelectorAll('.players');
    gameBrd.style.opacity = 1;
    players[0].style.opacity = 1;
    players[1].style.opacity = 1;
    players[0].style.color = 'black';
    players[1].style.color = 'black';
    message.remove();
    board = ['', '', '', '', '', '', '', '', ''];
    render(board);
    counter = 0;
  }

  document.addEventListener('click', (e) => {
    if (e.target.textContent === 'restart') {
      restart();
    }
  });
})();

/* Moddule that will control the flow of the game 
   includes a function activePlayer that will check for the axtive player 
   (either X or o) based on a counter provided.
   includes a helper (private) function endGame taht will fire uopn win or draw
   includes a function checkWinOrDraw that will check if there is a win or draw
*/
const gameController = (function () {
  const players = document.querySelectorAll('.players');
  const playerX = player('player X', 'X');
  const playerY = player('player O', 'O');

  function activePlayer(counter) {
    if (counter === 0 || counter % 2 === 0) {
      players[0].style.color = 'black';
      players[1].style.color = 'red';
      return playerX;
    } else {
      players[0].style.color = 'red';
      players[1].style.color = 'black';
      return playerY;
    }
  }

  function endGame(message) {
    const body = document.querySelector('body');
    const board = document.querySelector('.board');
    board.style.opacity = 0.3;
    players[0].style.opacity = 0.3;
    players[1].style.opacity = 0.3;
    let messageContainer = document.createElement('div');
    let msg = document.createElement('div');
    msg.textContent = message;
    let btn = document.createElement('button');
    btn.textContent = 'restart';
    messageContainer.append(msg, btn);
    messageContainer.classList = 'message';
    body.append(messageContainer);
  }

  function checkWinOrDraw(board, counter) {
    if (board[0] === board[1] && board[0] === board[2] && board[0] !== '') {
      endGame(`The winner is player ${board[0]}`);
    } else if (
      board[3] === board[4] &&
      board[3] === board[5] &&
      board[3] !== ''
    ) {
      endGame(`The winner is player ${board[3]}`);
    } else if (
      board[6] === board[7] &&
      board[7] === board[8] &&
      board[6] !== ''
    ) {
      endGame(`The winner is player ${board[6]}`);
    } else if (
      board[0] === board[3] &&
      board[0] === board[6] &&
      board[0] !== ''
    ) {
      endGame(`The winner is player ${board[0]}`);
    } else if (
      board[1] === board[4] &&
      board[1] === board[7] &&
      board[1] !== ''
    ) {
      endGame(`The winner is player ${board[1]}`);
    } else if (
      board[2] === board[5] &&
      board[2] === board[8] &&
      board[2] !== ''
    ) {
      endGame(`The winner is player ${board[2]}`);
    } else if (
      board[0] === board[4] &&
      board[0] === board[8] &&
      board[0] !== ''
    ) {
      endGame(`The winner is player ${board[0]}`);
    } else if (
      board[2] === board[4] &&
      board[2] === board[6] &&
      board[2] !== ''
    ) {
      endGame(`The winner is player ${board[2]}`);
    } else if (counter === 9) {
      endGame(`it is a Draw`);
    }
  }

  return { activePlayer, checkWinOrDraw };
})();
