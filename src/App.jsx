import { Layout, Menu, Typography } from "antd";
import "./App.css";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Chessboard from "./Chessboard/Chessboard";
import Calculator from "./Calculator/Calculator";
import HelloWorld from "./HelloWorld/HelloWorld";
import UnitConverter from "./UnitConverter/UnitConverter";
import Minesweeper from "./Minesweeper/Minesweeper";
import Pomodoro from "./Pomodoro/Pomodoro";
import Profile from "./Profile/Profile";
import Pages from "./Pages/Pages";
import Help from "./Help/Help";

import helloURL from "../public/icon/hello.svg";
import chessURL from "../public/icon/chess-svgrepo-com.svg";
import calcURL from "../public/icon/calculator-svgrepo-com.svg";
import pomodoroURL from "../public/icon/tomato-svgrepo-com.svg";
import converterURL from "../public/icon/exchange-dollar-svgrepo-com.svg";
import TamPNG from "../public/icon/Tam.jpg";

import { useState } from "react";

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <BrowserRouter>
      <Layout className="main">
        <Header style={{ background: "#ffffff", padding: "0px 0px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "64px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "64px",
                width: 200,
                gap: 8,
              }}
            >
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/ios-filled/50/000000/circled-s.png"
              />
              <Text style={{ fontSize: 32, fontWeight: "bolder" }}>Super</Text>
            </div>
            <div style={{ flex: 1 }}>
              <Menu
                style={{ width: "100%" }}
                mode="horizontal"
                items={[
                  {
                    label: (
                      <Link to="/Profile">
                        <Text>Profile</Text>
                      </Link>
                    ),
                    key: "1",
                  },
                  {
                    label: (
                      <Link to="/Pages">
                        <Text>Pages</Text>
                      </Link>
                    ),
                    key: "2",
                  },
                  {
                    label: (
                      <Link to="/Help">
                        <Text>Help</Text>
                      </Link>
                    ),
                    key: "3",
                  },
                ]}
              ></Menu>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Text
                style={{ fontWeight: 500, color: "", fontSize: 16 }}
                type="success"
              >
                Bùi Thành Tâm
              </Text>
              <img
                src={TamPNG}
                style={{ width: 32, height: 32, borderRadius: "50%" }}
              ></img>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider
            collapsible
            onCollapse={handleCollapsed}
            className="Sider"
            collapsed={collapsed}
            style={{ background: "#2b3a4a", width: 150 }}
          >
            <Menu
              style={{ marginTop: "10px", background: "transparent" }}
              mode="inline"
              items={[
                {
                  label: (
                    <Link to="/HelloWorld">
                      <Text strong={true} type={"warning"}>
                        Hello World
                      </Text>
                    </Link>
                  ),
                  key: "1",
                  icon: <img src={helloURL}></img>,
                  style: { paddingInline: "24px" },
                },
                {
                  label: (
                    <Link to="/Chessboard">
                      <Text strong={true} type={"warning"}>
                        Chessboard
                      </Text>
                    </Link>
                  ),
                  key: "2",
                  icon: <img src={chessURL}></img>,
                  style: { paddingInline: "24px" },
                },
                {
                  label: (
                    <Link to="/Calculator">
                      <Text strong={true} type={"warning"}>
                        Calculator
                      </Text>
                    </Link>
                  ),
                  key: "3",
                  icon: <img src={calcURL}></img>,
                  style: { paddingInline: "24px" },
                },
                {
                  label: (
                    <Link to="/Pomodoro">
                      <Text strong={true} type={"warning"}>
                        Pomodoro
                      </Text>
                    </Link>
                  ),
                  key: "4",
                  icon: <img src={pomodoroURL}></img>,
                  style: { paddingInline: "24px" },
                },
                // {
                //   label: <Link to="/Minesweeper">Minesweeper</Link>,
                //   key: "5",
                // },
                {
                  label: (
                    <Link to="/UnitConverter">
                      <Text type="warning" strong="true">
                        Unit Converter
                      </Text>
                    </Link>
                  ),
                  key: "6",
                  icon: <img src={converterURL}></img>,
                  style: { paddingInline: "24px" },
                },
              ]}
            />
          </Sider>
          <Content>
            <Routes>
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Pages" element={<Pages />} />
              <Route path="/Help" element={<Help />} />

              <Route path="/HelloWorld" element={<HelloWorld />} />
              <Route path="/Chessboard" element={<Chessboard />} />
              <Route path="/Calculator" element={<Calculator />} />
              <Route path="/Pomodoro" element={<Pomodoro />}></Route>
              <Route path="/Minesweeper" element={<Minesweeper />}></Route>
              <Route path="/UnitConverter" element={<UnitConverter />}></Route>
            </Routes>
          </Content>
        </Layout>

        <Footer style={{ textAlign: "center", background: "#2b3a4a" }}>
          <Text type="warning">Copyright by Bui Thanh Tam</Text>
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
