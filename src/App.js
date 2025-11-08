import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminBusinessPage from "./pages/AdminBusinessPage/AdminBusinessPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/business-admin" element={<AdminBusinessPage />} />
    </Routes>
  );
};

export default App;
