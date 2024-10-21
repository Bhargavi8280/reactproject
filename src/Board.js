import React from "react";
import "./Board.css"; // Add your CSS file for styling

const pieceSymbols = {
  P: "♙", // White Pawn
  R: "♖", // White Rook
  N: "♘", // White Knight
  B: "♗", // White Bishop
  Q: "♕", // White Queen
  K: "♔", // White King
  p: "♟", // Black Pawn
  r: "♜", // Black Rook
  n: "♞", // Black Knight
  b: "♝", // Black Bishop
  q: "♛", // Black Queen
  k: "♚", // Black King
};

const Board = ({ board, handlePieceClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((piece, colIndex) => (
            <div
              className={`board-square ${
                (rowIndex + colIndex) % 2 === 0
                  ? "white-square"
                  : "black-square"
              }`}
              key={colIndex}
              onClick={() => handlePieceClick(rowIndex, colIndex)} // Call the click handler
            >
              {piece && <span className="piece">{pieceSymbols[piece]}</span>}{" "}
              {/* Use the symbol */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
