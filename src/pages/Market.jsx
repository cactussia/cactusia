import NavBar from "../components/NavBar";
import MarketBody from "../components/MarketBody";
import Footer from "../components/Footer";

function Market() {
  return (
    <section className=" lg:h-[100vh] w-[100vw] flex flex-col overflow-hidden relative ">
      <NavBar />
      <div className="background-market flex-1 flex-col flex">
        <MarketBody />
      </div>
    </section>
  );
}

export default Market;
