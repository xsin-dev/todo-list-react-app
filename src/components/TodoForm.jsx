const TodoForm = ({ handleSubmit, inputRef, edit }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        ref={inputRef}
        className="input"
        placeholder="Yangi vazifa kiriting..."
      />
      <button type="submit" className="btn">
        {edit ? "✏️ Yangilash" : "➕ Qo‘shish"}
      </button>
    </form>
  );
};

export default TodoForm;
