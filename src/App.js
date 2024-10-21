import React, { useState, useEffect } from "react";
import Board from "./Board";
import Timer from "./Timer";
import MoveList from "./MoveList";
import "./App.css";

const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"], // Black pieces
  ["p", "p", "p", "p", "p", "p", "p", "p"], // Black pawns
  ["", "", "", "", "", "", "", ""], // Empty squares
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"], // White pawns
  ["R", "N", "B", "Q", "K", "B", "N", "R"], // White pieces
];

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("white"); // White moves first
  const [moveList, setMoveList] = useState([]);
  const [whiteTime, setWhiteTime] = useState(600); // 10 minutes in seconds
  const [blackTime, setBlackTime] = useState(600);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedPos, setSelectedPos] = useState(null); // New state to track selected position
  const [timerId, setTimerId] = useState(null); // To store interval ID

  useEffect(() => {
    // Clear the existing interval to avoid multiple timers
    if (timerId) {
      clearInterval(timerId);
    }

    // Start the timer for the current player
    if (currentPlayer === "white") {
      setTimerId(setInterval(() => setWhiteTime((prev) => prev - 1), 1000));
    } else {
      setTimerId(setInterval(() => setBlackTime((prev) => prev - 1), 1000));
    }

    // Clear the interval when component unmounts or when player changes
    return () => clearInterval(timerId);
  }, [currentPlayer]);

  // Check if the piece belongs to the current player
  const isCorrectTurn = (piece) => {
    if (!piece) return false;
    return (
      (currentPlayer === "white" && piece === piece.toUpperCase()) ||
      (currentPlayer === "black" && piece === piece.toLowerCase())
    );
  };

  const handlePieceClick = (row, col) => {
    const piece = board[row][col];
    // If a piece is already selected, attempt to move it
    if (selectedPos) {
      const startPos = selectedPos;
      const endPos = { row, col };
      handleMove(startPos, endPos);
    } else if (isCorrectTurn(piece)) {
      // Select the piece if it's the correct player's turn
      setSelectedPiece(piece);
      setSelectedPos({ row, col });
    } else {
      alert(`It's ${currentPlayer === "white" ? "White's" : "Black's"} turn!`);
    }
  };

  const handleMove = (startPos, endPos) => {
    const newBoard = [...board];
    const piece = newBoard[startPos.row][startPos.col];

    // Validate the move
    if (!isValidMove(startPos, endPos, piece)) {
      alert("Invalid move!");
      return;
    }

    // Move the piece to the new position
    newBoard[endPos.row][endPos.col] = piece; // Move the piece
    newBoard[startPos.row][startPos.col] = ""; // Clear the original position

    // Update the board
    setBoard(newBoard);

    // Add move to the move list
    const moveNotation = calculateMoveNotation(startPos, endPos, piece);
    setMoveList([...moveList, moveNotation]);

    // Switch player after move
    setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
    setSelectedPiece(null); // Reset the selected piece
    setSelectedPos(null); // Reset the selected position
  };

  const isValidMove = (startPos, endPos, piece) => {
    // Basic validation logic (you can enhance this based on piece type)
    // Ensure the end position is not occupied by the same player's piece
    const targetPiece = board[endPos.row][endPos.col];
    if (isCorrectTurn(targetPiece)) {
      return false; // Cannot move to a square occupied by own piece
    }

    // Add further specific move validation based on piece type
    // For now, we allow all moves as valid (you can expand this logic)
    return true; // Allow the move if it's valid
  };

  const calculateMoveNotation = (startPos, endPos, piece) => {
    // Simple move notation (can be enhanced)
    return `${piece.toUpperCase()} from ${startPos.row},${startPos.col} to ${
      endPos.row
    },${endPos.col}`;
  };

  return (
    <div className="App">
      <h1>Offline Chess Game</h1>
      <div className="game-container">
        <div className="turn-indicator">
          <h2>{currentPlayer === "white" ? "White's Turn" : "Black's Turn"}</h2>
        </div>
        <div className="board-timer-moves">
          <Board
            board={board}
            currentPlayer={currentPlayer}
            handlePieceClick={handlePieceClick} // Pass the click handler
          />
          <div className="info-panel">
            <Timer
              whiteTime={whiteTime}
              blackTime={blackTime}
              currentPlayer={currentPlayer}
            />
            <MoveList moveList={moveList} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
