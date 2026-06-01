import React, { useMemo, useState, useEffect } from "react";
import "./ExamesMedico.css";

export default function ExamesSolicitados() {
  const [exames, setExames] = useState([]);

  const ITEMS_POR_PAGINA = 5;

  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [exameSelecionado, setExameSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  useEffect(() => {

  carregarExames();

}, []);

async function carregarExames() {

  const token =
    localStorage.getItem("token");

  try {

    const response = await fetch(
      "https://localhost:7150/api/exames",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {

      throw new Error(
        "Erro ao carregar exames"
      );

    }

    const data =
      await response.json();

    setExames(data);

  } catch (error) {

    console.log(error);

  }

}
  const examesFiltrados = useMemo(() => {
    return exames.filter((item) => {
      const nomePaciente =
  item.usuario?.nome || "";

const nomeExame =
  item.nome || "";

const buscaMatch =

  nomePaciente
    .toLowerCase()
    .includes(busca.toLowerCase())

  ||

  nomeExame
    .toLowerCase()
    .includes(busca.toLowerCase());
      const statusMatch =
        statusFiltro === "Todos" || item.status === statusFiltro;

      return buscaMatch && statusMatch;
    });
  }, [busca, statusFiltro]);

  const totalPaginas = Math.ceil(
    examesFiltrados.length / ITEMS_POR_PAGINA
  );

  const examesVisiveis = examesFiltrados.slice(
    (paginaAtual - 1) * ITEMS_POR_PAGINA,
    paginaAtual * ITEMS_POR_PAGINA
  );

  const abrirModal = (item) => {
    setExameSelecionado(item);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setExameSelecionado(null);
  };

  const trocarPagina = (numero) => {
    if (numero >= 1 && numero <= totalPaginas) {
      setPaginaAtual(numero);
    }
  };

  const obterClasseStatus = (status) => {

  const statusLower =
    status?.toLowerCase() || "";

  if (
    statusLower === "aguardando" ||
    statusLower === "pendente"
  ) {

    return "exam-exame-status exam-exame-status-laranja";

  }

  if (
    statusLower === "em andamento"
  ) {

    return "exam-exame-status exam-exame-status-azul";

  }

  return "exam-exame-status exam-exame-status-verde";

};

  return (
    <div className="exam-container">
      <div className="exam-conteudo">
        <div className="exam-topo">
          <div>
            <h1 className="exam-titulo">
              Olá, Dr. João Silva 👋
            </h1>

            <p className="exam-subtitulo">
              Bem-vindo ao sistema Saúde+
            </p>
          </div>

          <button className="exam-botao-topo">
            Exames Solicitados
          </button>
        </div>

        <div className="exam-card">
          <div className="exam-filtros">
            <div className="exam-input-container">
              <i className="fa-solid fa-magnifying-glass"></i>

              <input
                type="text"
                placeholder="Buscar exame..."
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setPaginaAtual(1);
                }}
                className="exam-input"
              />
            </div>

            <select
              className="exam-select"
              value={statusFiltro}
              onChange={(e) => {
                setStatusFiltro(e.target.value);
                setPaginaAtual(1);
              }}
            >
              <option value="Todos">Todos</option>
              <option value="Aguardando">Aguardando</option>
              <option value="Em andamento">
                Em andamento
              </option>
              <option value="Concluído">Concluído</option>
            </select>

            <div className="exam-solicitar-btn">
              <i className="fa-solid fa-plus"></i>
              <span>Solicitar Exame</span>
            </div>
          </div>

          <div className="exam-tabela">
            <div className="exam-tabela-header">
              <div>Data</div>
              <div>Paciente</div>
              <div>Exame</div>
              <div>Status</div>
              <div>Ações</div>
            </div>

            {examesVisiveis.map((item) => (
              <div className="exam-tabela-row" key={item.id}>
                <div>{new Date(item.data).toLocaleDateString("pt-BR")}</div>

                <div>{item.usuario?.nome}</div>

                <div>{item.nome}</div>

                <div>
                  <span className={obterClasseStatus(item.status)}>
                    {item.status}
                  </span>
                </div>

                <div>
                  <button
                    className="exam-acao-btn"
                    onClick={() => abrirModal(item)}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="exam-paginacao">
            <button
              className="exam-paginacao-btn"
              onClick={() => trocarPagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
            >
              Anterior
            </button>

            {[...Array(totalPaginas)].map((_, index) => (
              <button
                key={index}
                className={
                  paginaAtual === index + 1
                    ? "exam-pagina-numero exam-pagina-ativa"
                    : "exam-pagina-numero"
                }
                onClick={() => trocarPagina(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="exam-paginacao-btn"
              onClick={() => trocarPagina(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>

      {modalAberto && exameSelecionado && (
        <div className="exam-modal-overlay">
          <div className="exam-modal">
            <div className="exam-modal-header">
              <h2>Detalhes do Exame</h2>

              <button
                className="exam-fechar-modal"
                onClick={fecharModal}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="exam-modal-body">
              <div className="exam-modal-item">
                <span className="exam-modal-label">
                  Paciente
                </span>

                <span className="exam-modal-valor">
                  {exameSelecionado.usuario?.nome}
                </span>
              </div>

              <div className="exam-modal-item">
                <span className="exam-modal-label">
                  Exame
                </span>

                <span className="exam-modal-valor">
                  {exameSelecionado.nome}
                </span>
              </div>

              <div className="exam-modal-item">
                <span className="exam-modal-label">
                  Status
                </span>

                <span className="exam-modal-valor">
                  {exameSelecionado.status}
                </span>
              </div>

              <div className="exam-modal-item">
                <span className="exam-modal-label">
                  Descrição
                </span>

                <span className="exam-modal-valor">
                  {exameSelecionado.descricao || "Sem descrição"}
                </span>
              </div>
            </div>

            <div className="exam-modal-footer">
              <button
                className="exam-modal-btn"
                onClick={fecharModal}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}