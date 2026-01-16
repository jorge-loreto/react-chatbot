import { AdminProvider } from "./context/AdminContext";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminBusinessPage from "./pages/AdminBusinessPage/AdminBusinessPage";
import LocationCategoriesPage from "./pages/AdminBusinessPage/components/LocationCategoriesPage";

const App = () => {
  return (
    <AdminProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/business-admin" element={<AdminBusinessPage />} />
        <Route
          path="/admin/locations/:locationId/categories"
          element={<LocationCategoriesPage />}
        />
      </Routes>
    </AdminProvider>
  );
};

export default App;
