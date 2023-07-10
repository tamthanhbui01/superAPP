import { useState, useEffect } from "react";
import checkedURL from "../icon/checked-svgrepo-com.svg"
import forwardURL from "../icon/forward-end-fill-svgrepo-com.svg"
import {
  Button,
  Space,
  Layout,
  Typography,
  Input,
  Modal,
  InputNumber,
  Switch,
  ColorPicker,
  Dropdown,
} from "antd";
import { CloseCircleOutlined  } from "@ant-design/icons";
const { Text, Title } = Typography;

function Pomodoro() {
  const [defaultWorkingTime, setDefaultWorkingTime] = useState(1500);
  const [defaultRestingTime, setDefaultRestingTime] = useState(300);
  const [workingTime, setWorkingTime] = useState(defaultWorkingTime);
  const [restingTime, setRestingTime] = useState(defaultRestingTime);
  const [currentStatus, setCurrentStatus] = useState("working");
  const [now, setNow] = useState(new Date());
  const [isPause, setIsPause] = useState(true);
  const [currentTask, setCurrentTask] = useState("Time to focus!");
  const [taskItems, setTaskItems] = useState([]);
  const [addTask, setAddTask] = useState(true);
  const [taskInputValue, setTaskInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pomodoroColor, setPomodoroColor] = useState("#EA738D");
  const [shortBreakColor, setShortBreakColor] = useState("#89ABE3");
  const [isCheck, setIsCheck] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setNow(new Date());
    }, 1000);
  }, [now]);
  useEffect(() => {
    setWorkingTime(defaultWorkingTime);
    setRestingTime(defaultRestingTime);
  }, [defaultWorkingTime, defaultRestingTime]);
  useEffect(() => {
    if (isPause) return;
    let time = setTimeout(() => {
      if (currentStatus === "working") {
        if (workingTime === 0) {
          setCurrentStatus("resting");
          setWorkingTime(defaultWorkingTime);
          setIsPause(!isPause);
        } else {
          setWorkingTime(workingTime - 1);
        }
      }
      if (currentStatus === "resting") {
        if (restingTime === 0) {
          setCurrentStatus("working");
          setRestingTime(defaultRestingTime);
          setIsPause(!isPause);
        } else {
          setRestingTime(restingTime - 1);
        }
      }
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, [
    currentStatus,
    workingTime,
    restingTime,
    isPause,
    defaultWorkingTime,
    defaultRestingTime,
  ]);
  return (
    <Layout
      style={{
        display: "flex",
        minWidth: "100%",
        minHeight: "100%",
        backgroundColor:
          currentStatus === "working" ? pomodoroColor : shortBreakColor,
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Space
        style={{
          display: "flex",
          width: 500,
          height: 40,
          justifyContent: "space-between",
        }}
      >
        <Space>
        <img src={checkedURL} style={{width:"24px", height:"24px", transform:"translateY(2px)"}}></img> 
        <Text style={{color:"white", fontWeight:"bolder", fontSize:"24px"}}>
          Pomodoro
        </Text>
        </Space>
        <Button
          style={{
            backgroundColor:"rgba(255,255,255,0.2",
            fontWeight:'bold',
            color:'white'  
          }}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Setting
        </Button>
      </Space>

      <Modal
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        maskClosable={true}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            OK
          </Button>
        }
      >
        <Space direction="vertical">
          <Title level={3}>Setting</Title>
          <Title level={3}>(icon) Timer</Title>
          <Title level={4}>Time (seconds)</Title>
          <Space direction="horizontal">
            <Space direction="vertical">
              <Text style={{fontSize:"16px"}}>Pomodoro</Text>
              <InputNumber
                value={defaultWorkingTime}
                min={0}
                onChange={(e) => {
                  setDefaultWorkingTime(e);
                }}
              ></InputNumber>
            </Space>
            <Space direction="vertical">
              <Text style={{fontSize:"16px"}}>Short Break</Text>
              <InputNumber
                value={defaultRestingTime}
                min={0}
                onChange={(e) => {
                  setDefaultRestingTime(e);
                }}
              ></InputNumber>
            </Space>
          </Space>
          <Text>(Theme-icon) Theme</Text>
          <Space direction="vertical">
            <Space>
              <Text>Color Themes:</Text>
              <ColorPicker
                value={pomodoroColor}
                onChange={(e) => {
                  setPomodoroColor(e.toHexString());
                }}
              ></ColorPicker>
              <ColorPicker
                value={shortBreakColor}
                onChange={(e) => {
                  setShortBreakColor(e.toHexString());
                }}
              ></ColorPicker>
            </Space>
            <Space>
              <Text>Dark Mode when running</Text>
              <Switch
                checked={isCheck}
                onChange={() => {
                  setIsCheck(!isCheck);
                }}
              ></Switch>
            </Space>
          </Space>
        </Space>
      </Modal>
      <Layout
        className="clock"
        style={{
          backgroundColor: "rgba(255, 255, 255,0.3)",
          width: "500px",
          height: "320px",
          borderRadius: "10px",
        }}
      >
        <Space direction="vertical" style={{ paddingTop: "10px" }}>
          <Space style={{ justifyContent: "space-evenly", width: "200px" }}>
            <Button
              type="text"
              style={{color:"white", fontWeight:"bold", fontSize:"16px"}}
              onClick={() => {
                if (currentStatus !== "working") {
                  setCurrentStatus("working");
                  setWorkingTime(defaultWorkingTime);
                  setIsPause(true);
                }
              }}
            >
              Pomodoro
            </Button>
            <Button 
              type="text"
              style={{color:"white", fontWeight:"bold", fontSize:"16px"}}    
              onClick={() => {
                if (currentStatus !== "resting") {
                  setCurrentStatus("resting");
                  setRestingTime(defaultRestingTime);
                  setIsPause(true);
                }
              }}
            >
              Short Break
            </Button>
          </Space>
          
            <Text style={{ fontSize: "120px", color:"white", fontWeight:"bold"}}>
              {currentStatus === "working" ? workingTime : restingTime}
            </Text>
          
          <Space>
            <Button
              style={{color:currentStatus==="working"?pomodoroColor:shortBreakColor, fontWeight:"bold", fontSize:"28px", height:"60px", width:"188px"}}
              onClick={() => {
                setIsPause(!isPause);
                if (!isPause && isCheck && currentStatus === "working") {
                  console.log(pomodoroColor);
                }
              }}
            >
              {isPause ? "START" : "PAUSE"}
            </Button>
            {isPause ? (
              ""
            ) : (
              <Button
                type="ghost"
                size="large"
                onClick={() => {
                  if (currentStatus === "working") {
                    setCurrentStatus("resting");
                    setWorkingTime(defaultWorkingTime);
                    setIsPause(!isPause);
                  } else if (currentStatus === "resting") {
                    setCurrentStatus("working");
                    setRestingTime(defaultRestingTime);
                    setIsPause(!isPause);
                  }
                }}
              >
                <img src={forwardURL}
                  style={{ backgroundColor: "rgba(255,255,255,0)" }}
                />
              </Button>
            )}
          </Space>
        </Space>
      </Layout>
      <Layout
        className="currentTask"
        style={{
          minWidth: "100%",
          height: 100,
          backgroundColor: "transparent",
          justifyContent: "center",
        }}
      >
        <Text style={{fontSize:"24px", fontWeight:"bolder", color:"white"}}>{currentTask}</Text>
      </Layout>
      <Layout
        className="tasksList"
        style={{
          minWidth: "100%",
          height: 300,
          backgroundColor: "transparent",
          alignItems: "center",
        }}
      >
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "500px",
            
          }}
        >
          <Text style={{color:"white", fontSize:"18px", fontWeight:"bold"}}>Tasks List</Text>
          <Text>Hi</Text>
        </Space>
        {taskItems.map((item, idx) => (
          <div
            style={{
              border: "1px solid black", 
              width: "500px", 
              marginTop:"12px", 
              backgroundColor:"white"
          }}
            key={idx}
            onClick={() => {
              setCurrentTask(item.name);
            }}
          >
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height:"36px",
                borderRadius:"4px"
              }}
            >
              <Text style={{color:"black", fontWeight:"bold"}}>{item.name}</Text>
              <Button
                type="text"
                style={{ float: "right" }}
                onClick={(e) => {
                  e.stopPropagation();
                  let arr = [...taskItems];
                  arr.splice(idx, 1);
                  if (currentTask === item.name) {
                    setCurrentTask("");
                  }
                  setTaskItems(arr);
                }}
              >
                <CloseCircleOutlined/>
              </Button>
            </Space>
          </div>
        ))}
        {addTask ? (
          <Button
            style={{
              color:"white", 
              borderRadius:"8px", 
              height:"64px", 
              width:'500px', 
              backgroundColor:"rgba(0,0,0,0.1)", 
              fontWeight:"bold", 
              opacity:"0.8",
              border:"0.8px dashed"
            }}
            type="text"
            onClick={() => {
              setAddTask(!addTask);
            }}
          >
            Add Task
          </Button>
        ) : (
          <Space direction="vertical">
            <Input
              style={{width:"500px"}}
              placeholder="What are you doing today?"
              autoFocus={true}
              type="text"
              maxLength={100}
              allowClear="true"
              value={taskInputValue}
              onChange={(e) => {
                setTaskInputValue(e.target.value);
              }}
              onPressEnter={() => {
                if (taskInputValue === "") return;
                let arr = [...taskItems];
                const newItem = {
                  name: taskInputValue,
                  id: taskItems.length + 1,
                };
                arr.push(newItem);
                setTaskItems(arr);
                setAddTask(!addTask);
                setTaskInputValue("");
              }}
            ></Input>
            <Button
              onClick={() => {
                setAddTask(!addTask);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (taskInputValue === "") return;
                let arr = [...taskItems];
                const newItem = { name: taskInputValue };
                arr.push(newItem);
                setTaskItems(arr);
                setAddTask(!addTask);
                setTaskInputValue("");
              }}
            >
              Create
            </Button>
          </Space>
        )}
      </Layout>
    </Layout>
  );
}
export default Pomodoro;
