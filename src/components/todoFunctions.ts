export function toggle(
  id: number,
  allTodos: TTodo,
  filtered: "all" | "active" | "completed",
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>,
  setAllTodos: React.Dispatch<React.SetStateAction<TTodo>>
) {
  const updateAll = allTodos.map((item) =>
    item.id === id ? { ...item, completed: !item.completed } : item
  );
  setAllTodos(updateAll);
  switch (filtered) {
    case "all":
      setTodo(updateAll);
      break;
    case "active":
      setTodo(updateAll.filter((item) => !item.completed));
      break;
    case "completed":
      setTodo(updateAll.filter((item) => item.completed));
      break;
  }
}

export function handleDelete(
  id: number,
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>,
  setAllTodos: React.Dispatch<React.SetStateAction<TTodo>>,
  todos: TTodo,
  filtered: "all" | "active" | "completed"
) {
  const filteredTodos = todos.filter((item) => item.id !== id);
  setAllTodos(filteredTodos);

  switch (filtered) {
    case "all":
      setTodo(filteredTodos);
      break;
    case "active":
      setTodo(filteredTodos.filter((item) => !item.completed));
      break;
    case "completed":
      setTodo(filteredTodos.filter((item) => item.completed));
      break;
  }
}
