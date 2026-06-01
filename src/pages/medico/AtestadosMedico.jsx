import React, {useState,useEffect} from "react";
import "./AtestadosMedico.css";

export default function NomeDaTela() {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState("");
  const [dias, setDias] = useState("5");
  const [cpf, setCpf] = useState("");
  const [cid, setCid] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [busca, setBusca] = useState("");
  const [mostrarPacientes, setMostrarPacientes] = useState(false);
  const [assinado, setAssinado] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [atestadoEmitido, setAtestadoEmitido] = useState(false);
  const pacientesFiltrados =
  pacientes.filter((p) =>

    p.nome
      ?.toLowerCase()
      .includes(
        busca.toLowerCase()
      )

  );

  const emitirAtestado = async () => {

  if (

    paciente.trim() === "" ||
    cpf.trim() === "" ||
    dataInicio.trim() === ""

  ) {

    return;

  }

  const token =
    localStorage.getItem("token");

  try {

    const response = await fetch(
      "https://localhost:7150/api/atestados",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`
        },

        body: JSON.stringify({

          paciente,
          cpf,
          cid,
          dias,

          dataInicio,

          observacoes,

          status:
            "Pendente"

        })
      }
    );

    if (!response.ok) {

      throw new Error(
        "Erro ao emitir atestado"
      );

    }

    setAtestadoEmitido(true);

    setModalAberto(true);

  } catch (error) {

    console.log(error);

  }

};
  useEffect(() => {

  carregarPacientes();

}, []);

async function carregarPacientes() {

  const token =
    localStorage.getItem("token");

  try {

    const response = await fetch(
      "https://localhost:7150/api/usuarios",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {

      throw new Error(
        "Erro ao carregar pacientes"
      );

    }

    const data =
      await response.json();

    const somentePacientes =
      data.filter(
        (usuario) =>
          usuario.perfil === 0
      );

    setPacientes(somentePacientes);

  } catch (error) {

    console.log(error);

  }

}
  const cancelarFormulario = () => {
    setPaciente("");
    setDias("5");
    setCpf("");
    setCid("");
    setDataInicio("");
    setObservacoes("");
    setBusca("");
    setAssinado(false);
    setAtestadoEmitido(false);
  };

  return (
    <div className="atestado-page">
      <div className="atestado-header">
        <div>
          <h1 className="atestado-title">Dados do Atestado</h1>
          <p className="atestado-subtitle">
            Preencha as informações do paciente
          </p>
        </div>

        <div
          className={`atestado-status ${
            atestadoEmitido
              ? "atestado-status-success"
              : "atestado-status-warning"
          }`}
        >
          <i
            className={`fa-solid ${
              atestadoEmitido ? "fa-circle-check" : "fa-clock"
            }`}
          ></i>

          {atestadoEmitido ? "Atestado Emitido" : "Pendente"}
        </div>
      </div>

      <div className="atestado-card">
        <div className="atestado-grid">
          <div className="atestado-field">
            <label className="atestado-label">Paciente</label>

            <div className="atestado-select-wrapper">
              <div
                className="atestado-select"
                onClick={() =>
                  setMostrarPacientes(!mostrarPacientes)
                }
              >
                <span>
                  {paciente || "Buscar paciente..."}
                </span>

                <i className="fa-solid fa-chevron-down"></i>
              </div>

              {mostrarPacientes && (
                <div className="atestado-dropdown">
                  <div className="atestado-search-box">
                    <i className="fa-solid fa-magnifying-glass"></i>

                    <input
                      type="text"
                      placeholder="Buscar paciente"
                      value={busca}
                      onChange={(e) =>
                        setBusca(e.target.value)
                      }
                      className="atestado-input"
                    />
                  </div>

                  <div className="atestado-dropdown-list">
                    {pacientesFiltrados.map((item, index) => (
                      <div
                        key={index}
                        className="atestado-dropdown-item"
                        onClick={() => {
                          setPaciente(item);
                          setMostrarPacientes(false);
                        }}
                      >
                        {item.nome}
                      </div>
                    ))}

                    {pacientesFiltrados.length === 0 && (
                      <div className="atestado-empty">
                        Nenhum paciente encontrado
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="atestado-field">
            <label className="atestado-label">
              Dias de afastamento
            </label>

            <input
              type="number"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              className="atestado-input"
            />
          </div>

          <div className="atestado-field">
            <label className="atestado-label">CPF</label>

            <input
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="atestado-input"
            />
          </div>

          <div className="atestado-field">
            <label className="atestado-label">
              Data de início
            </label>

            <input
              type="date"
              value={dataInicio}
              onChange={(e) =>
                setDataInicio(e.target.value)
              }
              className="atestado-input"
            />
          </div>

          <div className="atestado-field">
            <label className="atestado-label">
              CID (opcional)
            </label>

            <input
              type="text"
              placeholder="Digite o CID"
              value={cid}
              onChange={(e) => setCid(e.target.value)}
              className="atestado-input"
            />
          </div>

          <div className="atestado-field atestado-field-full">
            <label className="atestado-label">
              Observações
            </label>

            <textarea
              placeholder="Informações adicionais (opcional)"
              value={observacoes}
              onChange={(e) =>
                setObservacoes(e.target.value)
              }
              className="atestado-textarea"
            ></textarea>
          </div>
        </div>

        <div className="atestado-signature-area">
          <label className="atestado-label">
            Assinatura médica
          </label>

          <div
            className={`atestado-signature-box ${
              assinado
                ? "atestado-signature-active"
                : ""
            }`}
            onClick={() => setAssinado(!assinado)}
          >
            <i className="fa-solid fa-signature"></i>

            <span>
              {assinado
                ? "Assinatura realizada"
                : "Assine aqui"}
            </span>
          </div>
        </div>

        <div className="atestado-actions">
          <button
            className="atestado-btn atestado-btn-secondary"
            onClick={cancelarFormulario}
          >
            Cancelar
          </button>

          <button
            className="atestado-btn atestado-btn-primary"
            onClick={emitirAtestado}
          >
            Emitir Atestado
          </button>
        </div>
      </div>

      {modalAberto && (
        <div className="atestado-modal-overlay">
          <div className="atestado-modal">
            <div className="atestado-modal-icon">
              <i className="fa-solid fa-circle-check"></i>
            </div>

            <h2>Atestado emitido!</h2>

            <p>
              O atestado médico foi emitido com sucesso.
            </p>

            <div className="atestado-modal-info">
              <div className="atestado-modal-item">
                <span>Paciente</span>
                <strong>{paciente}</strong>
              </div>

              <div className="atestado-modal-item">
                <span>Dias</span>
                <strong>{dias} dias</strong>
              </div>
            </div>

            <button
              className="atestado-btn atestado-btn-primary atestado-modal-btn"
              onClick={() => setModalAberto(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}