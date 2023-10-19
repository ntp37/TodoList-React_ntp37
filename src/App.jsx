import { useState } from "react";
import { MdNoteAdd, MdEditDocument } from "react-icons/md";
import { IconContext } from "react-icons";
import TaskList from "./components/TaskList";
import "./App.css";

export default function App() {
  const [data, setData] = useState("");
  const [indexTask, setIndexTask] = useState(null);
  const [todos, setTodos] = useState(() => {
    const getTaskLocal = localStorage.getItem("taskData");
    const parseData = JSON.parse(getTaskLocal);
    return parseData || [];
  });

  const handleAddTask = () => {
    let todosArray = [...todos];

    if (data) {
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
    }
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

  const buttonText = () => {
    if (typeof indexTask === "number") {
      return (
        <>
          <MdEditDocument /><span>UPDATE</span>
        </>
      );
    } else {
      return (
        <>
          <MdNoteAdd /><span>ADD</span>
        </>
      );
    }
  };

  return (
    <>
      <div className="w-screen min-h-screen bg-slate-200 font-inter">
        <IconContext.Provider value={{ className: "text-xl" }}>
          <div className="container flex flex-col mx-auto p-4 lg:p-7">
            <div className="my-6 text-center text-2xl font-semibold">
              <h1>TO-DO List</h1>
            </div>
            <div className="input-task sm:relative sm:flex-row sm:gap-3 flex flex-col gap-5 my-5">
              <input
                type="text"
                value={data}
                placeholder="Insert your task"
                className="sm:text-base sm:h-14 h-12 p-3 text-sm shadow-lg w-full rounded-full border focus-visible:outline-none
                  focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                onChange={(e) => setData(e.target.value)}
              />
              <button
                onClick={handleAddTask}
                className={`sm:absolute sm:m-2 sm:right-0 sm:h-10 sm:text-base self-center w-32 h-9 font-medium text-sm shadow-lg
                  rounded-full text-white duration-300 hover:scale-105 ${
                    typeof indexTask === "number"
                      ? "bg-indigo-500 hover:bg-indigo-600"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
              >
                <div className="flex gap-1 justify-center items-center">
                  {buttonText()}
                </div>
              </button>
            </div>
            <div
              className={`${!todos.length ? "hidden" : "flex"} sm:text-base gap-6 justify-center my-3 text-sm font-medium`}>
              <div className="inline-flex items-center gap-2">
                <div className="w-3 h-3 bg-lime-500"></div>
                <span>Completed Tasks</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <span>Active Tasks</span>
                <div className="w-3 h-3 bg-slate-50 border border-black"></div>
              </div>
            </div>
            <div className="tasks overflow-hidden">
              {todos?.map((task, index) => (
                <TaskList
                  key={index}
                  index={index}
                  indexTask={indexTask}
                  dataTask={task}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  taskCompleted={taskCompleted}
                />
              ))}
            </div>
          </div>
        </IconContext.Provider>
      </div>
    </>
  );
}
