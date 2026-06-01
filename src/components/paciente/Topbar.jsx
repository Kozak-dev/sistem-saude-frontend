import { useEffect, useState } from "react";
import "./Layout.css";

export default function Topbar({ title, subtitle, children, notifCount = 2 }) {
  const [nome, setNome] = useState("Usuário");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const payload = JSON.parse(
        new TextDecoder().decode(
          Uint8Array.from(atob(token.split(".")[1]), (c) => c.charCodeAt(0))
        )
      );
      setNome(payload.unique_name || payload.name || "Usuário");
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <header className="topbar">
      <div className="topbar__left">
        <div>
          <h2>{title || `Olá, ${nome}`}</h2>
          <p className="topbar__sub">
            {subtitle || "Bem-vindo ao sistema Saúde+"}
          </p>
        </div>
      </div>
      <div className="topbar__right">
        {children}

        {/* Sino com badge */}
        <div className="topbar__notif">
          <i className="fa-regular fa-bell" />
      
        </div>

        {/* Usuário com avatar */}
        <div className="topbar__user">
          <div className="topbar__avatar">
            <i className="fa-regular fa-user" />
          </div>
          <div className="topbar__user-info">
            <span className="topbar__user-name">{nome}</span>
            <span className="topbar__user-role">Paciente</span>
          </div>
          <i className="fa-solid fa-chevron-down topbar__chevron" />
        </div>
      </div>
    </header>
  );
}