import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Consultas.css";




// ─────────────────────────────────────────
// BADGE STATUS
// ─────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    agendada:   { label: "Agendada",   cls: "badge--blue" },
    confirmada: { label: "Confirmada", cls: "badge--green" },
    pendente:   { label: "Pendente",   cls: "badge--yellow" },
    cancelada:  { label: "Cancelada",  cls: "badge--red" },
    realizada:  { label: "Realizada",  cls: "badge--gray" },
  };
  const key = (status || "agendada").toLowerCase();
  const { label, cls } = map[key] || map["agendada"];
  return <span className={`badge ${cls}`}>{label}</span>;
}

// ─────────────────────────────────────────
// CARD DE CONSULTA
// ─────────────────────────────────────────
function ConsultaCard({ consulta, onDelete }) {
  const dataObj = new Date(consulta.dataHora);
  const dataFormatada = isNaN(dataObj) ? "—" : dataObj.toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric"
  });
  const horaFormatada = isNaN(dataObj) ? "—" : dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit", minute: "2-digit"
  });

  return (
    <div className="consulta-card">
      {/* Data / Hora */}
      <div className="consulta-card__date-col">
        <div className="consulta-card__date-icon">
          <i className="fa-regular fa-calendar-check" />
        </div>
        <div>
          <p className="consulta-card__date">{dataFormatada}</p>
          <p className="consulta-card__time">
            <i className="fa-regular fa-clock" /> {horaFormatada}
          </p>
        </div>
      </div>

      {/* Médico / Especialidade */}
      <div className="consulta-card__info">
        <p className="consulta-card__name">
          <i className="fa-solid fa-user-doctor" /> {consulta.pacienteNome}
        </p>
        <p className="consulta-card__spec">
          <i className="fa-solid fa-stethoscope" /> {consulta.especialidade}
        </p>
      </div>

      {/* Status */}
      <StatusBadge status={consulta.status || "Agendada"} />

      {/* Ações */}
      <div className="consulta-card__actions">
        <button className="icon-btn icon-btn--danger" title="Excluir" onClick={() => onDelete(consulta.id)}>
          <i className="fa-solid fa-trash" />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// MODAL AGENDAR CONSULTA
// ─────────────────────────────────────────
function ModalAgendar({ onClose, onSalvar, loading }) {
  const [paciente, setPaciente]         = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [data, setData]                 = useState(null);
  const [hora, setHora]                 = useState("");

 function handleSalvar() {
  if (!paciente || !especialidade || !data || !hora) {
    alert("Preencha todos os campos");
    return;
  }

  const [h, m] = hora.split(":");

  const dataHora = new Date(data);

  dataHora.setHours(parseInt(h));
  dataHora.setMinutes(parseInt(m));
  dataHora.setSeconds(0);

  onSalvar({
  especialidade: especialidade,
  dataHora: dataHora.toISOString(),
  medicoId: 2
});
}

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal__header">
          <div className="modal__header-icon">
            <i className="fa-solid fa-calendar-plus" />
          </div>
          <div>
            <h2>Agendar Consulta</h2>
            <p>Preencha os dados abaixo para agendar</p>
          </div>
          <button className="modal__close" onClick={onClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="modal__body">
          <div className="form-group">
            <label>Nome do paciente</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-user input-icon" />
              <input
                placeholder="Digite o nome completo"
                value={paciente}
                onChange={(e) => setPaciente(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Especialidade</label>
            <div className="input-wrapper">
              <i className="fa-solid fa-stethoscope input-icon" />
              <select value={especialidade} onChange={(e) => setEspecialidade(e.target.value)}>
                <option value="">Selecione a especialidade</option>
                <option>Cardiologia</option>
                <option>Dermatologia</option>
                <option>Ortopedia</option>
                <option>Pediatria</option>
                <option>Clínico Geral</option>
                <option>Neurologia</option>
                <option>Oftalmologia</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data</label>
              <div className="input-wrapper">
                <i className="fa-regular fa-calendar input-icon" />
                <DatePicker
                  selected={data}
                  onChange={(date) => setData(date)}
                  placeholderText="Selecione a data"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Horário</label>
              <div className="input-wrapper">
                <i className="fa-regular fa-clock input-icon" />
                <select value={hora} onChange={(e) => setHora(e.target.value)}>
                  <option value="">Selecione</option>
                  {["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"].map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn--primary" onClick={handleSalvar} disabled={loading}>
            {loading ? <><i className="fa-solid fa-spinner fa-spin" /> Salvando...</> : <><i className="fa-solid fa-check" /> Salvar consulta</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// PAGE PRINCIPAL
// ─────────────────────────────────────────
const API = "http://localhost:5003/api/Consultas";

export default function Consultas() {
  const [consultas, setConsultas]     = useState([]);
  const [abrirModal, setAbrirModal]   = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [erro, setErro]               = useState(null);
  const [busca, setBusca]             = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todas");

  useEffect(() => { carregarConsultas(); }, []);

 async function carregarConsultas() {
  setLoadingList(true);
  setErro(null);

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok)
      throw new Error(
        `Erro: ${res.status}`
      );

    const dados = await res.json();

    setConsultas(dados);

  } catch (err) {
    console.log(err);

    setErro(
      "Não foi possível carregar as consultas"
    );
  } finally {
    setLoadingList(false);
  }
}

async function salvarConsulta(novaConsulta) {

  setLoadingSave(true);

  const token = localStorage.getItem("token");

  try {

    const res = await fetch(API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(novaConsulta)
    });

    if (!res.ok) {
      alert(await res.text());
      return;
    }

    setAbrirModal(false);

    carregarConsultas();

  } catch {
    alert("Erro ao conectar com API");
  }

  finally {
    setLoadingSave(false);
  }
}

  async function excluirConsulta(id) {

  if (!id || !window.confirm(
      "Deseja excluir esta consulta?"
  )) return;

  const token = localStorage.getItem("token");

  try {

    const res = await fetch(
      `${API}/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    if (!res.ok) {
      alert(await res.text());
      return;
    }

    carregarConsultas();

  } catch {
    alert(
      "Erro ao excluir consulta"
    );
  }
}

  // Filtros locais
  const consultasFiltradas = consultas.filter((c) => {
    const matchBusca = busca
      ? c.pacienteNome?.toLowerCase().includes(busca.toLowerCase()) ||
        c.especialidade?.toLowerCase().includes(busca.toLowerCase())
      : true;
    const matchStatus = filtroStatus === "Todas"
      ? true
      : (c.status || "Agendada").toLowerCase() === filtroStatus.toLowerCase();
    return matchBusca && matchStatus;
  });

  const proximas  = consultas.filter((c) => new Date(c.dataHora) >= new Date()).length;
  const realizadas = consultas.filter((c) => (c.status || "").toLowerCase() === "realizada").length;
  const canceladas = consultas.filter((c) => (c.status || "").toLowerCase() === "cancelada").length;

  return (
  <>
    <div className="page-body">

      {/* STATS */}
      <div className="stats-row">
        <div className="stat-card stat-card--teal">
          <div className="stat-card__icon">
            <i className="fa-solid fa-calendar-days" />
          </div>
          <div>
            <p>Próximas consultas</p>
            <h2>{proximas}</h2>
          </div>
        </div>

        <div className="stat-card stat-card--green">
          <div className="stat-card__icon">
            <i className="fa-solid fa-circle-check" />
          </div>
          <div>
            <p>Realizadas</p>
            <h2>{realizadas}</h2>
          </div>
        </div>

        <div className="stat-card stat-card--red">
          <div className="stat-card__icon">
            <i className="fa-solid fa-circle-xmark" />
          </div>
          <div>
            <p>Canceladas</p>
            <h2>{canceladas}</h2>
          </div>
        </div>

        <div className="stat-card stat-card--purple">
          <div className="stat-card__icon">
            <i className="fa-solid fa-list" />
          </div>
          <div>
            <p>Total</p>
            <h2>{consultas.length}</h2>
          </div>
        </div>
      </div>

      {/* FILTROS */}
      <div className="card filtros-bar">
        <div className="filtros-bar__inputs">
          <div className="input-wrapper">
            <i className="fa-solid fa-magnifying-glass input-icon" />
            <input
              placeholder="Buscar..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option>Todas</option>
            <option>Agendada</option>
            <option>Confirmada</option>
            <option>Pendente</option>
            <option>Realizada</option>
            <option>Cancelada</option>
          </select>

          <button
            className="btn btn--ghost"
            onClick={() => {
              setBusca("");
              setFiltroStatus("Todas");
            }}
          >
            Limpar
          </button>
        </div>

        <button className="btn btn--primary" onClick={() => setAbrirModal(true)}>
          + Agendar consulta
        </button>
      </div>

      {/* LISTA */}
      <div className="card lista-card">
        <div className="lista-card__header">
          <h2>Lista de Consultas</h2>
          <span className="lista-card__count">
            {consultasFiltradas.length} resultados
          </span>
        </div>

        {loadingList ? (
          <div className="state-msg">
            <i className="fa-solid fa-spinner fa-spin" />
            <p>Carregando...</p>
          </div>
        ) : erro ? (
          <div className="state-msg state-msg--error">
            <p>{erro}</p>
            <button className="btn btn--outline" onClick={carregarConsultas}>
              Tentar novamente
            </button>
          </div>
        ) : consultasFiltradas.length === 0 ? (
          <div className="state-msg">
            <p>Nenhuma consulta encontrada</p>
            <button className="btn btn--primary" onClick={() => setAbrirModal(true)}>
              Agendar
            </button>
          </div>
        ) : (
          <div className="lista-consultas">
            {consultasFiltradas.map((c, i) => (
              <ConsultaCard
                key={c.id ?? `${c.dataHora}-${i}`} // 🔥 CORREÇÃO IMPORTANTE
                consulta={c}
                onDelete={excluirConsulta}
              />
            ))}
          </div>
        )}
      </div>
    </div>

    {/* MODAL */}
    {abrirModal && (
      <ModalAgendar
        onClose={() => setAbrirModal(false)}
        onSalvar={salvarConsulta}
        loading={loadingSave}
      />
    )}
  </>
);
}