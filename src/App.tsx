import { useState } from "react";
import MainContainer from "./components/MainContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  return (
    <div
      className={`min-h-screen w-full 
      bg-no-repeat bg-contain 
      pl-[2.6rem] pr-[2.4rem] 
      ${
        !isDark
          ? "bg-[url(/images/bg-mobile-dark.jpg)] xl:bg-[url(/images/bg-desktop-dark.jpg)] bg-[#fff]"
          : "bg-[url(/images/bg-mobile-light.jpg)] xl:bg-[url(/images/bg-desktop-light.jpg)] bg-[#171823]"
      } `}
    >
      <Header isDark={isDark} setIsDark={setIsDark} />
      <MainContainer isDark={isDark} />
      <Footer />
    </div>
  );
}

export default App;
