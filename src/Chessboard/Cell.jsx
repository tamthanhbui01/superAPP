/* eslint-disable react/prop-types */
function Cell({ rowIdx, cellIdx, colorEven, colorOdd }) {
  return (
    <div
        style={{backgroundColor: (rowIdx + cellIdx) % 2 === 0 ? colorOdd : colorEven,}}
        className={`cell ${(rowIdx + cellIdx) % 2 == 0 ? "" : "black"}`}
    ></div>
  );
}
export default Cell;
