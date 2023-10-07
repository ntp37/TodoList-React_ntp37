export default function TaskList({ dataTask, index, handleDelete, handleEdit, taskCompleted }) {
  return (
    <>
        <div id={`task-${index}`} className="listItem mt-3 p-4 flex w-full h-16 shadow-xl bg-slate-50 items-center justify-between" style={ dataTask.taskState ? {backgroundColor: "#84cc16"} : {backgroundColor: ""}}>
          <div className="flex gap-4">
            <input type="checkbox" className="h-5 w-5 self-center" onClick={() => taskCompleted(index)} defaultChecked={dataTask.taskState} />
            <p>{dataTask.taskTodo}</p>
          </div>
          <div className="btn-group flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 shadow-lg rounded-md w-24 h-8 text-white" onClick={() => handleEdit(index)}>EDIT</button>
            <button className="bg-red-500 hover:bg-red-600 shadow-lg rounded-md w-24 h-8 text-white" onClick={() => handleDelete(index)}>DELETE</button>
          </div>
        </div>
    </>
  );
}
