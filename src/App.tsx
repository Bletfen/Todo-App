import MainContainer from "./components/MainContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <div
      className="min-h-screen w-full 
      bg-[url(/images/bg-mobile-dark.jpg)] \
      bg-no-repeat bg-contain 
      xl:bg-[url(/images/bg-desktop-dark.jpg)]
      pl-[2.6rem] pr-[2.4rem]"
    >
      <Header />
      <MainContainer />
      <Footer />
    </div>
  );
}

export default App;
