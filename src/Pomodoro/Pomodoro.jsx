import { useState, useEffect } from "react";
import { Button, Space, Layout, Typography, Input } from "antd";
const { Text } = Typography;
function Pomodoro() {
  const [defaultWorkingTime, setDefaultWorkingTime] = useState(5);
  const [defaultRestingTime, setDefaultRestingTime] = useState(3);
  const [workingTime, setWorkingTime] = useState(defaultWorkingTime);
  const [restingTime, setRestingTime] = useState(defaultRestingTime);
  const [currentStatus, setCurrentStatus] = useState("working");
  const [now, setNow] = useState(new Date());
  const [isPause, setIsPause] = useState(true);
  const [currentTask, setCurrentTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [addTask, setAddTask] = useState(true);
  const [taskInputValue, setTaskInputValue] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setNow(new Date());
    }, 1000);
  }, [now]);

  useEffect(() => {
    if (isPause) return;
    setTimeout(() => {
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
        display: "inline-block",
        minWidth: "100%",
        minHeight: "100%",
        backgroundColor: currentStatus === "working" ? "#EA738D" : "#89ABE3",
      }}
    >
      <div>Hello World</div>
      <div>{now.toLocaleTimeString()}</div>

      <Layout
        className="clock"
        style={{
          backgroundColor: "rgba(255, 255, 255,0.5)",
        }}
      >
        <Space direction="vertical">
          <Space>
            <Button
              onClick={() => {
                setCurrentStatus("working");
                setWorkingTime(defaultWorkingTime);
                setIsPause(true);
              }}
            >
              Pomodoro
            </Button>
            <Button
              onClick={() => {
                setCurrentStatus("resting");
                setRestingTime(defaultRestingTime);
                setIsPause(true);
              }}
            >
              Resting
            </Button>
          </Space>
          <Space direction="vertical">
            <Text>{currentStatus}</Text>
            <Text>
              {currentStatus === "working" ? workingTime : restingTime}
            </Text>
          </Space>
          <Space>
            <Button
              onClick={() => {
                setIsPause((prev) => !prev);
              }}
            >
              {isPause ? "Start" : "Pause"}
            </Button>
            {isPause ? (
              ""
            ) : (
              <Button
                size="small"
                onClick={() => {
                  if (currentStatus === "working") {
                    setWorkingTime(0);
                    setRestingTime(defaultRestingTime);
                  } else if (currentStatus === "resting") {
                    setRestingTime(0);
                    setWorkingTime(defaultWorkingTime);
                  }
                }}
              >
                Forward
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
        }}
      >
        <Text>Current Task: {currentTask}</Text>
      </Layout>
      <Layout className="tasksList" style={{ minWidth: "100%", height: 300 }}>
        <Text>Tasks List</Text>
        {taskItems.map((item, idx) => (
          <div
            style={{ border: "1px solid black", width: 300 }}
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
              }}
            >
              <Text>{item.name}</Text>
              <Button
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
                del-icon
              </Button>
            </Space>
          </div>
        ))}
        {addTask ? (
          <Button
            onClick={() => {
              setAddTask(!addTask);
            }}
          >
            Add Task
          </Button>
        ) : (
          <Space direction="vertical">
            <Input
              placeholder="What are your working today?"
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
