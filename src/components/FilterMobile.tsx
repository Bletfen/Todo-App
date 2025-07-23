export default function FilterMobile({
  isDark,
  filtered,
  setFiltered,
  setTodo,
  allTodos,
}: {
  isDark: boolean;
  filtered: "all" | "active" | "completed";
  setFiltered: React.Dispatch<
    React.SetStateAction<"all" | "active" | "completed">
  >;
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>;
  allTodos: TTodo;
}) {
  return (
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
  );
}
