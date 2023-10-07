import { useState } from "react";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [indexTask, setIndexTask] = useState(null);
  const [todos, setTodos] = useState(() => {
    const getTaskLocal = localStorage.getItem("taskData");
    const parseData = JSON.parse(getTaskLocal);
    return parseData || [];
  });

  const addTask = () => {
    let todosArray = [...todos];

    // For update task. Read state from type of the "indexTask" is a "number"
    if (typeof indexTask === "number") {
      todosArray[indexTask].taskTodo = data;
      setIndexTask(null);

      // For add new task.
    } else {
      todosArray.push({ taskTodo: data, taskState: false });
      window.location.reload();
    }
    localStorage.setItem("taskData", JSON.stringify(todosArray));
    setData("");
  };

  const handleDelete = (index) => {
    let todosArray = [...todos];
    todosArray.splice(index, 1);
    setTodos(todosArray);
    localStorage.setItem("taskData", JSON.stringify(todosArray));
    // window.location.reload();
  };

  const handleEdit = (index) => {
    setData(todos[index].taskTodo);
    setIndexTask(index);
  };

  const taskCompleted = (index) => {
    let todosArray = [...todos];
    todosArray[index].taskState = !todosArray[index].taskState;
    setTodos(todosArray);
    localStorage.setItem("taskData", JSON.stringify(todosArray));
  };

  // const btnClassName =

  return (
    <>
      <div className="max-w-full min-h-screen bg-slate-100">
        <div className="container grid mx-auto p-8">
          <div className="text-center text-2xl font-medium">
            <h1>TO-DO List</h1>
          </div>
          <div className="input-text flex gap-3 my-5 w-full">
            <input
              onChange={(e) => setData(e.target.value)}
              value={data}
              placeholder="Insert your task"
              type="text"
              className="h-10 shadow-lg p-3 w-11/12"
            />
            <button
              className={`shadow-lg rounded-md w-1/12 text-white ${
                typeof indexTask === "number"
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
              onClick={addTask}
            >
              {typeof indexTask === "number" ? "UPDATE" : "ADD"}
            </button>
          </div>
          <div className=" flex flex-row gap-4 justify-center my-3">
            <div className="inline-flex items-center gap-2">
              <div className="w-3 h-3 bg-lime-500"></div>
              <span>Completed</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <span>Incomplete</span>
              <div className="w-3 h-3 bg-slate-50 border border-black"></div>
            </div>
          </div>
          {todos?.map((task, index) => (
            <TaskList
              key={index}
              dataTask={task}
              index={index}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              taskCompleted={taskCompleted}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
