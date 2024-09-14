import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth";
import { BalanceCard } from "./components/BalanceCard";
import { Dashboard } from "./pages/Dashboard";
import { Appbar } from "./components/Appbar";
function App() {
  return (
    <>
      <Appbar />
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
