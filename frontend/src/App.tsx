import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Appbar } from "./components/Appbar";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";

function Layout() {
  const location = useLocation();

  // Define paths where Appbar should not be rendered
  const noAppbarPaths = ["/signin", "/signup", "*"];
  const shouldRenderAppbar =
    !noAppbarPaths.includes(location.pathname) && location.pathname !== "/404";

  return (
    <>
      {/* Conditionally render Appbar if the current path is not in noAppbarPaths */}
      {shouldRenderAppbar && <Appbar />}
      <Routes>
        <Route path="/signup" element={<Auth type="signup" />} />
        <Route path="/signin" element={<Auth type="signin" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
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
