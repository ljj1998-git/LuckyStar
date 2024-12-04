import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Content from "./components/Content/";

export default function IndexLayout(): React.ReactElement {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
}
