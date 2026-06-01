import { useState } from "react";
import "./Receitas.css";

const receitas = [
  {
    dia: "10",
    mes: "MAI",
    ano: "2025",
    medico: "Dr. Carlos Mendes",
    avatar: "👨‍⚕️",
    especialidade: "Cardiologista",
    consulta: "10/05/2025",
    status: "ativa",
    validadeLabel: "Válida até 10/06/2025",
  },
  {
    dia: "22",
    mes: "ABR",
    ano: "2025",
    medico: "Dra. Ana Beatriz",
    avatar: "👩‍⚕️",
    especialidade: "Dermatologista",
    consulta: "22/04/2025",
    status: "ativa",
    validadeLabel: "Válida até 22/05/2025",
  },
  {
    dia: "05",
    mes: "MAR",
    ano: "2025",
    medico: "Dr. Rafael Souza",
    avatar: "👨‍⚕️",
    especialidade: "Ortopedista",
    consulta: "05/03/2025",
    status: "vencida",
    validadeLabel: "Venceu em 05/04/2025",
  },
  {
    dia: "15",
    mes: "FEV",
    ano: "2025",
    medico: "Dra. Juliana Martins",
    avatar: "👩‍⚕️",
    especialidade: "Ginecologista",
    consulta: "15/02/2025",
    status: "encerrada",
    validadeLabel: "Encerrada em 15/03/2025",
  },
];

const statusConfig = {
  ativa: { label: "Ativa", className: "badge-ativa", dot: true },
  vencida: { label: "Vencida", className: "badge-vencida", dot: true },
  encerrada: { label: "Encerrada", className: "badge-encerrada", dot: false },
};

const tabs = [
  { id: "todas", label: "Todas", icon: "📋" },
  { id: "ativas", label: "Ativas", icon: "📅" },
  { id: "encerradas", label: "Encerradas", icon: "✅" },
  { id: "favoritas", label: "Favoritas", icon: "⭐" },
];

export default function ReceitasPage() {
  const [activeTab, setActiveTab] = useState("todas");

  return (
    // 🔥 AQUI FOI A CORREÇÃO
    <div className="page-body receitas-page">

      {/* ---- MAIN AREA ---- */}
      <div className="receitas-main">

        {/* Tabs */}
        <div className="receitas-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`receitas-tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="tab-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="receitas-filters">
          <div className="rf-group">
            <label>Buscar receita</label>
            <div className="rf-input">
              <span>🔍</span>
              <span className="rf-placeholder">Buscar por medicamento ou médico...</span>
            </div>
          </div>

          <div className="rf-group">
            <label>Período</label>
            <div className="rf-input">
              <span>📅</span>
              <span className="rf-placeholder">dd/mm/aaaa até dd/mm/aaaa</span>
              <span style={{ marginLeft: "auto" }}>📅</span>
            </div>
          </div>

          <div className="rf-group">
            <label>Situação</label>
            <div className="rf-select">
              <span>Todas</span>
              <span>⌄</span>
            </div>
          </div>

          <button className="rf-clear">⊿ Limpar filtros</button>
        </div>

        {/* List */}
        <div className="receitas-list-title">Lista de receitas</div>

        <div className="receitas-list">
          {receitas.map((r, i) => {
            const st = statusConfig[r.status];
            return (
              <div className="receita-card" key={i}>
                <div className="rc-date">
                  <span className="rc-day">{r.dia}</span>
                  <span className="rc-month">{r.mes}</span>
                  <span className="rc-year">{r.ano}</span>
                </div>

                <div className="rc-avatar">{r.avatar}</div>

                <div className="rc-info">
                  <div className="rc-name">{r.medico}</div>
                  <div className="rc-spec">{r.especialidade}</div>
                  <div className="rc-consulta">Consulta em: {r.consulta}</div>
                </div>

                <div className="rc-status-col">
                  <span className={`rc-badge ${st.className}`}>
                    {st.dot && <span className="rc-dot" />}
                    {st.label}
                  </span>
                  <span className="rc-validade">{r.validadeLabel}</span>
                </div>

                <button className="rc-btn-ver">👁 Ver receita</button>
                <button className="rc-more">⋮</button>
              </div>
            );
          })}
        </div>

        <button className="receitas-load-more">Carregar mais ⌄</button>

        <div className="receitas-banner">
          <span className="banner-icon">ℹ️</span>
          <div className="banner-text">
            <strong>Importante</strong>
            <span>
              Receitas digitais têm validade legal. Apresente o QR Code ou código da receita em qualquer farmácia.
            </span>
          </div>
          <button className="banner-link">Saiba mais</button>
        </div>

      </div>

      {/* ---- RIGHT SIDEBAR ---- */}
      <aside className="receitas-sidebar">

        <div className="rs-card">
          <h3 className="rs-title">Resumo</h3>

          <div className="rs-item">
            <div className="rs-icon blue-bg">📋</div>
            <div>
              <div className="rs-label teal">Receitas ativas</div>
              <div className="rs-count">2</div>
            </div>
          </div>

          <div className="rs-item">
            <div className="rs-icon yellow-bg">⏱</div>
            <div>
              <div className="rs-label orange">A vencer</div>
              <div className="rs-count">1</div>
            </div>
          </div>

          <div className="rs-item">
            <div className="rs-icon red-bg">📅</div>
            <div>
              <div className="rs-label red">Vencidas</div>
              <div className="rs-count">1</div>
            </div>
          </div>

          <div className="rs-item last">
            <div className="rs-icon purple-bg">📄</div>
            <div>
              <div className="rs-label purple">Total de receitas</div>
              <div className="rs-count">{receitas.length}</div>
            </div>
          </div>
        </div>

        <div className="rs-card">
          <h3 className="rs-title">Ações rápidas</h3>

          {[
            { icon: "📅", title: "Nova consulta", sub: "Agende uma consulta" },
            { icon: "💊", title: "Medicamentos de uso contínuo", sub: "Veja seus medicamentos" },
            { icon: "📋", title: "Histórico de receitas", sub: "Consulte receitas antigas" },
            { icon: "📱", title: "Como usar a receita digital", sub: "Dúvidas sobre a receita eletrônica" },
          ].map((a, i) => (
            <div className="rs-action" key={i}>
              <div className="rs-action-icon">{a.icon}</div>
              <div>
                <div className="rs-action-title">{a.title}</div>
                <div className="rs-action-sub">{a.sub}</div>
              </div>
            </div>
          ))}

          <div className="rs-security">
            <span>🛡</span>
            <div>
              <strong>Seus dados estão protegidos</strong>
              <span>Utilizamos criptografia e seguimos os mais altos padrões de segurança.</span>
            </div>
          </div>
        </div>

      </aside>
    </div>
  );
}