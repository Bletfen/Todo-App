export type filtered = "all" | "active" | "completed";

type multipleFuncTypes = {
  id: number;
  allTodos: TTodo;
  filtered: filtered;
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>;
  setAllTodos: React.Dispatch<React.SetStateAction<TTodo>>;
};

type handleDeleteTypes = {
  id: number;
  todos: TTodo;
  filtered: filtered;
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>;
  setAllTodos: React.Dispatch<React.SetStateAction<TTodo>>;
};

type handleDropTypes = {
  id: number;
  allTodos: TTodo;
  filtered: filtered;
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>;
  setAllTodos: React.Dispatch<React.SetStateAction<TTodo>>;
  todos: TTodo;
  draggedId: number;
  droppedId: number;
  setDraggedId: React.Dispatch<React.SetStateAction<number | null>>;
};

export function toggle({
  id,
  allTodos,
  filtered,
  setTodo,
  setAllTodos,
}: multipleFuncTypes) {
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
  todos,
  filtered,
}: handleDeleteTypes) {
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

export function clearHandler({
  setTodo,
  setAllTodos,
  allTodos,
  filtered,
}: multipleFuncTypes) {
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

export function handleDrop({
  draggedId,
  droppedId,
  setTodo,
  setAllTodos,
  setDraggedId,
  allTodos,
  filtered,
}: handleDropTypes) {
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
