import React, {useEffect,useMemo,useState} from "react";
import "./CalendarioMedico.css";

const diasSemana = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb"
];
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];
const ITEMS_POR_PAGINA = 5;

export default function NomeDaTela() {

  const [diaSelecionado, setDiaSelecionado] = useState(14);

  const [busca, setBusca] = useState("");

  const [abaAtiva, setAbaAtiva] = useState("todos");

  const [pagina, setPagina] = useState(1);

  const [consultas, setConsultas] =
    useState([]);

  const [loading, setLoading] = useState(true);
  
  const [dataAtual, setDataAtual] = useState(new Date());

  const mesAtual = dataAtual.getMonth();

  const anoAtual = dataAtual.getFullYear();

  const primeiroDia = new Date(anoAtual,mesAtual,1).getDay();

  const totalDias = new Date(anoAtual,mesAtual + 1,0).getDate();

const diasCalendario = [
  ...Array(primeiroDia).fill(null),

  ...Array.from(
    { length: totalDias },
    (_, i) => i + 1
  )
];

  useEffect(() => {
    carregarConsultas();
  }, []);

  const carregarConsultas = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "https://localhost:7150/api/medico/consultas",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      const consultasFormatadas =
        data.map((consulta) => ({
          id: consulta.id,

          horario:
            consulta.horario,

          paciente:
            consulta.paciente,

          tipo:
            consulta.status ===
            "realizada"
              ? "Consulta realizada"
              : "Consulta agendada",

          status:
            consulta.status.toLowerCase(),

          dia: new Date(
            consulta.data
          ).getDate()
        }));

      setConsultas(
        consultasFormatadas
      );

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };
  const [consultaSelecionada, setConsultaSelecionada] =
    useState(null);

  const [modalAberto, setModalAberto] = useState(false);

  const consultasFiltradas = useMemo(() => {
    return consultas.filter((consulta) => {
      const matchDia =
        consulta.dia === diaSelecionado;

      const matchBusca =
        consulta.paciente
          .toLowerCase()
          .includes(busca.toLowerCase());

      const matchStatus =
        abaAtiva === "todos"
          ? true
          : consulta.status === abaAtiva;

      return matchDia && matchBusca && matchStatus;
    });
  }, [consultas, diaSelecionado, busca, abaAtiva]);

  const totalPaginas = Math.ceil(
    consultasFiltradas.length / ITEMS_POR_PAGINA
  );

  const consultasVisiveis = consultasFiltradas.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  );

  const abrirModal = (consulta) => {
    setConsultaSelecionada(consulta);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const confirmarConsulta = async () => {
  try {

    const token = localStorage.getItem("token");

    const response = await fetch(`https://localhost:7150/api/medico/confirmar/${consultaSelecionada.id}`,
      {
        method: "PUT",

        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        "Erro ao confirmar consulta"
      );
    }

    await carregarConsultas();

    setModalAberto(false);

  } catch (error) {

    console.error(error);

    alert(
      "Erro ao confirmar consulta"
    );
  }
};
  const renderizarBadge = (status) => {
    if (status === "agendada") {
      return (
        <div className="agenda-badge agenda-badge-azul">
          Agendada
        </div>
      );
    }

    if (status === "realizada") {
      return (
        <div className="agenda-badge agenda-badge-verde">
          Realizada
        </div>
      );
    }

    return (
      <div className="agenda-badge agenda-badge-vermelho">
        Cancelada
      </div>
    );
  };
  if (loading) {
  return (
    <div>
      Carregando consultas...
    </div>
  );
}

  return (
    <div className="agenda-container">
      <div className="agenda-card">
        <div className="agenda-topo">
          <div>
            <h1 className="agenda-titulo">
              Calendário / Agenda
            </h1>

            <p className="agenda-subtitulo">
              Gerencie consultas e compromissos médicos
            </p>
          </div>

          <div
            className="agenda-botao-principal"
            onClick={() =>
              alert("Nova consulta adicionada")
            }
          >
            <i className="fa-solid fa-plus"></i>
            Nova Consulta
          </div>
        </div>

        <div className="agenda-filtros">
          <div className="agenda-input-box">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Buscar paciente..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value);
                setPagina(1);
              }}
            />
          </div>

          <div className="agenda-tabs">
            <div
              className={`agenda-tab ${
                abaAtiva === "todos"
                  ? "agenda-tab-ativa"
                  : ""
              }`}
              onClick={() => {
                setAbaAtiva("todos");
                setPagina(1);
              }}
            >
              Todos
            </div>

            <div
              className={`agenda-tab ${
                abaAtiva === "agendada"
                  ? "agenda-tab-ativa"
                  : ""
              }`}
              onClick={() => {
                setAbaAtiva("agendada");
                setPagina(1);
              }}
            >
              Agendadas
            </div>

            <div
              className={`agenda-tab ${
                abaAtiva === "realizada"
                  ? "agenda-tab-ativa"
                  : ""
              }`}
              onClick={() => {
                setAbaAtiva("realizada");
                setPagina(1);
              }}
            >
              Realizadas
            </div>
          </div>
        </div>

        <div className="agenda-grid">
          <div className="agenda-calendario">
            <div className="agenda-calendario-topo">
              <div
                className="agenda-nav-btn"
                onClick={() =>
                  setDataAtual(new Date(anoAtual,mesAtual - 1,1))
                }
              >
                <i className="fa-solid fa-chevron-left"></i>
              </div>

              <h2> {meses[mesAtual]} {anoAtual} </h2>

              <div
                className="agenda-nav-btn"
                onClick={() =>
                  setDataAtual(new Date(anoAtual,mesAtual + 1,1))
                }
              >
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>

            <div className="agenda-semana">
              {diasSemana.map((dia) => (
                <div
                  key={dia}
                  className="agenda-dia-semana"
                >
                  {dia}
                </div>
              ))}
            </div>

            <div className="agenda-dias">
              {diasCalendario.map((dia, index) => (
                <div
                  key={index}
                  className={`agenda-dia ${
                    diaSelecionado === dia
                      ? "agenda-dia-ativo"
                      : ""
                  } ${
                    dia === null
                      ? "agenda-dia-vazio"
                      : ""
                  }`}
                  onClick={() => {
                    if (dia) {
                      setDiaSelecionado(dia);
                      setPagina(1);
                    }
                  }}
                >
                  {dia}
                </div>
              ))}
            </div>
          </div>

          <div className="agenda-consultas">
            <div className="agenda-consultas-topo">
              <h2>
  {new Date(
    anoAtual,
    mesAtual,
    diaSelecionado
  ).toLocaleDateString(
    "pt-BR",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  )}
</h2>
            </div>

            <div className="agenda-lista">
              {consultasVisiveis.map((consulta) => (
                <div
                  key={consulta.id}
                  className="agenda-item"
                >
                  <div className="agenda-item-hora">
                    {consulta.horario}
                  </div>

                  <div className="agenda-item-info">
                    <h3>{consulta.paciente}</h3>

                    <p>{consulta.tipo}</p>
                  </div>

                  <div className="agenda-item-direita">
                    {renderizarBadge(
                      consulta.status
                    )}

                    <div
                      className="agenda-acao"
                      onClick={() =>
                        abrirModal(consulta)
                      }
                    >
                      <i className="fa-solid fa-eye"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="agenda-paginacao">
              {Array.from(
                { length: totalPaginas },
                (_, index) => (
                  <div
                    key={index}
                    className={`agenda-pagina ${
                      pagina === index + 1
                        ? "agenda-pagina-ativa"
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
          </div>
        </div>
      </div>

      {modalAberto && consultaSelecionada && (
        <div className="agenda-modal-overlay">
          <div className="agenda-modal">
            <div className="agenda-modal-topo">
              <div>
                <h2>
                  Consulta de{" "}
                  {consultaSelecionada.paciente}
                </h2>

                <p>
                  Horário:{" "}
                  {consultaSelecionada.horario}
                </p>
              </div>

              <div
                className="agenda-fechar"
                onClick={fecharModal}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>

            <div className="agenda-modal-conteudo">
              <div className="agenda-modal-item">
                <span>Paciente</span>

                <strong>
                  {
                    consultaSelecionada.paciente
                  }
                </strong>
              </div>

              <div className="agenda-modal-item">
                <span>Status</span>

                {renderizarBadge(
                  consultaSelecionada.status
                )}
              </div>

              <div className="agenda-modal-item">
                <span>Tipo</span>

                <strong>
                  {consultaSelecionada.tipo}
                </strong>
              </div>
            </div>

            <div className="agenda-modal-acoes">
              <div
                className="agenda-botao-secundario"
                onClick={fecharModal}
              >
                Fechar
              </div>

              <div
                className="agenda-botao-primario"
                onClick={confirmarConsulta}
              >
                Confirmar Consulta
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}