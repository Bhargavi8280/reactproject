import React from "react";

const MoveList = ({ moveList }) => {
  return (
    <div className="move-list">
      <h2>Move List</h2>
      <ul>
        {moveList.map((move, index) => (
          <li key={index}>
            {index + 1}. {move}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoveList;
