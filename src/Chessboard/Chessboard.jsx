import { useEffect, useState } from "react";
import "./Chessboard.css";
import Cell from "./Cell";
import { ColorPicker, InputNumber, Space,Typography } from "antd";
const{Text} = Typography
function App() {
  const [chessBoard, setChessBoard] = useState([]);
  const [size, setSize] = useState(8);
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
    <div style={{backgroundColor:"rgba(75, 72, 71,0.8)", minWidth:'100%', minHeight:'100%' }}>
    <Space direction="vertical" style={{alignItems:'center', display:'flex', justifyContent:'center'}}>
      <Space style={{marginTop:"8px"}}> 
        <Text style={{fontWeight:"bolder", color:'white'}}>Size:</Text>
      <InputNumber
        min="0"
        max="50"
        value={size}
        onChange={(e) => {
          setSize(e);
        }}
      />
      </Space>
      <div>
      <Space>
      <ColorPicker
        value={color.colorOdd}
        onChange={(e) => setColor({ ...color, colorOdd: e.toHexString() })}
      />
      <ColorPicker
        value={color.colorEven}
        onChange={(e) => setColor({ ...color, colorEven: e.toHexString() })}
      />
      </Space>
      </div>
      <div className="board" onClick={changeColor}>
        {chessBoard.map((row, rowIdx) => (
          <div key={rowIdx} className="row ">
            {row.map((_, cellIdx) => (
              <Cell
                size={size}
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
    </Space>
    </div>
  );
}
export default App;
