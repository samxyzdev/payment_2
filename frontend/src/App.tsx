import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Loading } from "./components/Loading";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { Dashboard } from "./pages/DashboardPage";
import { Home } from "./pages/Home";

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
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}
