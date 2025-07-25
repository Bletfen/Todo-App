export type filtered = "all" | "active" | "completed";

type baseTypes = {
  allTodos: TTodo;
  filtered: filtered;
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>;
  setAllTodos: React.Dispatch<React.SetStateAction<TTodo>>;
};

type clearTypes = baseTypes;

type toggleTypes = baseTypes & {
  id: number;
};

type handleDeleteTypes = baseTypes & {
  id: number;
};

type handleDropTypes = baseTypes & {
  draggedId: number | null;
  droppedId: number;
  setDraggedId: React.Dispatch<React.SetStateAction<number | null>>;
};

export function toggle({
  id,
  allTodos,
  filtered,
  setTodo,
  setAllTodos,
}: toggleTypes) {
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

export function handleDelete({
  id,
  setTodo,
  setAllTodos,
  allTodos,
  filtered,
}: handleDeleteTypes) {
  const filteredTodos = allTodos.filter((item) => item.id !== id);
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

export function clearHandler({
  setTodo,
  setAllTodos,
  allTodos,
  filtered,
}: clearTypes) {
  const updateAll = allTodos.filter((item) => !item.completed);
  setAllTodos(updateAll);

  switch (filtered) {
    case "all":
    case "active":
      setTodo(updateAll.filter((item) => !item.completed));
      break;
    case "completed":
      setTodo([]);
      break;
  }
}

export function handleDrop({
  draggedId,
  droppedId,
  setTodo,
  setAllTodos,
  setDraggedId,
  allTodos,
  filtered,
}: handleDropTypes) {
  if (draggedId === null) return;
  const draggedIndex = allTodos.findIndex((item) => item.id === draggedId);
  const dropIndex = allTodos.findIndex((item) => item.id === droppedId);

  if (draggedIndex === -1 || dropIndex === -1 || draggedIndex === dropIndex)
    return;

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
  setDraggedId(null);
}
