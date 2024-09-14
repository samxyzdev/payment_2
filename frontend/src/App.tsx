import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/Auth";
import { BalanceCard } from "./components/BalanceCard";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Auth type="signup" />} />
          <Route path="/signin" element={<Auth type="signin" />} />
          <Route path="/dashboard" element={<BalanceCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
