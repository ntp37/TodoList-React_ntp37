import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";

export default function TaskList({ dataTask, index, handleDelete, handleEdit, taskCompleted, indexTask }) {
  return (
    <>
      <div
        id={`task-${index}`}
        className="taskList duration-300 rounded-lg mt-3 p-2 sm:p-4 flex w-full h-auto shadow-xl bg-slate-50 items-center justify-between hover:bg-orange-100"
        style={dataTask.taskState ? { backgroundColor: "#84cc16" } : { backgroundColor: "" }}
      >
        <div className="flex gap-4 text-sm sm:text-base overflow-hidden">
          <input type="checkbox" className="h-4 w-4 sm:h-5 sm:w-5 self-center" onClick={() => taskCompleted(index)} defaultChecked={dataTask.taskState} />
          <p className="break-words overflow-hidden p-2">{dataTask.taskTodo}</p>
        </div>
        <div className="btn-group flex gap-2 font-medium">
          <button
            className="sm:text-base sm:w-20 md:w-24 sm:h-9 w-8 h-7 duration-300 shadow-lg rounded-lg text-sm bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white"
            onClick={() => handleEdit(index)}
          >
            <div className="flex gap-1 justify-center items-center">
              <AiTwotoneEdit /><span className="hidden sm:inline">Edit</span>
            </div>
          </button>
          <button
            className="sm:text-base sm:w-20 md:w-24 sm:h-9 w-8 h-7 duration-300 shadow-lg rounded-lg text-sm bg-red-500 hover:bg-red-600 hover:scale-105 text-white"
            onClick={() => handleDelete(index)}
            disabled={indexTask === index ? true : false}
          >
            <div className="flex gap-1 justify-center items-center">
              <AiTwotoneDelete /><span className="hidden sm:inline">Delete</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
