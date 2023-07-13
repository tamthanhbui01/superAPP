import { useState } from "react";
import { Button, Space, Typography } from "antd";
const {Text} = Typography
function HelloWorld() {
  const [store, setStore] = useState([]);

  return (
    <>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:10}}>
      <Space >
        <Button
          
          onClick={() => {
            let arr = [...store];
            arr.push("");
            console.log(arr.length);
            setStore(arr);
          }}
        >
          Add me
        </Button>
        <Button
          onClick={() => {
            store.pop();
            let arr = [...store];
            setStore(arr);
          }}
        >
          Remove me
        </Button>
      </Space>
      </div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginTop:10}}>
      {store.map((_, idx) => (
        <Text style={{fontWeight:'bold'}} type="success" key={idx}>Hello World</Text>
      ))}
      </div>
    </>
  );
}
export default HelloWorld;
