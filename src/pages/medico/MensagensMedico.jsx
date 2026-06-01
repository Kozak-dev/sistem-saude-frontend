import React, { useMemo, useState,  useEffect } from "react";
import "./MensagensMedico.css";



const ITEMS_POR_PAGINA = 4;

export default function NomeDaTela() {
  const [busca, setBusca] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("todos");
  const [pagina, setPagina] = useState(1);
  const [mensagemSelecionada, setMensagemSelecionada] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagens, setMensagens] = useState([]);
  useEffect(() => {

  carregarMensagens();

}, []);

async function carregarMensagens() {

  const token =
    localStorage.getItem("token");

  try {

    const response = await fetch(
      "https://localhost:7150/api/mensagens",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {

      throw new Error(
        "Erro ao carregar mensagens"
      );

    }

    const data =
      await response.json();

    setMensagens(data);

  } catch (error) {

    console.log(error);

  }

}
  const mensagensFiltradas = useMemo(() => {
    return mensagens.filter((mensagem) => {
      const nomeUsuario =
  mensagem.usuario?.nome || "";

const assunto =
  mensagem.assunto || "";

const matchBusca =

  nomeUsuario
    .toLowerCase()
    .includes(busca.toLowerCase())

  ||

  assunto
    .toLowerCase()
    .includes(busca.toLowerCase());

      if (abaAtiva === "todos") {
        return matchBusca;
      }

      if (abaAtiva === "lidas") {
        return ( matchBusca && mensagem.status?.toLowerCase() === "lida");
      }

      if (abaAtiva === "importantes") {
        return ( matchBusca && mensagem.importante === true);
      }

      return matchBusca;
    });
  }, [busca, abaAtiva]);

  const totalPaginas = Math.ceil(
    mensagensFiltradas.length / ITEMS_POR_PAGINA
  );

  const mensagensVisiveis = mensagensFiltradas.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  );

  const abrirMensagem = (mensagem) => {
    setMensagemSelecionada(mensagem);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const marcarComoLida = () => {
    if (mensagemSelecionada) {
      alert(`Mensagem de ${mensagemSelecionada.nome} marcada como lida`);
      setModalAberto(false);
    }
  };

  const renderizarBadge = (status) => {

  const statusLower =
    status?.toLowerCase() || "";

  if (
    statusLower === "nao-lida" ||
    statusLower === "nova"
  ) {

    return (
      <div className="mensagens-badge mensagens-badge-azul">
        Nova
      </div>
    );

  }

  if (
    statusLower === "pendente"
  ) {

    return (
      <div className="mensagens-badge mensagens-badge-laranja">
        Pendente
      </div>
    );

  }

  return (
    <div className="mensagens-badge mensagens-badge-verde">
      Lida
    </div>
  );

};

  return (
    <div className="mensagens-container">
      <div className="mensagens-card">
        <div className="mensagens-topo">
          <div>
            <h1 className="mensagens-titulo">Mensagens</h1>

            <p className="mensagens-subtitulo">
              Gerencie conversas e solicitações dos pacientes
            </p>
          </div>

          <div
            className="mensagens-botao-nova"
            onClick={() => alert("Nova mensagem criada")}
          >
            <i className="fa-solid fa-plus"></i>
            Nova Mensagem
          </div>
        </div>

        <div className="mensagens-tabs">
          <div
            className={`mensagens-tab ${
              abaAtiva === "todos" ? "mensagens-tab-ativa" : ""
            }`}
            onClick={() => {
              setAbaAtiva("todos");
              setPagina(1);
            }}
          >
            Todos
          </div>

          <div
            className={`mensagens-tab ${
              abaAtiva === "lidas" ? "mensagens-tab-ativa" : ""
            }`}
            onClick={() => {
              setAbaAtiva("lidas");
              setPagina(1);
            }}
          >
            Não lidas
          </div>

          <div
            className={`mensagens-tab ${
              abaAtiva === "importantes"
                ? "mensagens-tab-ativa"
                : ""
            }`}
            onClick={() => {
              setAbaAtiva("importantes");
              setPagina(1);
            }}
          >
            Importantes
          </div>
        </div>

        <div className="mensagens-busca-box">
          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            placeholder="Buscar mensagens..."
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPagina(1);
            }}
          />
        </div>

        <div className="mensagens-lista">
          {mensagensVisiveis.map((mensagem) => (
            <div
              key={mensagem.id}
              className="mensagens-item"
              onClick={() => abrirMensagem(mensagem)}
            >
              <div className="mensagens-item-esquerda">
                <div className="mensagens-avatar">
                  {mensagem.usuario?.nome?.substring(0, 2)?.toUpperCase()}
                </div>

                <div className="mensagens-conteudo">
                  <div className="mensagens-linha-topo">
                    <h3>{mensagem.usuario?.nome}</h3>

                    {renderizarBadge(mensagem.status)}
                  </div>

                  <h4>{mensagem.assunto}</h4>

                  <p>{mensagem.texto}</p>
                </div>
              </div>

              <div className="mensagens-horario">
                {new Date(mensagem.dataEnvio).toLocaleDateString("pt-BR")}
              </div>
            </div>
          ))}
        </div>

        <div className="mensagens-paginacao">
          {Array.from({ length: totalPaginas }, (_, index) => (
            <div
              key={index}
              className={`mensagens-pagina ${
                pagina === index + 1
                  ? "mensagens-pagina-ativa"
                  : ""
              }`}
              onClick={() => setPagina(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {modalAberto && mensagemSelecionada && (
        <div className="mensagens-modal-overlay">
          <div className="mensagens-modal">
            <div className="mensagens-modal-topo">
              <div>
                <h2>{mensagemSelecionada.assunto}</h2>

                <span>
                  {mensagemSelecionada.usuario?.nome}
                </span>
              </div>

              <div
                className="mensagens-fechar"
                onClick={fecharModal}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>

            <div className="mensagens-modal-conteudo">
              <p>
                {mensagemSelecionada.texto}
              </p>
            </div>

            <div className="mensagens-modal-acoes">
              <div
                className="mensagens-botao-secundario"
                onClick={fecharModal}
              >
                Fechar
              </div>

              <div
                className="mensagens-botao-primario"
                onClick={marcarComoLida}
              >
                Marcar como lida
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}