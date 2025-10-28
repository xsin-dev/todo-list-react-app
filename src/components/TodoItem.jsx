const TodoItem = ({ todo, handleToggle, handleEdit, handleDelete }) => {
  return (
    <div className="todo-item">
      <p
        className={`todo-text ${todo.isCompleted ? "done" : ""}`}
        onClick={() => handleToggle(todo.id)}
      >
        {todo.text}
      </p>
      <div className="buttons">
        <button className="edit" onClick={() => handleEdit(todo)}>
          ✏️ Tahrirlash
        </button>
        <button className="delete" onClick={() => handleDelete(todo.id)}>
          🗑️ O'chirish
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
