import { useEffect, useRef, useState } from "react";

const App = () => {
  const storage = JSON.parse(localStorage.getItem("todos")) || [];
  const inputRef = useRef();
  const [todos, setTodos] = useState(storage.length ? storage : []);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      const updatedTodo = todos.find((todo) => todo.id === edit);
      updatedTodo.text = e.target[0].value;

      const newTodos = todos.map((todo) =>
        todo.id === edit ? updatedTodo : todo
      );
      setTodos(newTodos);
      setEdit(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: e.target[0].value,
        isCompleted: false,
      };

      setTodos([...todos, newTodo]);
    }

    e.target.reset();
  };

  const handleToggle = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            isCompleted: !todo.isCompleted,
          }
        : todo
    );

    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);

    if (edit === id) {
      setEdit(null);
      inputRef.current.value = "";
    }
  };

  const handleEdit = (todo) => {
    setEdit(todo.id);

    inputRef.current.value = todo.text;

    inputRef.current.focus();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          ref={inputRef}
          className="input"
          placeholder="Todos..."
        />
        <button type="submit" className="btn">
          {edit ? "Update" : "Add"}
        </button>
      </form>

      {todos.map((todo) => (
        <div
          className="todo-item"
          key={todo.id}
          style={{ display: "flex", gap: "10px" }}
        >
          <p
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
            onClick={() => handleToggle(todo.id)}
          >
            {todo.text}
          </p>
          <button
            className="edit"
            onClick={() => handleEdit(todo)}
            style={{ padding: "4px 20px", backgroundColor: "yellow" }}
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={() => handleDelete(todo.id)}
            style={{ padding: "4px 20px", backgroundColor: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
