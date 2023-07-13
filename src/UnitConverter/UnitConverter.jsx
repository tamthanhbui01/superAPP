import { useState } from "react";
import { InputNumber, Typography,Space } from "antd";
const {Text} = Typography
function App() {
  const [VND, setVND] = useState(0);
  const [USD, setUSD] = useState(0);

  return (
    <div style={{minWidth:'100%',height:'80vh',display:"flex", justifyContent:'center', alignItems:'center'}}>
      <Space direction="vertical">
      <Text >From: VND </Text>
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
      <Text >To: USD </Text>
      <InputNumber
        style={{
          width: 500,
        }}
        min={0}
        value={USD}
        readOnly={true}
      />
      </Space>
    </div>
  );
}

export default App;
