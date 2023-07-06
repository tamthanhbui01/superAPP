import { Layout, Menu, Typography } from "antd";
import "./App.css";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Chessboard from "./Chessboard/Chessboard";
import Calculator from "./Calculator/Calculator";
import { SlidersOutlined } from "@ant-design/icons";
import HelloWorld from "./HelloWorld/HelloWorld";
import UnitConverter from "./UnitConverter/UnitConverter";
import Minesweeper from "./Minesweeper/Minesweeper";
import Pomodoro from "./Pomodoro/Pomodoro";

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

function App() {
  return (
    <BrowserRouter>
      <Layout className="main">
        <Header>
          <Text type="warning">Bui Thanh Tam</Text>
        </Header>

        <Layout>
          <Sider className="Sider">
            <Menu
              mode="vertical"
              items={[
                {
                  label: (
                    <Link to="/HelloWorld">
                      <SlidersOutlined /> Hello World
                    </Link>
                  ),
                  key: "1",
                },
                {
                  label: <Link to="/Chessboard">Chessboard</Link>,
                  key: "2",
                },
                {
                  label: <Link to="/Calculator">Calculator</Link>,
                  key: "3",
                },
                {
                  label: <Link to="/Pomodoro">Pomodoro</Link>,
                  key: "4",
                },
                {
                  label: <Link to="/Minesweeper">Minesweeper</Link>,
                  key: "5",
                },
                {
                  label: (
                    <Link to="/UnitConverter">
                      <Text type="warning" strong="true">
                        Unit Converter
                      </Text>
                    </Link>
                  ),
                  key: "6",
                },
              ]}
            />
          </Sider>
          <Content>
            <Routes>
              <Route path="/HelloWorld" element={<HelloWorld />} />
              <Route path="/Chessboard" element={<Chessboard />} />
              <Route path="/Calculator" element={<Calculator />} />
              <Route path="/Pomodoro" element={<Pomodoro />}></Route>
              <Route path="/Minesweeper" element={<Minesweeper />}></Route>
              <Route path="/UnitConverter" element={<UnitConverter />}></Route>
            </Routes>
          </Content>
        </Layout>

        <Footer style={{ textAlign: "center" }}>
          <Text type="success">End</Text>
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
