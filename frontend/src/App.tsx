import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth";
import { BalanceCard } from "./components/BalanceCard";
import { Dashboard } from "./pages/Dashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Auth type="signup" />} />
          <Route path="/signin" element={<Auth type="signin" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
