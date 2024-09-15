import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Appbar } from "./components/Appbar";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";

function Layout() {
  const location = useLocation();

  // Define paths where Appbar should not be rendered
  const noAppbarPaths = ["/signin", "/signup"];

  return (
    <>
      {/* Conditionally render Appbar if the current path is not in noAppbarPaths */}
      {!noAppbarPaths.includes(location.pathname) && <Appbar />}
      <Routes>
        <Route path="/signup" element={<Auth type="signup" />} />
        <Route path="/signin" element={<Auth type="signin" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
