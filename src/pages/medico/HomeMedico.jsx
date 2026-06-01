import React, {useEffect,useState,} from "react";
import "./HomeMedico.css";

export default function HomeMedico() {
  const [consultas, setConsultas] =
    useState([]);

  const [resumo, setResumo] =
    useState([
      {
        id: 1,
        titulo: "Atestados emitidos",
        quantidade: 0,
        cor: "verde",
        icone:
          "fa-file-circle-check",
      },
      {
        id: 2,
        titulo: "Receitas emitidas",
        quantidade: 0,
        cor: "azul",
        icone:
          "fa-file-prescription",
      },
      {
        id: 3,
        titulo: "Exames solicitados",
        quantidade: 0,
        cor: "laranja",
        icone: "fa-flask",
      },
    ]);

  const [consultasHoje, setConsultasHoje] =
    useState(0);

  const [pacientesHoje, setPacientesHoje] =
    useState(0);

  const [examesPendentes] =
    useState(0);

  const [receitasEmitidas] =
    useState(0);

  useEffect(() => {
    carregarDashboard();
  }, []);

  async function carregarDashboard() {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const resposta =
        await fetch(
          "https://localhost:7150/api/medico/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const dados =
        await resposta.json();

console.log(
  JSON.stringify(
    dados,
    null,
    2
  )
);

      const lista =
        dados.consultasHoje.map(
          (item) => ({
            id: item.id,

            horario:
              new Date(
                item.dataHora
              ).toLocaleTimeString(
                "pt-BR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              ),

            paciente:
              item.paciente,

            status:
              item.status.toLowerCase(),
          })
        );

      setConsultas(lista);

      setConsultasHoje(
        dados.totalConsultas
      );

      setPacientesHoje(
        dados.totalConsultas
      );
    } catch (erro) {
      console.log(erro);
    }
  }

  const [busca, setBusca] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("todos");
  const [pagina, setPagina] = useState(1);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const ITEMS_POR_PAGINA = 5;

  const consultasFiltradas = consultas.filter((consulta) => {
    const buscaMatch = consulta.paciente
      .toLowerCase()
      .includes(busca.toLowerCase());

    const statusMatch =
      abaAtiva === "todos"
        ? true
        : consulta.status === abaAtiva;

    return buscaMatch && statusMatch;
  });

  const totalPaginas = Math.ceil(
    consultasFiltradas.length / ITEMS_POR_PAGINA
  );

  const consultasVisiveis = consultasFiltradas.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  );

  const abrirDetalhes = (consulta) => {
    setConsultaSelecionada(consulta);
    setModalAberto(true);
  };

  const trocarAba = (aba) => {
    setAbaAtiva(aba);
    setPagina(1);
  };

  const getStatusTexto = (status) => {
    if (status === "agendada") return "Consulta agendada";
    if (status === "atendimento") return "Consulta em atendimento";
    if (status === "realizada") return "Consulta realizada";
    return "Consulta cancelada";
  };

  const getStatusClasse = (status) => {
    if (status === "agendada")
      return "dashboard-status-azul";

    if (status === "atendimento")
      return "dashboard-status-laranja";

    if (status === "realizada")
      return "dashboard-status-verde";

    return "dashboard-status-vermelho";
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-title-area">
      </div>

      <div className="dashboard-cards-grid">
        <div className="dashboard-info-card">
          <div className="dashboard-info-icon dashboard-info-green">
            <i className="fa-solid fa-stethoscope"></i>
          </div>

          <div>
            <span className="dashboard-info-label">
              Consultas Hoje
            </span>

            <h2 className="dashboard-info-number">
              {consultasHoje}
            </h2>

            <p className="dashboard-info-text">
              Total de consultas
            </p>
          </div>
        </div>

        <div className="dashboard-info-card">
          <div className="dashboard-info-icon dashboard-info-green">
            <i className="fa-solid fa-user-doctor"></i>
          </div>

          <div>
            <span className="dashboard-info-label">
              Pacientes Atendidos
            </span>

            <h2 className="dashboard-info-number">
              {pacientesHoje}
            </h2>

            <p className="dashboard-info-text">
              Hoje
            </p>
          </div>
        </div>

        <div className="dashboard-info-card">
          <div className="dashboard-info-icon dashboard-info-purple">
            <i className="fa-solid fa-vial"></i>
          </div>

          <div>
            <span className="dashboard-info-label">
              Exames Pendentes
            </span>

           <h2 className="dashboard-info-number">
            {examesPendentes}
          </h2>

            <p className="dashboard-info-text">
              Aguardando resultado
            </p>
          </div>
        </div>

        <div className="dashboard-info-card">
          <div className="dashboard-info-icon dashboard-info-blue">
            <i className="fa-solid fa-file-prescription"></i>
          </div>

          <div>
            <span className="dashboard-info-label">
              Receitas Emitidas
            </span>

            <h2 className="dashboard-info-number">
            {receitasEmitidas}
            </h2>

            <p className="dashboard-info-text">
              Hoje
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-content-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <h2 className="dashboard-card-title">
                Consultas de Hoje
              </h2>

              <p className="dashboard-card-subtitle">
                Agenda médica diária
              </p>
            </div>
          </div>

          <div className="dashboard-search-area">
            <div className="dashboard-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>

              <input
                type="text"
                placeholder="Buscar paciente..."
                value={busca}
                onChange={(e) =>
                  setBusca(e.target.value)
                }
                className="dashboard-input"
              />
            </div>

            <div className="dashboard-tabs">
              <div
                onClick={() => trocarAba("todos")}
                className={`dashboard-tab ${
                  abaAtiva === "todos"
                    ? "dashboard-tab-active"
                    : ""
                }`}
              >
                Todos
              </div>

              <div
                onClick={() =>
                  trocarAba("agendada")
                }
                className={`dashboard-tab ${
                  abaAtiva === "agendada"
                    ? "dashboard-tab-active"
                    : ""
                }`}
              >
                Agendadas
              </div>

              <div
                onClick={() =>
                  trocarAba("atendimento")
                }
                className={`dashboard-tab ${
                  abaAtiva === "atendimento"
                    ? "dashboard-tab-active"
                    : ""
                }`}
              >
                Atendimento
              </div>
            </div>
          </div>

          <div className="dashboard-list">
            {consultasVisiveis.map((consulta) => (
              <div
                className="dashboard-list-item"
                key={consulta.id}
              >
                <div className="dashboard-list-left">
                  <span className="dashboard-time">
                    {consulta.horario}
                  </span>

                  <span className="dashboard-patient">
                    {consulta.paciente}
                  </span>
                </div>

                <div className="dashboard-list-right">
                  <span
                    className={`dashboard-status ${getStatusClasse(
                      consulta.status
                    )}`}
                  >
                    {getStatusTexto(
                      consulta.status
                    )}
                  </span>

                  <button
                    className="dashboard-action-btn"
                    onClick={() =>
                      abrirDetalhes(consulta)
                    }
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))}

            {consultasVisiveis.length === 0 && (
              <div className="dashboard-empty">
                Nenhuma consulta encontrada
              </div>
            )}
          </div>

          <div className="dashboard-pagination">
            {Array.from(
              { length: totalPaginas },
              (_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setPagina(index + 1)
                  }
                  className={`dashboard-page-btn ${
                    pagina === index + 1
                      ? "dashboard-page-active"
                      : ""
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>

        <div className="dashboard-card dashboard-summary-card">
          <div className="dashboard-card-header">
            <div>
              <h2 className="dashboard-card-title">
                Resumo do Dia
              </h2>

              <p className="dashboard-card-subtitle">
                Indicadores médicos
              </p>
            </div>
          </div>

          <div className="dashboard-summary-list">
            {resumo.map((item) => (
              <div
                key={item.id}
                className="dashboard-summary-item"
              >
                <div className="dashboard-summary-left">
                  <div
                    className={`dashboard-summary-icon dashboard-${item.cor}`}
                  >
                    <i
                      className={`fa-solid ${item.icone}`}
                    ></i>
                  </div>

                  <span className="dashboard-summary-title">
                    {item.titulo}
                  </span>
                </div>

                <strong className="dashboard-summary-number">
                  {item.quantidade}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalAberto && consultaSelecionada && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal">
            <div className="dashboard-modal-icon">
              <i className="fa-solid fa-calendar-check"></i>
            </div>

            <h2 className="dashboard-modal-title">
              Detalhes da Consulta
            </h2>

            <div className="dashboard-modal-content">
              <div className="dashboard-modal-row">
                <span>Paciente</span>

                <strong>
                  {consultaSelecionada.paciente}
                </strong>
              </div>

              <div className="dashboard-modal-row">
                <span>Horário</span>

                <strong>
                  {consultaSelecionada.horario}
                </strong>
              </div>

              <div className="dashboard-modal-row">
                <span>Status</span>

                <strong>
                  {getStatusTexto(
                    consultaSelecionada.status
                  )}
                </strong>
              </div>
            </div>

            <button
              className="dashboard-modal-btn"
              onClick={() =>
                setModalAberto(false)
              }
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}