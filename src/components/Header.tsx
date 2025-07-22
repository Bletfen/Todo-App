import Moon from "/images/icon-moon.svg";
import Sun from "/images/icon-sun.svg";
export default function Header({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className="flex justify-between pt-[4.8rem] xl:pt-[7rem] 
        items-center max-w-[54rem] mx-auto"
    >
      <h1 className="text-[#fff] text-[3rem] xl:text-[4rem] font-[700] tracking-[1rem] xl:tracking-[1.5rem] self-center">
        TODO
      </h1>
      <img
        src={!isDark ? Moon : Sun}
        alt="icon-moon"
        className="cursor-[pointer]"
        onClick={() => setIsDark((prev) => !prev)}
      />
    </div>
  );
}
