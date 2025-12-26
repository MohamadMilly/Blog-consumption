import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
