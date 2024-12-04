import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/index";
import Home from "../views/home";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
    </Route>
  </Routes>
);

export default AppRoutes;
