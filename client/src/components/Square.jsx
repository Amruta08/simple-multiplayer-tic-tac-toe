import React, { useState } from "react";

export default function Square({ chooseSquare, val }) {
  return (
    <div className="square" onClick={chooseSquare}>
      {val}
    </div>
  );
}
