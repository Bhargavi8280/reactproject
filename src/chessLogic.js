import { useState, useEffect } from "react";

const initialBoard = () => {
  return [
    [
      { piece: { type: "R", color: "black" } },
      { piece: { type: "N", color: "black" } },
      { piece: { type: "B", color: "black" } },
      { piece: { type: "Q", color: "black" } },
      { piece: { type: "K", color: "black" } },
      { piece: { type: "B", color: "black" } },
      { piece: { type: "N", color: "black" } },
      { piece: { type: "R", color: "black" } },
    ],
    [
      { piece: { type: "P", color: "black" } },
      { piece: { type: "P", color: "black" } },
      { piece: { type: "P", color: "black" } },
      { piece: { type: "P", color: "black" } },
      { piece: { type: "P", color: "black" } },
      { piece: { type: "P", color: "black" } },
      { piece: { type: "P", color: "black" } },
      { piece: { type: "P", color: "black" } },
    ],
    [
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
    ],
    [
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
    ],
    [
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
    ],
    [
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
      { piece: null },
    ],
    [
      { piece: { type: "P", color: "white" } },
      { piece: { type: "P", color: "white" } },
      { piece: { type: "P", color: "white" } },
      { piece: { type: "P", color: "white" } },
      { piece: { type: "P", color: "white" } },
      { piece: { type: "P", color: "white" } },
      { piece: { type: "P", color: "white" } },
      { piece: { type: "P", color: "white" } },
    ],
    [
      { piece: { type: "R", color: "white" } },
      { piece: { type: "N", color: "white" } },
      { piece: { type: "B", color: "white" } },
      { piece: { type: "Q", color: "white" } },
      { piece: { type: "K", color: "white" } },
      { piece: { type: "B", color: "white" } },
      { piece: { type: "N", color: "white" } },
      { piece: { type: "R", color: "white" } },
    ],
  ];
};

export const useChess = () => {
  const [board, setBoard] = useState(initialBoard());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [activePlayer, setActivePlayer] = useState("white");
  const [moves, setMoves] = useState([]);
  const [timers, setTimers] = useState({ white: 300, black: 300 });

  const selectSquare = (row, col) => {
    // Implement selection and move logic
    // This is a placeholder for actual move logic
    if (selectedSquare) {
      const move = `${selectedSquare.col}${selectedSquare.row} to ${col}${row}`;
      setMoves((prev) => [...prev, move]);
      setActivePlayer(activePlayer === "white" ? "black" : "white");
      setSelectedSquare(null);
    } else {
      setSelectedSquare({ row, col });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimers((prev) => ({
        ...prev,
        [activePlayer]: prev[activePlayer] - 1,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [activePlayer]);

  return { board, selectSquare, selectedSquare, activePlayer, moves, timers };
};
