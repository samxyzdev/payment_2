import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUpPage from "./components/v0singup";
import SignIpPage from "./components/v0signin";
import { Suspense } from "react";
import { Loading } from "./components/Loading";

export default function App() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <AuthApp />
      </Suspense>
    </div>
  );
}

function AuthApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignIpPage />} />
      </Routes>
    </BrowserRouter>
  );
}
