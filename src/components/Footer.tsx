export default function Footer({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex justify-center items-center mt-[4rem]">
      <p className="text-[#9495a5] text-[1.4rem] font-[400] tracking-[-0.194px]">
        Drag and drop to reorder list
      </p>
    </div>
  );
}
