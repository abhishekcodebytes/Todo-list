import { useEffect, useRef, useState } from "react";

function App() {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      return [];
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const textareaRef = useRef(null);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Input change
  const handleChange = (e) => {
    setTodo(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Reset textarea to normal size
  const resetTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // Add / Update
  const handleAdd = () => {
    if (todo.trim() === "") return;

    if (isEditing) {
      const updatedTodos = [...todos];

      updatedTodos[editIndex] = {
        ...updatedTodos[editIndex],
        todo: todo,
      };

      setTodos(updatedTodos);

      setIsEditing(false);
      setEditIndex(null);
    } else {
      const newTodo = {
        todo: todo,
        isCompleted: false,
      };

      setTodos([...todos, newTodo]);
    }

    setTodo("");

    // Make textarea normal size again
    resetTextarea();
  };

  // Delete
  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Edit
  const handleEdit = (index) => {
    const text = todos[index].todo;

    setTodo(text);
    setIsEditing(true);
    setEditIndex(index);

    // Expand textarea according to existing text
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          `${textareaRef.current.scrollHeight}px`;
      }
    }, 0);
  };

  // Checkbox
  const handleCheckbox = (index) => {
    const newTodos = [...todos];

    newTodos[index] = {
      ...newTodos[index],
      isCompleted: !newTodos[index].isCompleted,
    };

    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-8 px-8">
      <div className="bg-violet-300 rounded-xl w-full max-w-5xl p-8 shadow-lg mx-auto">

        <h1 className="text-2xl font-bold mb-4">
          Add your list
        </h1>

        {/* Input */}
        <div className="flex items-start gap-2 mb-6">
          <textarea
            ref={textareaRef}
            placeholder="Enter a task..."
            value={todo}
            onChange={handleChange}
            rows="1"
            className="flex-1 min-w-0 border border-black rounded px-3 py-2 bg-white outline-none resize-none overflow-hidden"
          />

          <button
            onClick={handleAdd}
            className="shrink-0 self-start bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? "Update" : "Submit"}
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">
          Your Todos
        </h2>

        {todos.length === 0 ? (
          <p className="text-gray-700">
            Nothing to show. 🥺
          </p>
        ) : (
          todos.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 mb-4 w-full"
            >

              {/* Number Box */}
              <div
                onClick={() => handleCheckbox(index)}
                className={`w-8 h-8 shrink-0 border-2 border-black rounded flex items-center justify-center cursor-pointer font-bold ${
                  item.isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-white"
                }`}
              >
                {index + 1}
              </div>

              {/* Todo Text */}
              <div className="flex-1 min-w-0 break-words">
                <span
                  className={
                    item.isCompleted
                      ? "font-bold text-red-700"
                      : ""
                  }
                >
                  {item.todo}
                </span>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => handleEdit(index)}
                className="shrink-0 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(index)}
                className="shrink-0 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default App;