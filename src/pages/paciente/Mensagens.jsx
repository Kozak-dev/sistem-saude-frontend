import { useEffect, useState } from "react";
import "./Mensagens.css";


const avatarColors = {
  teal: { bg: "#e8f5f3", border: "#2a9d8f" },
  purple: { bg: "#ede9fe", border: "#7b5ea7" },
  blue: { bg: "#dbeafe", border: "#3b82f6" },
  green: { bg: "#d1fae5", border: "#52b788" },
  orange: { bg: "#fef3c7", border: "#e9a825" },
};

// ===================== AVATAR =====================
const Avatar = ({ emoji, tipo, size = 44 }) => {
  const color = avatarColors[tipo] || avatarColors.teal;
  return (
    <div
      className="msg-avatar"
      style={{
        width: size,
        height: size,
        background: color.bg,
        border: `2px solid ${color.border}`,
        fontSize: size * 0.45,
      }}
    >
      {emoji}
    </div>
  );
};

// ===================== CONVERSA ITEM =====================
const ConversaItem = ({ conversa, selected, onClick }) => (
  <div
    className={`conv-item ${selected ? "selected" : ""} ${conversa.naoLida ? "nao-lida" : ""}`}
    onClick={onClick}
  >
    <Avatar emoji={conversa.avatar} tipo={conversa.avatarBg} />
    <div className="conv-info">
      <div className="conv-header">
        <span className="conv-nome">{conversa.nome}</span>
        <span className="conv-hora">{conversa.hora}</span>
      </div>
      <div className="conv-preview">{conversa.preview}</div>
    </div>
    {conversa.naoLida && <span className="conv-dot" />}
  </div>
);

// ===================== CHAT AREA =====================
const ChatArea = ({ conversa, onVoltar }) => {
  const [texto, setTexto] = useState("");

  if (!conversa) {
    return (
      <div className="chat-empty">
        <div className="chat-empty-icon">💬</div>
        <div className="chat-empty-title">Suas mensagens</div>
        <div className="chat-empty-sub">Selecione uma conversa para visualizar</div>
      </div>
    );
  }

  return (
    <div className="chat-area">
      {/* Header */}
      <div className="chat-header">
        <button className="chat-voltar" onClick={onVoltar}>←</button>
        <Avatar emoji={conversa.avatar} tipo={conversa.avatarBg} size={40} />
        <div className="chat-header-info">
          <div className="chat-header-nome">{conversa.nome}</div>
          <div className="chat-header-tipo">
            {conversa.tipo === "medico" ? "🩺 Médico(a)" :
             conversa.tipo === "clinica" ? "🏥 Clínica" :
             conversa.tipo === "laboratorio" ? "🔬 Laboratório" : "📋 Sistema"}
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="chat-action-btn" title="Arquivar">📁</button>
          <button className="chat-action-btn" title="Mais opções">⋮</button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        <div className="chat-date-divider">
          <span>Hoje</span>
        </div>
        {conversa.mensagens.map((msg, i) => (
          <div key={i} className={`chat-bubble-wrap ${msg.de === "eu" ? "eu" : "outro"}`}>
            {msg.de !== "eu" && (
              <Avatar emoji={conversa.avatar} tipo={conversa.avatarBg} size={32} />
            )}
            <div className={`chat-bubble ${msg.de === "eu" ? "eu" : "outro"}`}>
              <span>{msg.texto}</span>
              <span className="bubble-hora">{msg.hora}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <button className="chat-attach">📎</button>
        <input
          className="chat-input"
          placeholder="Digite sua mensagem..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setTexto("")}
        />
        <button
          className={`chat-send ${texto.trim() ? "active" : ""}`}
          onClick={() => setTexto("")}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

// ===================== MAIN PAGE =====================
export default function MensagensPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [conversas, setConversas] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todas");
  useEffect(() => { carregarConversas();}, []);

  async function carregarConversas() {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

  const response = await fetch(
    "https://localhost:7150/api/mensagens/conversas",
    {
      headers: {
        Authorization: `Bearer ${token}`
        
      }
      
    }
  );

  console.log("STATUS:", response.status);

  const texto = await response.text();

  console.log("RESPOSTA:", texto);
}




async function carregarMensagens(id) {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `https://localhost:7150/api/mensagens/conversa/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  setMensagens(data);
  setSelectedId(id);
}

  const conversaAtiva = conversas.find((c) => c.id === selectedId) || null;
  const naoLidas = conversas.filter((c) => c.naoLida).length;

  const filtradas = conversas.filter((c) => {
    const matchBusca = c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.preview.toLowerCase().includes(busca.toLowerCase());
    const matchFiltro =
      filtro === "todas" ? true :
      filtro === "naoLidas" ? c.naoLida :
      filtro === "medicos" ? c.tipo === "medico" :
      filtro === "sistema" ? (c.tipo === "clinica" || c.tipo === "laboratorio" || c.tipo === "sistema") :
      true;
    return matchBusca && matchFiltro;
  });

  return (
    <div className="mensagens-page">
      {/* ---- LEFT PANEL ---- */}
      <div className={`msg-panel ${selectedId ? "hidden-mobile" : ""}`}>
        {/* Panel header */}
        <div className="msg-panel-header">
          <div className="msg-panel-title">
            Mensagens
            {naoLidas > 0 && <span className="msg-badge">{naoLidas}</span>}
          </div>
          <button className="msg-compose">✏</button>
        </div>

        {/* Search */}
        <div className="msg-search">
          <span className="msg-search-icon">🔍</span>
          <input
            className="msg-search-input"
            placeholder="Buscar conversa..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {/* Filter chips */}
        <div className="msg-filters">
          {[
            { id: "todas",    label: "Todas" },
            { id: "naoLidas", label: "Não lidas" },
            { id: "medicos",  label: "Médicos" },
            { id: "sistema",  label: "Sistema" },
          ].map((f) => (
            <button
              key={f.id}
              className={`msg-chip ${filtro === f.id ? "active" : ""}`}
              onClick={() => setFiltro(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Conversa list */}
        <div className="msg-list">
          {filtradas.length === 0 ? (
            <div className="msg-empty-list">Nenhuma conversa encontrada</div>
          ) : (
            filtradas.map((c) => (
              <ConversaItem
                key={c.id}
                conversa={c}
                selected={selectedId === c.id}
                onClick={() => carregarMensagens(c.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* ---- RIGHT: CHAT ---- */}
      <div className={`msg-chat ${!selectedId ? "hidden-mobile" : ""}`}>
        <ChatArea
          conversa={conversaAtiva}
          onVoltar={() => setSelectedId(null)}
        />
      </div>
    </div>
  );
}