import "./App.css";
import QueryContextComp from "./context/queryContext";
import ParentComp from "./components/parentcomp/ParentComp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS

function App() {
  return (
    <QueryContextComp>
      <ParentComp />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        draggable
      />
    </QueryContextComp>
  );
}

export default App;
