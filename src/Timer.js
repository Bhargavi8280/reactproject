import React from "react";

const Timer = ({ whiteTime, blackTime, currentPlayer }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="timer">
      <h2>Timers</h2>
      <div className="player-timer">
        <span>White: {formatTime(whiteTime)}</span>
        {currentPlayer === "white" && <span> (Current Turn)</span>}
      </div>
      <div className="player-timer">
        <span>Black: {formatTime(blackTime)}</span>
        {currentPlayer === "black" && <span> (Current Turn)</span>}
      </div>
    </div>
  );
};

export default Timer;
