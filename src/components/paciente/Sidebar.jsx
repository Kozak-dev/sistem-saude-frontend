import { Link, useLocation } from "react-router-dom";
import "./Layout.css";

export default function Sidebar({ badges = {} }) {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard",     icon: "fa-table-cells-large", to: "/home" },
    { label: "Consultas",     icon: "fa-calendar-days",     to: "/consultas" },
    { label: "Exames",        icon: "fa-flask",             to: "/exames" },
    { label: "Receitas",      icon: "fa-file-medical",      to: "/receitas" },
    { label: "Mensagens",     icon: "fa-comment-dots",      to: "/mensagens", badge: badges.mensagens },
    { label: "Configurações", icon: "fa-gear",              to: "/configuracoes" },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <i className="fa-solid fa-heart-pulse" />
        </div>
        <div>
          <span className="sidebar__logo-name">Saúde+</span>
          <span className="sidebar__logo-tagline">Bem cuidar de você</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`sidebar__nav-item ${
              location.pathname.startsWith(item.to)
                ? "sidebar__nav-item--active"
                : ""
            }`}
          >
            <i className={`fa-solid ${item.icon}`} />
            <span>{item.label}</span>
            {item.badge && (
              <span className="sidebar__badge">{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Rodapé — Sair + Ajuda */}
      <div className="sidebar__footer">
        <div className="sidebar__help">
          <div className="sidebar__help-top">
            <i className="fa-regular fa-circle-question" />
            <span className="sidebar__help-title">Precisa de ajuda?</span>
          </div>
          <p className="sidebar__help-sub">Fale com nossa equipe</p>
          <button className="sidebar__help-btn">Abrir chat</button>
        </div>

        <Link
          to="/"
          onClick={() => localStorage.removeItem("usuario")}
          className="sidebar__nav-item sidebar__nav-item--logout"
        >
          <i className="fa-solid fa-arrow-right-from-bracket" />
          <span>Sair</span>
        </Link>
      </div>
    </aside>
  );
}