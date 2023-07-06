import { useEffect, useState } from "react";
import "./Chessboard.css";
import Cell from "./Cell";
function App() {
  const [chessBoard, setChessBoard] = useState([]);
  const [size, setSize] = useState(0);
  const [color, setColor] = useState({
    colorOdd: "#f6ffe3",
    colorEven: "#5d9948",
  });

  useEffect(() => {
    let board = [];
    for (let i = 0; i < size; i++) {
      let row = Array.from({ length: size });
      board.push(row);
    }
    setChessBoard(board);
  }, [size]);

  function changeColor() {
    const tempOdd = color.colorOdd;
    const tempEven = color.colorEven;
    setColor({ colorOdd: tempEven, colorEven: tempOdd });
  }

  return (
    <>
      <input
        type="number"
        min="0"
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
        }}
      />
      <input
        type="color"
        value={color.colorOdd}
        onChange={(e) => setColor({ ...color, colorOdd: e.target.value })}
      />
      <input
        type="color"
        value={color.colorEven}
        onChange={(e) => setColor({ ...color, colorEven: e.target.value })}
      />
      <br />
      <div className="board" onClick={changeColor}>
        {chessBoard.map((row, rowIdx) => (
          <div key={rowIdx} className="row ">
            {row.map((_, cellIdx) => (
              <Cell
                key={cellIdx}
                rowIdx={rowIdx}
                cellIdx={cellIdx}
                colorEven={color.colorEven}
                colorOdd={color.colorOdd}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
