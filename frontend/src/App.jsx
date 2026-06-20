import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Report from "./pages/Report";
import Analytics from "./pages/Analytics";

export default function App() {

  return (

    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/interview"
            element={<Interview />}
          />

          <Route
            path="/resume"
            element={<ResumeAnalyzer />}
          />

          <Route
            path="/report"
            element={<Report />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

        </Routes>

      </MainLayout>

    </BrowserRouter>

  );

}