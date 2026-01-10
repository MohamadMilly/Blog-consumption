import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} draggable={true} />
      <header>
        <Navbar />
      </header>

      <Outlet />
    </>
  );
}

export default App;
