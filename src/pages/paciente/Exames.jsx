import React, { useMemo, useState, useEffect } from "react";
import "./Exames.css";


const ITENS_POR_PAGINA = 5;

export default function Exames() {
  const [exames, setExames] = useState([]);
  const [busca, setBusca] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("todos");
  const [situacao, setSituacao] = useState("todos");
  const [pagina, setPagina] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [exameSelecionado,setExameSelecionado] =useState(null);
  const abrirModal = (exame) => { setExameSelecionado(exame);setModalAberto(true);};
  const fecharModal = () => { setModalAberto(false); setExameSelecionado(null);};
  const limparFiltros = () => {  setBusca(""); setSituacao("todos"); setAbaAtiva("todos"); setPagina(1);};

  useEffect(() => {
  carregarExames();
}, []);

  async function carregarExames() {

  const token =
    localStorage.getItem("token");

  try {

    const response =
      await fetch(
        "https://localhost:7150/api/exames",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    const data =
      await response.json();

    console.log(data);

    setExames(data);

  } catch (error) {

    console.log(error);

  }

}

  const examesFiltrados = useMemo(() => {
    return exames.filter((exame) => {

      const buscaOk =

  exame.nome
    ?.toLowerCase()
    .includes(busca.toLowerCase())

  ||

  exame.paciente
    ?.toLowerCase()
    .includes(busca.toLowerCase());

      const situacaoOk =
        situacao === "todos"
          ? true
          : exame.status === situacao;

      let abaOk = true;

      if (abaAtiva === "solicitados") {
        abaOk =
          exame.status ===
          "aguardando";
      }

      if (abaAtiva === "realizados") {
        abaOk =
          exame.status ===
          "realizado";
      }

      if (
        abaAtiva ===
        "disponiveis"
      ) {
        abaOk =
          exame.status ===
          "disponivel";
      }

      return (
        buscaOk &&
        situacaoOk &&
        abaOk
      );
    });
  }, [
    exames,
    busca,
    situacao,
    abaAtiva
  ]);

  const totalPaginas =
    Math.ceil(
      examesFiltrados.length /
      ITENS_POR_PAGINA
    );

  const examesVisiveis =
    examesFiltrados.slice(
      (pagina - 1) *
        ITENS_POR_PAGINA,
      pagina *
        ITENS_POR_PAGINA
    );

  return (
    <div className="exam-container">

      <div className="exam-layout">

        <div className="exam-content">

          <div className="exam-card">

            <div className="exam-tabs">

              <div
                className={`exam-tab ${
                  abaAtiva === "todos"
                    ? "exam-tab-active"
                    : ""
                }`}
                onClick={() => {
                  setAbaAtiva(
                    "todos"
                  );
                  setPagina(1);
                }}
              >
                Todos
              </div>

              <div
                className={`exam-tab ${
                  abaAtiva ===
                  "solicitados"
                    ? "exam-tab-active"
                    : ""
                }`}
                onClick={() => {
                  setAbaAtiva(
                    "solicitados"
                  );
                  setPagina(1);
                }}
              >
                Solicitados
              </div>

              <div
                className={`exam-tab ${
                  abaAtiva ===
                  "realizados"
                    ? "exam-tab-active"
                    : ""
                }`}
                onClick={() => {
                  setAbaAtiva(
                    "realizados"
                  );
                  setPagina(1);
                }}
              >
                Realizados
              </div>

              <div
                className={`exam-tab ${
                  abaAtiva ===
                  "disponiveis"
                    ? "exam-tab-active"
                    : ""
                }`}
                onClick={() => {
                  setAbaAtiva(
                    "disponiveis"
                  );
                  setPagina(1);
                }}
              >
                Resultados disponíveis
              </div>

            </div>

            <div className="exam-filters">

              <div className="exam-field">
                <label>
                  Buscar exame
                </label>

                <input
                  type="text"
                  value={busca}
                  placeholder="Buscar por nome do exame..."
                  onChange={(e) =>
                    setBusca(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="exam-field">
                <label>
                  Situação
                </label>

                <select
                  value={situacao}
                  onChange={(e) =>
                    setSituacao(
                      e.target.value
                    )
                  }
                >
                  <option value="todos">
                    Todas
                  </option>

                  <option value="disponivel">
                    Disponível
                  </option>

                  <option value="aguardando">
                    Aguardando
                  </option>

                  <option value="realizado">
                    Realizado
                  </option>
                </select>
              </div>

              <div
                className="exam-clear-btn"
                onClick={
                  limparFiltros
                }
              >
                <i className="fa-solid fa-filter-circle-xmark"></i>
                Limpar filtros
              </div>

            </div>

          </div>

          <div className="exam-list-card">

            <h3>
              Lista de exames
            </h3>

            {examesVisiveis.map(
              (exame) => (
                <div
                  key={exame.id}
                  className="exam-item"
                >
                  <div className="exam-icon">
                    <i className="fa-solid fa-flask"></i>
                  </div>

                          <div className="exam-info">

                          <h4>
                            {exame.nome}
                          </h4>

                          <p>
                            Paciente: {exame.paciente}
                          </p>

                          <p>
                            Data: {
                              new Date(exame.data)
                                .toLocaleDateString("pt-BR")
                            }
                          </p>

                        </div>
                     <div className="exam-status">

                    {exame.status ===
                      "disponivel" && (
                      <span className="exam-badge exam-badge-green">
                        Resultado disponível
                      </span>
                    )}

                    {exame.status ===
                      "aguardando" && (
                      <span className="exam-badge exam-badge-orange">
                        Aguardando resultado
                      </span>
                    )}

                    {exame.status ===
                      "realizado" && (
                      <span className="exam-badge exam-badge-blue">
                        Realizado
                      </span>
                    )}

                    <div className="exam-date">
                      Realizado em
                      <strong>
                      {new Date(exame.data)
                        .toLocaleDateString("pt-BR")}
                    </strong>
                    </div>

                  </div>

                  <div className="exam-actions">

                    <div
                      className="exam-view-btn"
                      onClick={() =>
                        abrirModal(
                          exame
                        )
                      }
                    >
                      <i className="fa-solid fa-eye"></i>
                      Ver resultado
                    </div>

                  </div>

                </div>
              )
            )}

            <div className="exam-pagination">

              {Array.from(
                {
                  length:
                    totalPaginas
                },
                (_, i) => (
                  <div
                    key={i}
                    className={`exam-page ${
                      pagina ===
                      i + 1
                        ? "exam-page-active"
                        : ""
                    }`}
                    onClick={() =>
                      setPagina(
                        i + 1
                      )
                    }
                  >
                    {i + 1}
                  </div>
                )
              )}

            </div>

          </div>

        </div>

        <div className="exam-sidebar">

          <div className="exam-summary-card">

            <h3>Resumo</h3>

            <div className="exam-summary exam-summary-green">
              <span>
                Resultados disponíveis
              </span>
              <strong>
              {exames.filter(
                (e) => e.status === "disponivel"
              ).length}
            </strong>
            </div>

            <div className="exam-summary exam-summary-orange">
              <span>
                Aguardando resultado
              </span>
              <strong>
                {exames.filter(
                  (e) => e.status === "aguardando"
                ).length}
              </strong>
            </div>

            <div className="exam-summary exam-summary-blue">
              <span>
                Realizados este ano
              </span>
              <strong>
                {exames.filter(
                  (e) => e.status === "realizado"
                ).length}
              </strong>
            </div>

            <div className="exam-summary exam-summary-purple">
              <span>
                Total de exames
              </span>
              <strong>
                {exames.length}
              </strong>
            </div>

          </div>

          <div className="exam-summary-card">

            <h3>
              Ações rápidas
            </h3>

            <div
              className="exam-quick-action"
              onClick={() =>
                alert(
                  "Agendar exame"
                )
              }
            >
              <i className="fa-solid fa-calendar-plus"></i>
              <span>
                Agendar exame
              </span>
            </div>

            <div
              className="exam-quick-action"
              onClick={() =>
                alert(
                  "Ver preparos"
                )
              }
            >
              <i className="fa-solid fa-file-medical"></i>
              <span>
                Ver preparos
              </span>
            </div>

            <div
              className="exam-quick-action"
              onClick={() =>
                alert(
                  "Laudos e documentos"
                )
              }
            >
              <i className="fa-solid fa-file-lines"></i>
              <span>
                Laudos e documentos
              </span>
            </div>

            <div
              className="exam-quick-action"
              onClick={() =>
                alert(
                  "Compartilhar resultados"
                )
              }
            >
              <i className="fa-solid fa-share-nodes"></i>
              <span>
                Compartilhar resultados
              </span>
            </div>

          </div>

        </div>

      </div>

      {modalAberto &&
        exameSelecionado && (
          <div className="exam-modal-overlay">

            <div className="exam-modal">

              <div className="exam-modal-header">

                <h2>
                  Resultado do Exame
                </h2>

                <div
                  className="exam-close"
                  onClick={
                    fecharModal
                  }
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>

              </div>

              <div className="exam-modal-body">

                <div className="exam-modal-row">
                <strong>Exame:</strong>
                {exameSelecionado.nome}
              </div>

                <div className="exam-modal-row">
                <strong>Médico:</strong>
                {exameSelecionado.medico}
              </div>

                <div className="exam-modal-row">
                <strong>Especialidade:</strong>
                {exameSelecionado.especialidade}
              </div>

                <div className="exam-modal-row">
                  <strong>Data:</strong>

                  <strong>
                    {new Date(
                      exameSelecionado.data
                    ).toLocaleDateString("pt-BR")}
                  </strong>
                </div>

                <div className="exam-result-box">
                  {exameSelecionado.resultado}
                </div>

              </div>

              <div className="exam-modal-footer">

                <div
                  className="exam-secondary-btn"
                  onClick={
                    fecharModal
                  }
                >
                  Fechar
                </div>

                <div
                  className="exam-view-btn"
                  onClick={() =>
                    alert(
                      "Download iniciado"
                    )
                  }
                >
                  <i className="fa-solid fa-download"></i>
                  Baixar PDF
                </div>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}