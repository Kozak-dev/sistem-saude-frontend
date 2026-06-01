import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Layout.css";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}