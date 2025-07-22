import { useState } from "react";
import Todos from "../todos.json";
import Input from "./Input";
export default function MainContainer({ isDark }: { isDark: boolean }) {
  const [todos, setTodo] = useState<TTodo>(Todos);
  const [allTodos, setAllTodos] = useState<TTodo>(Todos);
  const [filtered, setFiltered] = useState<"all" | "active" | "completed">(
    "all"
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const completedTodos = todos.filter(
    (item) => item.completed === false
  ).length;
  function toggle(id: number) {
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
  function handleDelete(id: number) {
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodo(filteredTodos);
    setAllTodos(filteredTodos);
  }
  function clearHandler() {
    const updateAll = allTodos.filter((item) => !item.completed);
    setAllTodos(updateAll);
    if (todos.every((item) => item.completed)) {
      setTodo([]);
    } else {
      setTodo(updateAll.filter((item) => !item.completed));
    }
  }

  function handleDrop(dropIndex: number) {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newTodos = [...todos];
    const draggedItems = newTodos[draggedIndex];

    newTodos.splice(draggedIndex, 1);
    newTodos.splice(dropIndex, 0, draggedItems);

    setTodo(newTodos);
    setDraggedIndex(null);
  }

  return (
    <>
      <Input
        todos={todos}
        setTodo={setTodo}
        allTodos={allTodos}
        setAllTodos={setAllTodos}
        isDark={isDark}
      />
      <div
        className={`py-[1.6rem]
      flex-col rounded-[0.5rem] max-w-[54rem] mx-auto ${
        !isDark
          ? "bg-[#fff] shadow-[0_3.5rem_5rem_-1.5rem_rgba(194,195,214,0.50)]"
          : "bg-[#25273d] shadow-[0_3.5rem_5rem_-1.5rem_rgba(0,0,0,0.50)]"
      }`}
      >
        {todos.map((todo, index) => (
          <div
            key={todo.id}
            className="transition-all duration-300"
            draggable={true}
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            <div className="flex items-center justify-between px-[2rem] cursor-[grab]">
              <div className="flex items-center gap-[1.2rem] items-center">
                {!todo.completed ? (
                  <div
                    className={`w-[2rem] h-[2rem]
                    xl:w-[2.4rem] xl:h-[2.4rem]
                    border-[0.1rem] rounded-[50%] cursor-[pointer] ${
                      !isDark
                        ? "bg-[#fff] border-[#e3e4f1] hover:border-[#c058f3]"
                        : "bg-[#25273d] border-[#393A4B] hover:border-[#55ddff]"
                    }`}
                    onClick={() => toggle(todo.id)}
                  ></div>
                ) : (
                  <svg
                    className="w-[2rem] h-[2rem] xl:w-[2.4rem] xl:h-[2.4rem] cursor-[pointer]"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => toggle(todo.id)}
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="9.5"
                      fill="white"
                      stroke="#E3E4F1"
                    />
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="url(#paint0_linear_0_371)"
                    />
                    <path
                      d="M6.66675 10.2534L8.91333 12.5L13.9133 7.5"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_0_371"
                        x1="-10"
                        y1="10"
                        x2="10"
                        y2="30"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#55DDFF" />
                        <stop offset="1" stopColor="#C058F3" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
                <p
                  className={`text-[1.2rem] xl:text-[1.8rem] font-normal
                    tracking-[-0.167px] xl:tracking-[-0.25px] ${
                      !isDark
                        ? "text-[#494c6b] transition-all duration-300"
                        : "text-[#c8cbe7] transition-all duration-300"
                    } ${todo.completed ? "line-through text-[#d1d2da]" : ""} `}
                >
                  {todo.text}
                </p>
              </div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-[pointer]"
                onClick={() => handleDelete(todo.id)}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.7851 0.471404L11.3137 0L5.89256 5.42115L0.471404 0L0 0.471404L5.42115 5.89256L0 11.3137L0.471404 11.7851L5.89256 6.36396L11.3137 11.7851L11.7851 11.3137L6.36396 5.89256L11.7851 0.471404Z"
                  fill="#494C6B"
                />
              </svg>
            </div>
            <div
              className={`h-px my-[1.6rem] w-auto ${
                !isDark ? "bg-[#e3e4f1]" : "bg-[#393a4b]"
              }`}
            ></div>
          </div>
        ))}
        <div
          className="px-[2rem] flex items-center justify-between text-[1.2rem] 
            xl:text-[1.4rem] text-[#9495a5] font-normal tracking-[-0.167px] xl:tracking-[-0.194px]"
        >
          <span>{completedTodos} items left</span>
          <div
            className="hidden xl:flex xl:gap-[1.9rem] 
            xl:items-center"
          >
            <span
              className={`cursor-[pointer] text-[#3a7cfd] text-[1.4rem] font-[700] tracking-[-0.194px] 
                transition-all duration-300 ${
                  filtered === "all" ? "text-[#3a7cfd]" : "text-[#9495a5]"
                } ${!isDark ? "hover:text-[#494c6b]" : "hover:text-[#e3e4f1]"}`}
              onClick={() => {
                setFiltered("all");
                setTodo(allTodos);
              }}
            >
              All
            </span>
            <span
              className={`cursor-[pointer]  text-[1.4rem] font-[700] tracking-[-0.194px]
                 transition-all duration-300 ${
                   filtered === "active" ? "text-[#3a7cfd]" : "text-[#9495a5]"
                 } ${
                !isDark ? "hover:text-[#494c6b]" : "hover:text-[#e3e4f1]"
              }`}
              onClick={() => {
                setFiltered("active");
                setTodo(allTodos.filter((item) => !item.completed));
              }}
            >
              Active
            </span>
            <span
              className={`cursor-[pointer] text-[1.4rem] font-[700] tracking-[-0.194px] 
                transition-all duration-300 ${
                  filtered === "completed" ? "text-[#3a7cfd]" : "text-[#9495a5]"
                } ${!isDark ? "hover:text-[#494c6b]" : "hover:text-[#e3e4f1]"}`}
              onClick={() => {
                setFiltered("completed");
                setTodo(allTodos.filter((item) => item.completed));
              }}
            >
              Completed
            </span>
          </div>
          <span
            className={`cursor-[pointer] transition-all duration-300 hover:text-[#494c6b]
               ${!isDark ? "hover:text-[#494c6b]" : "hover:text-[#e3e4f1]"}`}
            onClick={() => clearHandler()}
          >
            Clear Completed
          </span>
        </div>
      </div>
      <div
        className={`py-[1.5rem] flex justify-center
        rounded-[0.5rem] mt-[1.6rem] gap-[1.9rem] xl:hidden max-w-[54rem] mx-auto ${
          !isDark
            ? "bg-[#fff] shadow-[0_3.5rem_5rem_-1.5rem_rgba(194,195,214,0.50)]"
            : "bg-[#25273d] shadow-[0_3.5rem_5rem_-1.5rem_rgba(0,0,0,0.50)]"
        }`}
      >
        <span
          className={`cursor-[pointer] text-[#3a7cfd] text-[1.4rem] font-[700] tracking-[-0.194px] ${
            filtered === "all" ? "text-[#3a7cfd]" : "text-[#9495a5]"
          }`}
          onClick={() => {
            setFiltered("all");
            setTodo(allTodos);
          }}
        >
          All
        </span>
        <span
          className={`cursor-[pointer]  text-[1.4rem] font-[700] tracking-[-0.194px] ${
            filtered === "active" ? "text-[#3a7cfd]" : "text-[#9495a5]"
          }`}
          onClick={() => {
            setFiltered("active");
            setTodo(allTodos.filter((item) => !item.completed));
          }}
        >
          Active
        </span>
        <span
          className={`cursor-[pointer] text-[1.4rem] font-[700] tracking-[-0.194px] ${
            filtered === "completed" ? "text-[#3a7cfd]" : "text-[#9495a5]"
          }`}
          onClick={() => {
            setFiltered("completed");
            setTodo(allTodos.filter((item) => item.completed));
          }}
        >
          Completed
        </span>
      </div>
    </>
  );
}
