import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AdminPage from "./pages/AdminPage/AdminPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default App;
