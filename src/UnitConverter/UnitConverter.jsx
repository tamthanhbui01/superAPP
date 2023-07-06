import { useState } from "react";
import "./UnitConverter.css";
import Label from "./Label";
import { InputNumber } from "antd";
function App() {
  const [VND, setVND] = useState(0);
  const [USD, setUSD] = useState(0);

  return (
    <>
      <Label name={"From: "}></Label>
      <InputNumber
        style={{
          width: 500,
        }}
        value={VND}
        min={0}
        onChange={(value) => {
          setVND(value);
          setUSD(value / 22000);
        }}
      />
      <Label name="To: "></Label>
      <InputNumber
        style={{
          width: 500,
        }}
        min={0}
        value={USD}
        readOnly={true}
      />
    </>
  );
}

export default App;
