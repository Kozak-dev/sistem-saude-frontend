import { useEffect, useState } from "react";
import "./Layout.css";
import "../../pages/medico/HomeMedico.css";

export default function Topbar({ title, subtitle, children }) {
  const [nome, setNome] = useState("Médico");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(
        new TextDecoder().decode(
          Uint8Array.from(
            atob(token.split(".")[1]),
            (c) => c.charCodeAt(0)
          )
        )
      );

      setNome(
        payload.unique_name ||
        payload.name ||
        "Médico"
      );
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

        {/* Notificação */}
        <div className="topbar__notif">
          <i className="fa-regular fa-bell" />
          <span className="topbar__notif-dot" />
        </div>

        {/* Usuário */}
        <div className="topbar__user">
          <div className="topbar__avatar-empty">
            <i className="fa-regular fa-user" />
          </div>
          <div>
            <span className="topbar__user-name">Dr. {nome}</span>
            <span className="topbar__user-role">Médico</span>
          </div>
          <i className="fa-solid fa-chevron-down" />
        </div>
      </div>
    </header>
  );
}