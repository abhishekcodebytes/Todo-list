import { useState } from "react";
import Navbar from "./component/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;

    setTodos([...todos, { todo, isCompleted: false }]);
    setTodo("");
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    console.log("Edit:", index);
  };

  const handleCheckbox = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 pt-8 px-8">
        <div className="bg-violet-300 rounded-xl w-full max-w-5xl p-8 shadow-lg mx-auto">
          <h1 className="text-2xl font-bold mb-4">
            Add your list
          </h1>

          {/* Input */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter a task..."
              value={todo}
              onChange={handleChange}
              className="flex-1 border border-black rounded px-3 py-2 bg-white outline-none"
            />

            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4">
            Your Todos
          </h2>

          {todos.length === 0 ? (
            <p className="text-gray-700">Wait for the Submit.</p>
          ) : (
            todos.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 mb-4"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleCheckbox(index)}
                  className="w-5 h-5"
                />

                {/* White Box */}
                <div className="flex-1 bg-white rounded-lg shadow p-3">
                  <span
                    className={
                      item.isCompleted
                        ? "line-through text-gray-500"
                        : ""
                    }
                  >
                    {item.todo}
                  </span>
                </div>

                {/* Edit */}
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;