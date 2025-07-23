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

export function clearHandler(
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>,
  setAllTodos: React.Dispatch<React.SetStateAction<TTodo>>,
  allTodos: TTodo,
  filtered: "all" | "active" | "completed"
) {
  const updateAll = allTodos.filter((item) => !item.completed);
  setAllTodos(updateAll);

  switch (filtered) {
    case "all":
    case "active":
      setTodo(updateAll);
      break;
    case "completed":
      setTodo([]);
      break;
  }
}

export function handleDrop(
  dropIndex: number,
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>,
  setAllTodos: React.Dispatch<React.SetStateAction<TTodo>>,
  setDraggedIndex: React.Dispatch<React.SetStateAction<number | null>>,
  draggedIndex: number | null,
  allTodos: TTodo,
  filtered: "all" | "active" | "completed"
) {
  if (draggedIndex === null || draggedIndex === dropIndex) return;
  const newTodos = [...allTodos];
  const draggedItem = newTodos[draggedIndex];

  newTodos.splice(draggedIndex, 1);
  newTodos.splice(dropIndex, 0, draggedItem);

  setAllTodos(newTodos);

  switch (filtered) {
    case "all":
      setTodo(newTodos);
      break;
    case "active":
      setTodo(newTodos.filter((item) => !item.completed));
      break;
    case "completed":
      setTodo(newTodos.filter((item) => item.completed));
      break;
  }
  setDraggedIndex(null);
}
