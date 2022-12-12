const gameBoard = document.getElementById('game-board');
const columns = document.querySelectorAll('.column');
let currentPlayer = 'red';

function checkForWin() {
    // get all slots on the game board
    const slots = document.querySelectorAll('.slot');
  
    // arrays for storing sequences of game pieces
    const horizontal = [];
    const vertical = [];
    const diagonal1 = [];
    const diagonal2 = [];
  
    // loop through all slots on the game board
    slots.forEach(slot => {
      // get the row and column index of the current slot
      const row = slot.parentElement.rowIndex;
      const col = slot.cellIndex;
  
      // add the current slot to the appropriate arrays
      horizontal[row] = (horizontal[row] || []);
      horizontal[row].push(slot);
      vertical[col] = (vertical[col] || []);
      vertical[col].push(slot);
      diagonal1[row + col] = (diagonal1[row + col] || []);
      diagonal1[row + col].push(slot);
      diagonal2[row - col] = (diagonal2[row - col] || []);
      diagonal2[row - col].push(slot);
    });
  
    // check if any of the arrays contain a sequence of four game pieces belonging to the same player
    if (horizontal.some(checkSequence) ||
        vertical.some(checkSequence) ||
        diagonal1.some(checkSequence) ||
        diagonal2.some(checkSequence)) {
      return true;
    }
  
    return false;
  }
  
  function checkSequence(sequence) {
    // check if the given sequence contains a sequence of four game pieces belonging to the same player
    if (sequence.length >= 4) {
      for (let i = 0; i < sequence.length - 3; i++) {
        if (sequence[i].classList.contains('red') &&
            sequence[i + 1].classList.contains('red') &&
            sequence[i + 2].classList.contains('red') &&
            sequence[i + 3].classList.contains('red')) {
          return true;
        } else if (sequence[i].classList.contains('yellow') &&
                   sequence[i + 1].classList.contains('yellow') &&
                   sequence[i + 2].classList.contains('yellow') &&
                   sequence[i + 3].classList.contains('yellow')) {
          return true;
        }
      }
    }
  
    return false;
  }

  function handleTurn(e) {
    // get the clicked column and its slots
    const column = e.currentTarget;
    const slotsInColumn = column.querySelectorAll('.slot');
  
    // find the bottom-most empty slot in the column
    let emptySlot = null;
    for (const slot of slotsInColumn) {
      if (!slot.classList.contains('red') && !slot.classList.contains('yellow')) {
        emptySlot = slot;
        break;
      }
    }
  
    // if the column is not full, add a game piece belonging to the current player to the bottom-most empty slot
    if (emptySlot) {
      emptySlot.classList.add(currentPlayer);
  
      // check if the current player has won the game
      if (checkForWin()) {
        alert(`Player ${currentPlayer} wins!`);
        return;
      }
  
      // switch the current player
      currentPlayer = (currentPlayer === 'red') ? 'yellow' : 'red';
    }
  }

columns.forEach(column => column.addEventListener('click', handleTurn));