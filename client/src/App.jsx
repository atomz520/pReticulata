import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Info from "./pages/Info";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>pReticulata</h1>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}
      <Info />
    </>
  );
}

export default App;
