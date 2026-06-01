import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import "./PacientesMedico.css";

const ITEMS_POR_PAGINA = 4;

export default function NomeDaTela() {

  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [abaAtiva, setAbaAtiva] = useState("resumo");
  const [modalAberto, setModalAberto] = useState(false);

  const [
    pacienteSelecionado,
    setPacienteSelecionado
  ] = useState(null);

  const [historico, setHistorico] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [exames, setExames] = useState([]);

 const pacientesFiltrados = useMemo(() => {

  if (!Array.isArray(pacientes)) {
    return [];
  }

  return pacientes.filter(
    (paciente) =>
      paciente.nome
        .toLowerCase()
        .includes(busca.toLowerCase())
  );

}, [pacientes, busca]);

  useEffect(() => {

  carregarPacientes();
  carregarHistorico();
  carregarConsultas();
  carregarReceitas();
  carregarExames();

}, []);

  async function carregarPacientes() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "https://localhost:7150/api/medico/pacientes",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

console.log("TIPO:", typeof data);
console.log("ARRAY?", Array.isArray(data));
console.log(
  "PRIMEIRO PACIENTE:",
  JSON.stringify(data[0], null, 2)
);

setPacientes(data);

if (data.length > 0) {
  setPacienteSelecionado(data[0]);
}

  } catch (error) {
    console.log(error);
  }
}

  async function carregarHistorico() {

    const token =
      localStorage.getItem("token");

    try {

      const response = await fetch(
        "https://localhost:7150/api/medico/historico",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      setHistorico(data);

    } catch (error) {

      console.log(error);

    }

  }

  async function carregarConsultas() {

    const token =
      localStorage.getItem("token");

    try {

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

      setConsultas(data);

    } catch (error) {

      console.log(error);

    }

  }

  const totalPaginas =
    Math.ceil(
      pacientesFiltrados.length /
      ITEMS_POR_PAGINA
    );

  const pacientesVisiveis =
    pacientesFiltrados.slice(
      (pagina - 1) *
      ITEMS_POR_PAGINA,

      pagina *
      ITEMS_POR_PAGINA
    );
    console.log("PACIENTE SELECIONADO");
console.log(pacienteSelecionado);

console.log("CONSULTAS");
console.log(consultas);
console.log(
  "PRIMEIRA CONSULTA:",
  JSON.stringify(
    consultas[0],
    null,
    2
  )
);

console.log("HISTORICO");
console.log(historico);
console.log(
  "PRIMEIRO HISTORICO:",
  JSON.stringify(
    historico[0],
    null,
    2
  )
);

  const historicoPaciente =
    historico.filter(
      (item) =>
        item.paciente ===
        pacienteSelecionado?.nome
    );
    const consultasPaciente =
  consultas.filter(
    (consulta) =>
      consulta.paciente ===
      pacienteSelecionado?.nome
  );

const receitasPaciente =
  receitas.filter(
    (receita) =>
      receita.paciente ===
      pacienteSelecionado?.nome
  );

const examesPaciente =
  exames.filter(
    (exame) =>
      exame.paciente ===
      pacienteSelecionado?.nome
  );

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const excluirPaciente = () => {

    alert(
      `Paciente ${pacienteSelecionado.nome} removido`
    );

    setModalAberto(false);

  };
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

    const data =
      await response.json();

    setReceitas(data);

  } catch (error) {

    console.log(error);

  }

}
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

    const data =
      await response.json();
      console.log(data);

    setExames(data);

  } catch (error) {

    console.log(error);

  }

}

  if (!pacienteSelecionado) {

    return (
      <div>
        Carregando pacientes...
      </div>
    );

  }

  return (

    <div className="hist-container">

      <div className="hist-card">

        <div className="hist-topo">

          <div>

            <h1 className="hist-titulo">
              Histórico de Pacientes
            </h1>

            <p className="hist-subtitulo">
              Visualize o histórico médico dos pacientes
            </p>

          </div>

          <div
            className="hist-botao-principal"
            onClick={() =>
              alert(
                "Novo paciente adicionado"
              )
            }
          >

            <i className="fa-solid fa-plus"></i>

            Novo Paciente

          </div>

        </div>

        <div className="hist-grid">

          <div className="hist-sidebar">

            <div className="hist-input-box">

              <i className="fa-solid fa-magnifying-glass"></i>

              <input
                type="text"
                placeholder="Buscar pacientes..."
                value={busca}
                onChange={(e) => {

                  setBusca(
                    e.target.value
                  );

                  setPagina(1);

                }}
              />

            </div>

            <div className="hist-pacientes-lista">

              {pacientesVisiveis.map(
                (paciente) => (

                  <div
                    key={paciente.pacienteId}
                    className={`hist-paciente-item ${
                     pacienteSelecionado?.pacienteId === paciente.pacienteId
                        ? "hist-paciente-item-ativo"
                        : ""
                    }`}
                    onClick={() =>
                      setPacienteSelecionado(
                        paciente
                      )
                    }
                  >

                    <i className="fa-solid fa-user"></i>

                    <div>

                      <h3>
                        {paciente.nome}
                      </h3>

                      <p>
                        CPF: {
                          paciente.cpf ||
                          "Não informado"
                        }
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

            <div className="hist-paginacao">

              {Array.from(
                {
                  length:
                    totalPaginas
                },

                (_, index) => (

                  <div
                    key={index}
                    className={`hist-pagina ${
                      pagina === index + 1
                        ? "hist-pagina-ativa"
                        : ""
                    }`}
                    onClick={() =>
                      setPagina(
                        index + 1
                      )
                    }
                  >

                    {index + 1}

                  </div>

                )
              )}

            </div>

          </div>

          <div className="hist-detalhes">

            <div className="hist-info-topo">

              <div>

                <h2>
                  {
                    pacienteSelecionado.nome
                  }
                </h2>

                <p>
                  CPF: {
                    pacienteSelecionado.cpf ||
                    "Não informado"
                  }
                </p>

              </div>

              <div
                className="hist-acao"
                onClick={abrirModal}
              >

                <i className="fa-solid fa-trash"></i>

              </div>

            </div>

            <div className="hist-tabs">

              <div
                className={`hist-tab ${
                  abaAtiva === "resumo"
                    ? "hist-tab-ativa"
                    : ""
                }`}
                onClick={() =>
                  setAbaAtiva(
                    "resumo"
                  )
                }
              >
                Resumo
              </div>

              <div
                className={`hist-tab ${
                  abaAtiva === "consultas"
                    ? "hist-tab-ativa"
                    : ""
                }`}
                onClick={() =>
                  setAbaAtiva(
                    "consultas"
                  )
                }
              >
                Consultas
              </div>

              <div
                className={`hist-tab ${
                  abaAtiva === "receitas"
                    ? "hist-tab-ativa"
                    : ""
                }`}
                onClick={() =>
                  setAbaAtiva(
                    "receitas"
                  )
                }
              >
                Receitas
              </div>

              <div
                className={`hist-tab ${
                  abaAtiva === "exames"
                    ? "hist-tab-ativa"
                    : ""
                }`}
                onClick={() =>
                  setAbaAtiva(
                    "exames"
                  )
                }
              >
                Exames
              </div>

            </div>

            {abaAtiva === "resumo" && (

              <>

                <div className="hist-resumo-grid">

                  <div className="hist-resumo-card">

                    <span>
                      Última consulta
                    </span>

                    <strong>

                      {historicoPaciente.length > 0

                        ? new Date(
                            historicoPaciente[0].data
                          ).toLocaleDateString(
                            "pt-BR"
                          )

                        : "Sem consultas"}

                    </strong>

                    <p>
                      Último atendimento
                    </p>

                  </div>

                  <div className="hist-resumo-card">

                    <span>
                      Consultas
                    </span>

                    <strong> {consultasPaciente.length} </strong>

                    <p>
                      Consultas realizadas
                    </p>

                  </div>

                  <div className="hist-resumo-card">

                    <span>
                      Exames
                    </span>

                    <strong>
                      {
                        exames.length
                      }
                    </strong>

                    <p>
                      Exames solicitados
                    </p>

                  </div>

                </div>

                <div className="hist-historico">

                  <div className="hist-historico-topo">

                    <h3>
                      Histórico recente
                    </h3>

                  </div>

                  {historicoPaciente.length > 0 ? (

                    historicoPaciente.map(
                      (item) => (

                        <div
                          key={item.id}
                          className="hist-historico-item"
                        >

                          <span>

                            {new Date(item.data)
                              .toLocaleDateString(
                                "pt-BR"
                              )}

                          </span>

                          <strong>
                            {item.especialidade}
                          </strong>

                          <p>
                            {item.status}
                          </p>

                        </div>

                      )
                    )

                  ) : (

                    <div className="hist-vazio">
                      Nenhum histórico encontrado
                    </div>

                  )}

                </div>

              </>

            )}

            {abaAtiva === "consultas" && (

              <div className="hist-historico">

                <div className="hist-historico-topo">

                  <h3>
                    Consultas
                  </h3>

                </div>

                {consultas.length > 0 ? (

                  consultasPaciente.map((consulta) => (

                    <div
                      key={consulta.id}
                      className="hist-historico-item"
                    >

                      <span>
                        {new Date(
                          consulta.dataHora
                        ).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>

                      <strong>
                        {
                          consulta.especialidade
                        }
                      </strong>

                      <p>
                        {
                          consulta.status
                        }
                      </p>

                    </div>

                  ))

                ) : (

                  <div className="hist-vazio">
                    Nenhuma consulta encontrada
                  </div>

                )}

              </div>

            )}

            {abaAtiva === "receitas" && (

              <div className="hist-historico">

                <div className="hist-historico-topo">

                  <h3>
                    Receitas
                  </h3>

                </div>

                {receitas.length > 0 ? (

                  receitasPaciente.map((receita) => (

                    <div
                      key={receita.id}
                      className="hist-historico-item"
                    >

                      <span>
                        {new Date(
                          receita.data
                        ).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>

                      <strong>
                        {
                          receita.medicamento
                        }
                      </strong>

                      <p>
                        {
                          receita.dosagem
                        }
                      </p>

                    </div>

                  ))

                ) : (

                  <div className="hist-vazio">
                    Nenhuma receita encontrada
                  </div>

                )}

              </div>

            )}

            {abaAtiva === "exames" && (

              <div className="hist-historico">

                <div className="hist-historico-topo">

                  <h3>
                    Exames
                  </h3>

                </div>

                {exames.length > 0 ? (

                  examesPaciente.map((exame) => (

                    <div
                      key={exame.id}
                      className="hist-historico-item"
                    >

                      <span>
                        {new Date(
                          exame.data
                        ).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>

                      <strong>
                        {exame.nome}
                      </strong>

                      <p>
                        {exame.status}
                      </p>

                    </div>

                  ))

                ) : (

                  <div className="hist-vazio">
                    Nenhum exame encontrado
                  </div>

                )}

              </div>

            )}

          </div>

        </div>

      </div>

      {modalAberto && (

        <div className="hist-modal-overlay">

          <div className="hist-modal">

            <div className="hist-modal-topo">

              <h2>
                Remover paciente
              </h2>

              <div
                className="hist-fechar"
                onClick={fecharModal}
              >

                <i className="fa-solid fa-xmark"></i>

              </div>

            </div>

            <div className="hist-modal-conteudo">

              Deseja remover o paciente{" "}

              <strong>
                {
                  pacienteSelecionado.nome
                }
              </strong>

              ?

            </div>

            <div className="hist-modal-acoes">

              <div
                className="hist-botao-secundario"
                onClick={fecharModal}
              >
                Cancelar
              </div>

              <div
                className="hist-botao-primario"
                onClick={
                  excluirPaciente
                }
              >
                Confirmar
              </div>

            </div>

          </div>

        </div>
      )}

    </div>

  );

}