export default function Footer({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex justify-center items-center mt-[4rem] xl:mt-[4.9rem]">
      <p
        className={`text-[1.4rem] font-[400] tracking-[-0.194px] ${
          !isDark ? "text-[#9495a5]" : "text-[#5b5e7e]"
        }`}
      >
        Drag and drop to reorder list
      </p>
    </div>
  );
}
