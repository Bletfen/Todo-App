import { useState } from "react";
export default function Input({
  todos,
  setTodo,
  allTodos,
  setAllTodos,
  isDark,
}: {
  todos: TTodo;
  setTodo: React.Dispatch<React.SetStateAction<TTodo>>;
  allTodos: TTodo;
  setAllTodos: React.Dispatch<React.SetStateAction<TTodo>>;
  isDark: boolean;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  function handleAddTodo() {
    if (!inputValue) {
      return;
    }
    const newTodo: ITodo = {
      id: Math.random(),
      text: inputValue.trim(),
      completed: false,
    };
    setTodo([...todos, newTodo]);
    setAllTodos([...allTodos, newTodo]);
    setInputValue("");
    setIsChecked(false);
  }

  return (
    <div
      className={`py-[1.4rem] px-[2rem] flex gap-[1.2rem] mt-[4rem] xl:mt-[4.8rem]
        rounded-[0.5rem] mb-[1.6rem] xl:mb-[2.4rem] items-center max-w-[54rem] mx-auto ${
          !isDark
            ? "bg-[#fff] shadow-[0_3.5rem_5rem_-1.5rem_rgba(194,195,214,0.50)]"
            : "bg-[#25273d] shadow-[0_3.5rem_5rem_-1.5rem_rgba(0,0,0,0.50)]"
        }`}
    >
      {!isChecked ? (
        <div
          className={`w-[2rem] h-[2rem]
                xl:w-[2.4rem] xl:h-[2.4rem]
                border-[0.1rem] rounded-[50%] cursor-[pointer] shrink-0 ${
                  !isDark
                    ? "bg-[#fff] border-[#e3e4f1]"
                    : "bg-[#25273d] border-[#393A4B]"
                }`}
        ></div>
      ) : (
        <svg
          className="w-[2rem] h-[2rem] xl:w-[2.4rem] xl:h-[2.4rem] cursor-[pointer]"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            handleAddTodo();
          }}
        >
          <circle cx="10" cy="10" r="9.5" fill="white" stroke="#E3E4F1" />
          <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_0_371)" />
          <path
            d="M6.66675 10.2534L8.91333 12.5L13.9133 7.5"
            stroke="white"
            stroke-width="2"
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
              <stop stop-color="#55DDFF" />
              <stop offset="1" stop-color="#C058F3" />
            </linearGradient>
          </defs>
        </svg>
      )}

      <input
        type="text"
        placeholder="Create a new todo…"
        className={`text-[1.2rem] xl:text-[1.8rem] font-normal
        tracking-[-0.167px] xl:tracking-[-0.25px] outline-none w-full ${
          !isDark
            ? "text-[#393a4b] transition-all duration-300"
            : "text-[#cbcbe7] transition-all duration-300"
        }`}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (e.target.value.trim() === "") {
            setIsChecked(false);
          } else {
            setIsChecked(true);
          }
        }}
      />
    </div>
  );
}
