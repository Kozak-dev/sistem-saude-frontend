import React, { useMemo, useState,  useEffect} from "react";
import "./ReceitasMedico.css";



const ITEMS_POR_PAGINA = 5;

export default function NomeDaTela() {
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("todos");
  const [pagina, setPagina] = useState(1);
  const [receitas, setReceitas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);
  const receitasFiltradas = useMemo(() => {

  return receitas.filter((receita) => {

    const nomePaciente =
      receita.usuario?.nome || "";

    const nomeMedico =
      receita.medico?.nome || "";

    const matchBusca =

      nomePaciente
        .toLowerCase()
        .includes(busca.toLowerCase())

      ||

      nomeMedico
        .toLowerCase()
        .includes(busca.toLowerCase());

    const matchStatus =

      statusFiltro === "todos"
        ? true
        : receita.status === statusFiltro;

    return matchBusca && matchStatus;

  });

}, [receitas, busca, statusFiltro]);

  const totalPaginas = Math.ceil(
    receitasFiltradas.length / ITEMS_POR_PAGINA
  );

  const receitasVisiveis = receitasFiltradas.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  );

  useEffect(() => {

  carregarReceitas();

}, []);

  async function carregarReceitas() {

  const token =
    localStorage.getItem("token");

  try {

    const response = await fetch(
      "https://localhost:7150/api/receitas",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao carregar receitas"
      );
    }

    const data =
      await response.json();

    setReceitas(data);

  } catch (error) {

    console.log(error);

  }

}
  const abrirModal = (receita) => {
    setReceitaSelecionada(receita);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const excluirReceita = () => {
    alert(
      `Receita de ${receitaSelecionada?.usuario?.nome} removida`
    );

    setModalAberto(false);
  };

  const imprimirReceita = () => {
    alert(
      `Receita de ${receitaSelecionada?.usuario?.nome} impressa`
    );
  };

  const renderizarBadge = (status) => {
    if (status === "emitida") {
      return (
        <div className="receitas-badge receitas-badge-verde">
          Emitida
        </div>
      );
    }

    if (status === "pendente") {
      return (
        <div className="receitas-badge receitas-badge-laranja">
          Pendente
        </div>
      );
    }

    return (
      <div className="receitas-badge receitas-badge-vermelho">
        Cancelada
      </div>
    );
  };

  return (
    <div className="receitas-container">
      <div className="receitas-card">
        <div className="receitas-topo">
          <div>
            <h1 className="receitas-titulo">
              Receitas Emitidas
            </h1>

            <p className="receitas-subtitulo">
              Gerencie receitas médicas emitidas
            </p>
          </div>

          <div
            className="receitas-botao-principal"
            onClick={() =>
              alert("Nova receita criada")
            }
          >
            <i className="fa-solid fa-plus"></i>
            Prescrever Medicamento
          </div>
        </div>

        <div className="receitas-filtros">
          <div className="receitas-input-box">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Buscar receitas..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
            />
          </div>

          <div className="receitas-select-box">
            <select
              value={statusFiltro}
              onChange={(e) => {
                setStatusFiltro(e.target.value);
                setPagina(1);
              }}
            >
              <option value="todos">
                Todos os status
              </option>

              <option value="emitida">
                Emitidas
              </option>

              <option value="pendente">
                Pendentes
              </option>

              <option value="cancelada">
                Canceladas
              </option>
            </select>
          </div>
        </div>

        <div className="receitas-tabela">
          <div className="receitas-tabela-header">
            <div>Data</div>
            <div>Paciente</div>
            <div>Medicamentos</div>
            <div>Médico</div>
            <div>Status</div>
            <div>Ações</div>
          </div>

          {receitasVisiveis.map((receita) => (
            <div
              key={receita.id}
              className="receitas-linha"
            >
              <div>{new Date(receita.data).toLocaleDateString("pt-BR")}</div>

              <div>{receita.usuario?.nome}</div>

              <div>
                {receita.medicamento}
              </div>

              <div>{receita.medico?.nome}</div>

              <div>
                {renderizarBadge(receita.status)}
              </div>

              <div className="receitas-acoes">
                <div
                  className="receitas-acao"
                  onClick={() => abrirModal(receita)}
                >
                  <i className="fa-solid fa-eye"></i>
                </div>

                <div
                  className="receitas-acao"
                  onClick={() =>
                    alert(
                      `Download da receita ${receita.id}`
                    )
                  }
                >
                  <i className="fa-solid fa-download"></i>
                </div>

                <div
                  className="receitas-acao"
                  onClick={() =>
                    alert(
                      `Compartilhando receita ${receita.id}`
                    )
                  }
                >
                  <i className="fa-solid fa-share-nodes"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="receitas-paginacao">
          <div
            className="receitas-paginacao-btn"
            onClick={() =>
              pagina > 1 &&
              setPagina((prev) => prev - 1)
            }
          >
            Anterior
          </div>

          <div className="receitas-paginas">
            {Array.from(
              { length: totalPaginas },
              (_, index) => (
                <div
                  key={index}
                  className={`receitas-pagina ${
                    pagina === index + 1
                      ? "receitas-pagina-ativa"
                      : ""
                  }`}
                  onClick={() =>
                    setPagina(index + 1)
                  }
                >
                  {index + 1}
                </div>
              )
            )}
          </div>

          <div
            className="receitas-paginacao-btn"
            onClick={() =>
              pagina < totalPaginas &&
              setPagina((prev) => prev + 1)
            }
          >
            Próximo
          </div>
        </div>
      </div>

      {modalAberto && receitaSelecionada && (
        <div className="receitas-modal-overlay">
          <div className="receitas-modal">
            <div className="receitas-modal-topo">
              <div>
                <h2>
                  Receita de{" "}
                  {receitaSelecionada.usuario?.nome}
                </h2>

                <p>
                  Emitida em{" "}
                  {new Date(receitaSelecionada.data).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div
                className="receitas-fechar"
                onClick={fecharModal}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>

            <div className="receitas-modal-conteudo">
              <div className="receitas-modal-item">
                <span>Médico</span>
                <strong>
                  {receitaSelecionada.medico?.nome}
                </strong>
              </div>

              <div className="receitas-modal-item">
                <span>Quantidade</span>
                <strong>
                  {
                    receitaSelecionada.medicamentos
                  }{" "}
                  medicamentos
                </strong>
              </div>

              <div className="receitas-modal-item">
                <span>Status</span>

                {renderizarBadge(
                  receitaSelecionada.status
                )}
              </div>
            </div>

            <div className="receitas-modal-acoes">
              <div
                className="receitas-botao-secundario"
                onClick={excluirReceita}
              >
                Excluir
              </div>

              <div
                className="receitas-botao-primario"
                onClick={imprimirReceita}
              >
                Imprimir Receita
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}