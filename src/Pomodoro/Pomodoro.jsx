import { useState, useEffect } from "react";
import checkedURL from "../icon/check-circle-svgrepo-com.svg";
import forwardURL from "../icon/forward-end-fill-svgrepo-com.svg";
import settingURL from "../icon/setting-2-svgrepo-com.svg";
import addTaskURL from "../icon/plus-circle-svgrepo-com.svg";
import binURL from "../icon/bin-svgrepo-com.svg";
import clockURL from "../icon/clock-3-svgrepo-com.svg";
import wizardURL from "../icon/wizard-svgrepo-com.svg";
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
} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
const { Text } = Typography;
function Pomodoro() {
  const [defaultWorkingTime, setDefaultWorkingTime] = useState(1500);
  const [defaultRestingTime, setDefaultRestingTime] = useState(300);
  const [workingTime, setWorkingTime] = useState(defaultWorkingTime);
  const [restingTime, setRestingTime] = useState(defaultRestingTime);
  const [currentStatus, setCurrentStatus] = useState("working");
  const [isPause, setIsPause] = useState(true);
  const [currentTask, setCurrentTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [addTask, setAddTask] = useState(true);
  const [taskInputValue, setTaskInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pomodoroColor, setPomodoroColor] = useState("#EA738D");
  const [shortBreakColor, setShortBreakColor] = useState("#89ABE3");
  const [isCheck, setIsCheck] = useState(false);
  const convertTime = (second) => {
    second = second + 1;
    let sec = Math.round(second % 60),
      min = (second - (second % 60)) / 60;
    if (sec == 0) {
      sec = 59;
      min = min - 1;
    } else {
      sec = sec - 1;
    }
    if (min < 10 && sec < 10) {
      return `0${min}:0${sec}`;
    } else if (min >= 10 && sec < 10) {
      return `${min}:0${sec}`;
    } else if (min < 10 && sec >= 10) {
      return `0${min}:${sec}`;
    } else {
      return `${min}:${sec}`;
    }
  };

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
        height: "100%",
        overflow: "auto",
        backgroundColor: isCheck
          ? currentStatus === "working"
            ? !isPause
              ? "rgb(0,0,0)"
              : pomodoroColor
            : shortBreakColor
          : currentStatus === "working"
          ? pomodoroColor
          : shortBreakColor,
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
          marginTop: "10px",
        }}
      >
        <Space direction="horizontal" style={{}}>
          <img
            src={checkedURL}
            style={{
              width: "24px",
              height: "24px",
              transform: "translateY(2px)",
            }}
          ></img>
          <Text
            style={{ color: "white", fontWeight: "bolder", fontSize: "24px" }}
          >
            Pomodoro
          </Text>
        </Space>
        <Button
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            fontWeight: "bold",
            color: "white",
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            // transform:"translateY(-5px)"
          }}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          <img
            src={settingURL}
            style={{
              width: "16px",
              height: "16px",
              transform: "translateY(1px)",
              marginRight: "2px",
            }}
          />
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
          <Text style={{ fontWeight: "bold" }}>
            <img src={clockURL} style={{ transform: "translateY(2px)" }} />{" "}
            Timer (minutes)
          </Text>
          <Space direction="horizontal">
            <Space direction="vertical">
              <Text style={{ fontSize: "14px" }}>Pomodoro</Text>
              <InputNumber
                value={defaultWorkingTime / 60}
                min={0}
                onChange={(e) => {
                  setDefaultWorkingTime(e * 60);
                }}
              ></InputNumber>
            </Space>
            <Space direction="vertical">
              <Text style={{ fontSize: "14px" }}>Short Break</Text>
              <InputNumber
                value={defaultRestingTime / 60}
                min={0}
                onChange={(e) => {
                  setDefaultRestingTime(e * 60);
                }}
              ></InputNumber>
            </Space>
          </Space>
          <Space direction="vertical">
            <Space>
              <Text style={{ fontWeight: "bold" }}>
                <img src={wizardURL} style={{ transform: "translateY(2px)" }} />{" "}
                Color Themes
              </Text>
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
          maxHeight: "340px",
          minHeight: "340px",
          borderRadius: "10px",
          marginTop: "10px",
          position: "relative",
        }}
      >
        <Space direction="vertical">
          <Space
            style={{
              justifyContent: "space-evenly",
              width: "200px",
              transform: "translateY(6px)",
            }}
          >
            <Button
              type="text"
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                backgroundColor:
                  currentStatus === "working" ? "rgba(255,255,255,0.3)" : "",
              }}
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
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                backgroundColor:
                  currentStatus === "resting" ? "rgba(255,255,255,0.3)" : "",
              }}
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

          <Text
            style={{ fontSize: "130px", color: "white", fontWeight: "bold" }}
          >
            {currentStatus === "working"
              ? convertTime(workingTime)
              : convertTime(restingTime)}
          </Text>

          <span>
            <Button
              style={{
                color: isCheck
                  ? currentStatus === "working"
                    ? !isPause
                      ? "rgb(0,0,0)"
                      : pomodoroColor
                    : shortBreakColor
                  : currentStatus === "working"
                  ? pomodoroColor
                  : shortBreakColor,
                //currentStatus === "working" ? pomodoroColor : shortBreakColor
                fontWeight: "bold",
                fontSize: "28px",
                height: "60px",
                width: "188px",
              }}
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
                type="text"
                size="large"
                style={{ position: "absolute", bottom: 38, right: 92 }}
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
                <img
                  src={forwardURL}
                  style={{ backgroundColor: "rgba(255,255,255,0)" }}
                />
              </Button>
            )}
          </span>
        </Space>
      </Layout>
      <Layout
        className="currentTask"
        style={{
          minWidth: "100%",
          height: "30px",
          backgroundColor: "transparent",
          justifyContent: "center",
        }}
      >
        <Text
          style={{ fontSize: "24px", fontWeight: "bolder", color: "white" }}
        >
          {currentTask === "" ? "Current Task" : currentTask}
        </Text>
      </Layout>
      <Layout
        className="tasksList"
        style={{
          minWidth: "100%",
          backgroundColor: "transparent",
          alignItems: "center",
        }}
      >
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "500px",
            paddingBottom: "8px",
            borderBottom: "0.5px solid rgba(255,255,255,0.6)",
          }}
        >
          <Text
            style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}
          >
            Tasks List
          </Text>
          <Button
            type="text"
            style={{ width: "32px" }}
            onClick={() => {
              setTaskItems([]);
              setCurrentTask("");
            }}
          >
            <img src={binURL} style={{ transform: "translate(-12px, 0px)" }} />
          </Button>
        </Space>
        {taskItems.map((item, idx) => (
          <div
            style={{
              border: "1px black",
              width: "500px",
              marginTop: "8px",
              backgroundColor: "white",
              borderRadius: "4px",
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
                height: "36px",
                borderRadius: "4px",
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "500",
                  marginLeft: "11px",
                }}
              >
                {item.name}
              </Text>
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
                <CloseCircleOutlined style={{ width: "4px" }} />
              </Button>
            </Space>
          </div>
        ))}
        {addTask ? (
          <Button
            type="text"
            style={{
              color: "white",
              borderRadius: "8px",
              height: "64px",
              width: "500px",
              backgroundColor: "rgba(0,0,0,)",
              fontWeight: "bold",
              opacity: "0.8",
              border: "0.8px dashed",
              marginTop: "8px",
              marginBottom: "16px",
            }}
            onClick={() => {
              setAddTask(!addTask);
            }}
          >
            <img
              src={addTaskURL}
              style={{
                transform: "translate3d(-2px,2px,0px)",
              }}
            />
            Add Task
          </Button>
        ) : (
          <Space direction="vertical">
            <Input
              style={{ width: "500px", marginTop: "6px" }}
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
            <Space>
              <Button
                onClick={() => {
                  setAddTask(!addTask);
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                style={{ background: "#000000", color: "white" }}
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
          </Space>
        )}
      </Layout>
    </Layout>
  );
}
export default Pomodoro;
