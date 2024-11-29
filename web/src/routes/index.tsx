import { Routes, Route } from "react-router-dom";
import Home from "../views/home";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);

export default AppRoutes;
