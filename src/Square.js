import React from "react";
import Piece from "./Piece";

const Square = ({ piece, onClick, highlight }) => {
  return (
    <div className={`square ${highlight ? "highlight" : ""}`} onClick={onClick}>
      {piece && <Piece type={piece.type} color={piece.color} />}
    </div>
  );
};

export default Square;
