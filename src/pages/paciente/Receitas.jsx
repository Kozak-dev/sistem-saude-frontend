import React, { useState, useEffect} from "react";
import "./Receitas.css";

export default function NomeDaTela() {
  const [receitas, setReceitas] = useState([]);
  const [busca, setBusca] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("todas");
  const [statusFiltro, setStatusFiltro] = useState("todas");
  const [pagina, setPagina] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  useEffect(() => {
  carregarReceitas();
}, []);

async function carregarReceitas() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "https://localhost:7150/api/ReceitasPaciente",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("Receitas:", data);

    setReceitas(data);
  } catch (error) {
    console.log(error);
  }
}
  const acoesRapidas = [
    {
      id: 1,
      titulo: "Nova consulta",
      descricao: "Agende uma consulta",
      icone: "fa-calendar-plus",
    },
    {
      id: 2,
      titulo: "Medicamentos de uso contínuo",
      descricao: "Veja seus medicamentos",
      icone: "fa-pills",
    },
    {
      id: 3,
      titulo: "Histórico de receitas",
      descricao: "Consulte receitas antigas",
      icone: "fa-file-lines",
    },
    {
      id: 4,
      titulo: "Como usar a receita digital",
      descricao: "Dúvidas sobre a receita eletrônica",
      icone: "fa-book-medical",
    },
  ];

  const ITEMS_POR_PAGINA = 4;
  console.log(receitas);
  const receitasFiltradas = receitas.filter((receita) => {
  const buscaMatch =
    (receita.medico?.nome || receita.medico || "")
      .toString()
      .toLowerCase()
      .includes(busca.toLowerCase()) ||
    (receita.medicamento || "")
      .toString()
      .toLowerCase()
      .includes(busca.toLowerCase());

  return buscaMatch;
});

  const totalPaginas = Math.ceil(
    receitasFiltradas.length / ITEMS_POR_PAGINA
  );

  const receitasVisiveis = receitasFiltradas.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  );
  const totalReceitas = receitas.length;

  const receitasAtivas = receitas.filter(
  r => r.status === "Ativa"
).length;
const receitasAVencer = receitas.filter(
  r => r.status === "Emitida"
).length;

const receitasVencidas = receitas.filter(
  r => r.status === "Vencida"
).length;

  const abrirModal = (receita) => {
    setReceitaSelecionada(receita);
    setModalAberto(true);
  };

  const trocarAba = (aba) => {
    setAbaAtiva(aba);
    setPagina(1);
  };

  const limparFiltros = () => {
    setBusca("");
    setStatusFiltro("todas");
    setAbaAtiva("todas");
    setPagina(1);
  };

  const getStatusClasse = (status) => {
  return "receitas-status-verde";
};

  const getStatusTexto = (status) => {
  return status;
};
console.log(receitas);
console.log(receitas.map(r => r.status));


  return (
    <div className="receitas-page">
      <div className="receitas-header">
        <div>
          <h1 className="receitas-title">
            Receitas
          </h1>

          <p className="receitas-subtitle">
            Acesse suas receitas médicas
          </p>
        </div>
      </div>

      <div className="receitas-layout">
        <div className="receitas-main">
          <div className="receitas-card">
            <div className="receitas-tabs">
              <div
                onClick={() =>
                  trocarAba("todas")
                }
                className={`receitas-tab ${
                  abaAtiva === "todas"
                    ? "receitas-tab-active"
                    : ""
                }`}
              >
                <i className="fa-solid fa-receipt"></i>
                Todas
              </div>

              <div
                onClick={() =>
                  trocarAba("ativa")
                }
                className={`receitas-tab ${
                  abaAtiva === "ativa"
                    ? "receitas-tab-active"
                    : ""
                }`}
              >
                <i className="fa-solid fa-calendar-check"></i>
                Ativas
              </div>

              <div
                onClick={() =>
                  trocarAba("encerrada")
                }
                className={`receitas-tab ${
                  abaAtiva === "encerrada"
                    ? "receitas-tab-active"
                    : ""
                }`}
              >
                <i className="fa-solid fa-circle-check"></i>
                Encerradas
              </div>

              <div
                onClick={() =>
                  trocarAba("favorita")
                }
                className={`receitas-tab ${
                  abaAtiva === "favorita"
                    ? "receitas-tab-active"
                    : ""
                }`}
              >
                <i className="fa-solid fa-star"></i>
                Favoritas
              </div>
            </div>

            <div className="receitas-filters">
              <div className="receitas-filter-group">
                <label className="receitas-label">
                  Buscar receita
                </label>

                <div className="receitas-search">
                  <input
                    type="text"
                    placeholder="Buscar por medicamento ou médico..."
                    value={busca}
                    onChange={(e) =>
                      setBusca(e.target.value)
                    }
                    className="receitas-input"
                  />

                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>

              <div className="receitas-filter-group">
                <label className="receitas-label">
                  Situação
                </label>

                <select
                  className="receitas-select"
                  value={statusFiltro}
                  onChange={(e) =>
                    setStatusFiltro(
                      e.target.value
                    )
                  }
                >
                  <option value="todas">
                    Todas
                  </option>

                  <option value="ativa">
                    Ativas
                  </option>

                  <option value="vencida">
                    Vencidas
                  </option>

                  <option value="encerrada">
                    Encerradas
                  </option>
                </select>
              </div>

              <div
                className="receitas-clear-btn"
                onClick={limparFiltros}
              >
                <i className="fa-solid fa-filter-circle-xmark"></i>
                Limpar filtros
              </div>
            </div>
          </div>

          <div className="receitas-list-area">
            <h2 className="receitas-section-title">
              Lista de receitas
            </h2>

            {receitasVisiveis.map((receita) => (
              <div
                key={receita.id}
                className="receitas-item"
              >
                <div className="receitas-date">
                <strong>
                  {new Date(receita.data).getDate()}
                </strong>

                <span>
                  {new Date(receita.data).toLocaleString("pt-BR", {
                    month: "short",
                  })}
                </span>

                <small>
                  {new Date(receita.data).getFullYear()}
                </small>
              </div>

                <div className="receitas-avatar">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>

                <div className="receitas-info">
                  <h3>
                    {receita.medico}
                  </h3>

                  <p>
                    {receita.medicamento}
                  </p>

                  <small>
                    Data: {new Date(receita.data).toLocaleDateString("pt-BR")}
                  </small>
                </div>

                <div className="receitas-status-area">
                  <div
                    className={`receitas-status ${getStatusClasse(
                      receita.status
                    )}`}
                  >
                    <i className="fa-solid fa-circle"></i>

                    {getStatusTexto(
                      receita.status
                    )}
                  </div>

                  <span>
                    Dosagem: {receita.dosagem}
                  </span>
                </div>

                <div className="receitas-actions">
                  <button
                    className="receitas-btn"
                    onClick={() =>
                      abrirModal(receita)
                    }
                  >
                    <i className="fa-solid fa-eye"></i>
                    Ver receita
                  </button>

                  <div
                    className="receitas-more"
                    onClick={() =>
                      abrirModal(receita)
                    }
                  >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                </div>
              </div>
            ))}

            {receitasVisiveis.length === 0 && (
              <div className="receitas-empty">
                Nenhuma receita encontrada
              </div>
            )}

            <div className="receitas-pagination">
              {Array.from(
                { length: totalPaginas },
                (_, index) => (
                  <button
                    key={index}
                    className={`receitas-page-btn ${
                      pagina === index + 1
                        ? "receitas-page-active"
                        : ""
                    }`}
                    onClick={() =>
                      setPagina(index + 1)
                    }
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="receitas-info-card">
            <div className="receitas-info-icon">
              <i className="fa-solid fa-circle-info"></i>
            </div>

            <div>
              <h3>Importante</h3>

              <p>
                Receitas digitais têm validade
                legal. Apresente o QR Code
                ou código da receita em
                qualquer farmácia.
              </p>
            </div>
          </div>
        </div>

        <div className="receitas-sidebar">
          <div className="receitas-side-card">
            <h3 className="receitas-side-title">
              Resumo
            </h3>

            <div className="receitas-summary-list">
              <div className="receitas-summary receitas-summary-green">
                <div>
                  <span>
                    Receitas ativas
                  </span>

                  <strong>{receitasAtivas}</strong>
                </div>

                <i className="fa-solid fa-file-medical"></i>
              </div>

              <div className="receitas-summary receitas-summary-orange">
                <div>
                  <span>A vencer</span>

                  <strong>{receitasAVencer}</strong>
                </div>

                <i className="fa-solid fa-clock"></i>
              </div>

              <div className="receitas-summary receitas-summary-red">
                <div>
                  <span>Vencidas</span>

                  <strong>{receitasVencidas}</strong>
                </div>

                <i className="fa-solid fa-calendar-xmark"></i>
              </div>

              <div className="receitas-summary receitas-summary-purple">
                <div>
                  <span>
                    Total de receitas
                  </span>

                 <strong>{totalReceitas}</strong>
                </div>

                <i className="fa-solid fa-file-prescription"></i>
              </div>
            </div>
          </div>

          <div className="receitas-side-card">
            <h3 className="receitas-side-title">
              Ações rápidas
            </h3>

            <div className="receitas-quick-list">
              {acoesRapidas.map((acao) => (
                <div
                  key={acao.id}
                  className="receitas-quick-item"
                  onClick={() =>
                    alert(
                      `${acao.titulo} selecionado`
                    )
                  }
                >
                  <div className="receitas-quick-icon">
                    <i
                      className={`fa-solid ${acao.icone}`}
                    ></i>
                  </div>

                  <div>
                    <strong>
                      {acao.titulo}
                    </strong>

                    <span>
                      {acao.descricao}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modalAberto &&
        receitaSelecionada && (
          <div className="receitas-modal-overlay">
            <div className="receitas-modal">
              <div className="receitas-modal-icon">
                <i className="fa-solid fa-file-prescription"></i>
              </div>

              <h2>
                Detalhes da Receita
              </h2>

              <div className="receitas-modal-content">
                <div className="receitas-modal-row">
                  <span>Médico</span>

                  <strong>
                    {
                      receitaSelecionada.medico
                    }
                  </strong>
                </div>

                <div className="receitas-modal-row">
                  <span>
                    Especialidade
                  </span>

                  <strong>
                    {
                      receitaSelecionada.medicamento
                    }
                  </strong>
                </div>

                <div className="receitas-modal-row">
                  <span>Status</span>

                  <strong>
                    {getStatusTexto(
                      receitaSelecionada.status
                    )}
                  </strong>
                </div>

                <div className="receitas-modal-row">
                  <span>Validade</span>

                  <strong>
                    {
                      receitaSelecionada.dosagem
                    }
                  </strong>
                </div>
              </div>

              <button
                className="receitas-modal-btn"
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