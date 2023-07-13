/* eslint-disable react/prop-types */
function Cell({ rowIdx, cellIdx, colorEven, colorOdd,size }) {
  return (
    <div
        style={{backgroundColor: (rowIdx + cellIdx) % 2 === 0 ? colorOdd : colorEven,
          width: size>=12? `calc(40vw/${size})`:'50px', 
          height: size>=12? `calc(40vw/${size})`:'50px',
        }}
        className={`cell ${(rowIdx + cellIdx) % 2 == 0 ? "" : "black"}`}
    ></div>
  );
}
export default Cell;
