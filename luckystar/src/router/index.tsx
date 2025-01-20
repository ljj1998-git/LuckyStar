import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "@/layouts/index";
import Home from "@/views/home";
import Topic from "@/views/topic";
import Information from "@/views/information";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/infomation" element={<Information />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
