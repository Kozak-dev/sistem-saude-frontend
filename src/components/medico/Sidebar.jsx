import { Link, useLocation } from "react-router-dom";
import "./Layout.css";
import "../../pages/medico/HomeMedico.css";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    {
      label: "Painel",
      icon: "fa-table-cells-large",
      to: "/medico",
      exact: true,
    },

    {
      label: "Calendário",
      icon: "fa-calendar-days",
      to: "/medico/calendario",
    },

    {
      label: "Histórico",
      icon: "fa-clock-rotate-left",
      to: "/medico/historico",
    },

    {
      label: "Pacientes",
      icon: "fa-users",
      to: "/medico/pacientes",
    },

    {
      label: "Atestados",
      icon: "fa-file-circle-check",
      to: "/medico/atestados",
    },

    {
      label: "Receitas",
      icon: "fa-file-medical",
      to: "/medico/receitas",
    },

    {
      label: "Exames",
      icon: "fa-flask",
      to: "/medico/exames",
    },

    {
      label: "Mensagens",
      icon: "fa-comment-dots",
      to: "/medico/mensagens",
    },

    {
      label: "Configurações",
      icon: "fa-gear",
      to: "/medico/configuracoes",
    },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <i className="fa-solid fa-heart-pulse" />
        </div>

        <div>
          <span className="sidebar__logo-name">
            Saúde+
          </span>

          <span className="sidebar__logo-tagline">
            Bem cuidar de você
          </span>
        </div>
      </div>

      <nav className="sidebar__nav">

        {navItems.map((item) => {

          const active = item.exact
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar__nav-item ${
                active
                  ? "sidebar__nav-item--active"
                  : ""
              }`}
            >

              <i className={`fa-solid ${item.icon}`} />

              <span>
                {item.label}
              </span>

            </Link>
          );
        })}

        <Link
          to="/"
          onClick={() =>
            localStorage.removeItem(
              "usuario"
            )
          }
          className="
          sidebar__nav-item
          sidebar__nav-item--logout
          "
          style={{
            marginTop: "auto"
          }}
        >

          <i className="fa-solid fa-arrow-right-from-bracket" />

          <span>Sair</span>

        </Link>

      </nav>

    </aside>
  );
}