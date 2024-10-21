import React from "react";

const Piece = ({ type, color }) => {
  const symbols = {
    pawn: color === "white" ? "White Pawn" : "Black Pawn",
    rook: color === "white" ? "White Rook" : "Black Rook",
    knight: color === "white" ? "White Knight" : "Black Knight",
    bishop: color === "white" ? "White Bishop" : "Black Bishop",
    queen: color === "white" ? "White Queen" : "Black Queen",
    king: color === "white" ? "White King" : "Black King",
  };

  return (
    <span className="piece" role="img" aria-label={`${color} ${type}`}>
      {symbols[type]}
    </span>
  );
};

export default Piece;
