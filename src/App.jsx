import { useEffect, useRef, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

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

    const value = e.target[0].value.trim();
    if (!value) return;

    if (edit) {
      const updatedTodo = todos.find((todo) => todo.id === edit);
      updatedTodo.text = value;

      const newTodos = todos.map((todo) =>
        todo.id === edit ? updatedTodo : todo
      );
      setTodos(newTodos);
      setEdit(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: value,
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
    }

    e.target.reset();
  };

  const handleToggle = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
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
    <div className="container">
      <h1>Vazifalar ro‘yxati</h1>
      <TodoForm
        inputRef={inputRef}
        handleSubmit={handleSubmit}
        edit={edit}
      />

      <div className="todos">
        {todos.length ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <p className="empty">Hech qanday vazifa yo‘q</p>
        )}
      </div>
    </div>
  );
};

export default App;
