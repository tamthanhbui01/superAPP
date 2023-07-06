import { useState } from "react";
import { Button, Space } from "antd";

function HelloWorld() {
  const [store, setStore] = useState([]);

  return (
    <>
      <Space>
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
      {store.map((_, idx) => (
        <div key={idx}>Hello World</div>
      ))}
    </>
  );
}
export default HelloWorld;
