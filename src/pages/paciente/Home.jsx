import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const API = "https://localhost:7150/api/Consultas";

export default function Home() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {

  async function carregar() {

    const token = localStorage.getItem("token");

    try {

      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {

        const dados = await res.json();

        setConsultas(dados);

      }

    } catch {

      setConsultas([]);

    } finally {

      setLoading(false);

    }

  }

  carregar();

}, []);

  const agora = new Date();
  const proximas = consultas.filter((c) => new Date(c.dataHora) >= agora);
  const anteriores = consultas.filter((c) => new Date(c.dataHora) < agora);

  const proximaConsulta =
    proximas.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora))[0] || null;

  function formatarData(iso) {
    const d = new Date(iso);
    return isNaN(d)
      ? "—"
      : d.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
  }

  function formatarHora(iso) {
    const d = new Date(iso);
    return isNaN(d)
      ? "—"
      : d.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });
  }

  return (
    <div className="page-body">
      

      {/* QUICK ACTIONS */}
      <section className="quick-actions">
        <Link to="/consultas" className="quick-card">
          <div className="quick-card__icon quick-card__icon--teal">
            <i className="fa-solid fa-calendar-plus" />
          </div>
          <div>
            <h3>Agendar Consulta</h3>
            <p>Marque uma nova consulta</p>
          </div>
        </Link>

        <Link to="/receitas" className="quick-card">
          <div className="quick-card__icon quick-card__icon--navy">
            <i className="fa-regular fa-clock" />
          </div>
          <div>
            <h3>Ver Receita</h3>
            <p>Consulte suas receitas médicas</p>
          </div>
        </Link>

        <Link to="/consultas" className="quick-card">
          <div className="quick-card__icon quick-card__icon--green">
            <i className="fa-solid fa-user-doctor" />
          </div>
          <div>
            <h3>Histórico de Consultas</h3>
            <p>Veja suas consultas realizadas</p>
          </div>
        </Link>

        <Link to="/configuracoes" className="quick-card">
          <div className="quick-card__icon quick-card__icon--purple">
            <i className="fa-solid fa-chart-bar" />
          </div>
          <div>
            <h3>Atualizar Dados</h3>
            <p>Mantenha seus dados sempre atualizados</p>
          </div>
        </Link>
      </section>

      {/* MIDDLE */}
      <div className="mid-row">

        {/* Próxima Consulta */}
        <div className="card card--next">
          <div className="card__header">
            <i className="fa-regular fa-calendar-check card__header-icon icon--teal" />
            <h2>Próxima Consulta</h2>
          </div>

          {loading ? (
            <div className="state-msg">
              <i className="fa-solid fa-spinner fa-spin" />
            </div>
          ) : proximaConsulta ? (
            <div className="next-appt">
              <div className="next-appt__date-row">
                <span>{formatarData(proximaConsulta.dataHora)}</span>
                <span className="badge badge--green">
                  {proximaConsulta.status || "Confirmada"}
                </span>
              </div>

              <p>
                <i className="fa-regular fa-clock" />{" "}
                {formatarHora(proximaConsulta.dataHora)}
              </p>

              <p>{proximaConsulta.pacienteNome}</p>
              <p>{proximaConsulta.especialidade}</p>

              <Link to="/consultas" className="btn btn--primary btn--full">
                Ver detalhes da consulta
              </Link>
            </div>
          ) : (
            <div className="state-msg">
              <p>Nenhuma consulta agendada</p>
            </div>
          )}
        </div>

        {/* Consultas anteriores */}
        <div className="card">
          <div className="card__header">
            <h2>Consultas Anteriores</h2>
          </div>

          <p>
            <strong>{anteriores.length}</strong> consultas realizadas
          </p>

          <div className="simple-list">
            {anteriores.slice(-3).reverse().map((c, i) => (
              <div key={`${c.id}-${i}`}>
                <span>{new Date(c.dataHora).toLocaleDateString("pt-BR")}</span>
                <span>{c.pacienteNome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exames */}
        <div className="card">
          <div className="card__header">
            <h2>Meus Exames</h2>
          </div>

          <p><strong>3</strong> exames realizados</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="bottom-row">

        {/* Avisos */}
        <div className="card">
          <div className="card__header">
            <h2>Avisos Importantes</h2>
          </div>

          {proximaConsulta && (
            <div>
              Você tem consulta às {formatarHora(proximaConsulta.dataHora)}
            </div>
          )}
        </div>

        {/* Mensagens */}
        <div className="card">
          <div className="card__header">
            <h2>Mensagens</h2>
          </div>

          <p>Nenhuma mensagem nova</p>
        </div>

      </div>

    </div>
  );
}