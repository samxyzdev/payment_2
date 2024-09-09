import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Auth type="signup" />} />
          <Route path="/signin" element={<Auth type="signin" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
