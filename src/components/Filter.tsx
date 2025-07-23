import { clearHandler } from "./todoFunctions";
export default function Filter({
  todos,
  isDark,
  filtered,
  setFiltered,
  setTodo,
  setAllTodos,
  allTodos,
}: {
  todos: TTodo;
  isDark: boolean;
  filtered: "all" | "active" | "completed";
  setFiltered: React.Dispatch<
    React.SetStateAction<"all" | "active" | "completed">
  >;
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>;
  setAllTodos: React.Dispatch<React.SetStateAction<TTodo>>;
  allTodos: TTodo;
}) {
  const completedTodos = todos.filter(
    (item) => item.completed === false
  ).length;

  return (
    <>
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
          onClick={() => clearHandler(setTodo, setAllTodos, allTodos, filtered)}
        >
          Clear Completed
        </span>
      </div>
    </>
  );
}
