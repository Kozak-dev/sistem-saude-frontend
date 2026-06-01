import { useState, useEffect } from "react";
import "./Configuracoes.css";


// ===================== DATA =====================
const tabs = [
  { id: "perfil",        label: "Perfil",         icon: "👤" },
  { id: "seguranca",     label: "Segurança",       icon: "🔒" },
  { id: "notificacoes",  label: "Notificações",    icon: "🔔" },
  { id: "privacidade",   label: "Privacidade",     icon: "🛡" },
  { id: "plano",         label: "Plano",           icon: "⭐" },
  { id: "aparencia",     label: "Aparência",       icon: "🎨" },
];

// ===================== TOGGLE =====================
const Toggle = ({ checked, onChange }) => (
  <button
    className={`cfg-toggle ${checked ? "on" : ""}`}
    onClick={() => onChange(!checked)}
    type="button"
  >
    <span className="cfg-toggle-thumb" />
  </button>
);

// ===================== SECTION CARD =====================
const SectionCard = ({ title, subtitle, icon, children }) => (
  <div className="cfg-card">
    <div className="cfg-card-header">
      <div className="cfg-card-icon">{icon}</div>
      <div>
        <div className="cfg-card-title">{title}</div>
        {subtitle && <div className="cfg-card-sub">{subtitle}</div>}
      </div>
    </div>
    <div className="cfg-card-body">{children}</div>
  </div>
);

// ===================== FIELD =====================
const Field = ({ label, hint, children }) => (
  <div className="cfg-field">
    <div className="cfg-field-label">{label}</div>
    {hint && <div className="cfg-field-hint">{hint}</div>}
    {children}
  </div>
);

// ===================== INPUT =====================
const Input = ({ value, placeholder, type = "text", disabled }) => (
  <input
    className={`cfg-input ${disabled ? "disabled" : ""}`}
    defaultValue={value}
    placeholder={placeholder}
    type={type}
    disabled={disabled}
    readOnly={disabled}
  />
);

// ===================== TABS CONTENT =====================

/* ---------- PERFIL ---------- */
const TabPerfil = ({ usuario }) => (

  <div className="cfg-tab-content">

    <SectionCard
      icon="👤"
      title="Dados Pessoais"
      subtitle="Mantenha seus dados sempre atualizados"
    >

      {/* Avatar */}
      <div className="cfg-avatar-row">

        <div className="cfg-avatar">
          👤
        </div>

        <div className="cfg-avatar-info">

          <div className="cfg-avatar-name">
            {usuario?.nome || "Usuário"}
          </div>

          <div className="cfg-avatar-role">
            {usuario?.perfil || "Paciente"}
          </div>

          <button className="cfg-btn-outline small">
            📷 Alterar foto
          </button>

        </div>

      </div>

      <div className="cfg-grid-2">

        <Field label="Nome completo">
          <Input
            value={
              usuario?.nome || ""
            }
          />
        </Field>

        <Field label="Data de nascimento">
          <Input
            value={
              usuario?.dataNascimento || ""
            }
            type="text"
          />
        </Field>

        <Field label="CPF">
          <Input
            value={
              usuario?.cpf || ""
            }
            disabled
          />
        </Field>

        <Field label="Sexo">

          <select className="cfg-select">

            <option>
              Masculino
            </option>

            <option>
              Feminino
            </option>

            <option>
              Outro
            </option>

          </select>

        </Field>

        <Field label="E-mail">
          <Input
            value={
              usuario?.email || ""
            }
            type="email"
          />
        </Field>

        <Field label="Telefone">
          <Input
            value={
              usuario?.telefone || ""
            }
            type="tel"
          />
        </Field>

      </div>

    </SectionCard>

    <SectionCard
      icon="📍"
      title="Endereço"
      subtitle="Seu endereço de cadastro"
    >

      <div className="cfg-grid-2">

        <Field label="CEP">
          <Input />
        </Field>

        <Field label="Estado">

          <select className="cfg-select">

            <option>
              São Paulo
            </option>

            <option>
              Rio de Janeiro
            </option>

          </select>

        </Field>

        <Field label="Cidade">
          <Input />
        </Field>

        <Field label="Bairro">
          <Input />
        </Field>

        <Field
          label="Rua"
          hint="Nome da rua sem número"
        >
          <Input />
        </Field>

        <Field label="Número">
          <Input />
        </Field>

      </div>

    </SectionCard>

    <div className="cfg-actions">

      <button className="cfg-btn-ghost">
        Cancelar
      </button>

      <button className="cfg-btn-primary">
        💾 Salvar alterações
      </button>

    </div>

  </div>

);
/* ---------- SEGURANÇA ---------- */
const TabSeguranca = () => {
  const [twoFa, setTwoFa] = useState(true);
  const [biometria, setBiometria] = useState(false);

  return (
    <div className="cfg-tab-content">
      <SectionCard icon="🔑" title="Alterar Senha" subtitle="Use uma senha forte com pelo menos 8 caracteres">
        <div className="cfg-stack">
          <Field label="Senha atual">
            <Input placeholder="••••••••" type="password" />
          </Field>
          <Field label="Nova senha">
            <Input placeholder="••••••••" type="password" />
          </Field>
          <Field label="Confirmar nova senha">
            <Input placeholder="••••••••" type="password" />
          </Field>
        </div>
        <div className="cfg-password-rules">
          {["Mínimo de 8 caracteres","Letra maiúscula","Número ou símbolo"].map((r, i) => (
            <div className="cfg-rule" key={i}><span className="cfg-rule-dot" />  {r}</div>
          ))}
        </div>
        <button className="cfg-btn-primary" style={{ marginTop: 16 }}>🔒 Alterar senha</button>
      </SectionCard>

      <SectionCard icon="📱" title="Autenticação em Dois Fatores" subtitle="Adicione uma camada extra de segurança à sua conta">
        <div className="cfg-toggle-row">
          <div>
            <div className="cfg-toggle-label">Ativar 2FA via SMS</div>
            <div className="cfg-toggle-sub">Receba um código no seu celular ao entrar</div>
          </div>
          <Toggle checked={twoFa} onChange={setTwoFa} />
        </div>
        <div className="cfg-toggle-row">
          <div>
            <div className="cfg-toggle-label">Biometria / Face ID</div>
            <div className="cfg-toggle-sub">Entre com impressão digital ou reconhecimento facial</div>
          </div>
          <Toggle checked={biometria} onChange={setBiometria} />
        </div>
      </SectionCard>

      <SectionCard icon="🖥" title="Sessões Ativas" subtitle="Dispositivos com acesso à sua conta">
        {[
          { icon: "💻", device: "Chrome — Windows 11", local: "São Paulo, SP", time: "Agora", current: true },
          { icon: "📱", device: "Safari — iPhone 14", local: "São Paulo, SP", time: "Há 2 horas", current: false },
        ].map((s, i) => (
          <div className="cfg-session" key={i}>
            <div className="cfg-session-icon">{s.icon}</div>
            <div className="cfg-session-info">
              <div className="cfg-session-device">{s.device} {s.current && <span className="badge-atual">Atual</span>}</div>
              <div className="cfg-session-meta">{s.local} · {s.time}</div>
            </div>
            {!s.current && <button className="cfg-btn-danger-sm">Encerrar</button>}
          </div>
        ))}
      </SectionCard>
    </div>
  );
};

/* ---------- NOTIFICAÇÕES ---------- */
const TabNotificacoes = () => {
  const [prefs, setPrefs] = useState({
    consultaLembrete: true,
    consultaConfirmacao: true,
    exameDisponivel: true,
    exameAgendamento: false,
    receitaVencer: true,
    mensagensNova: true,
    novidades: false,
    email: true,
    sms: false,
    push: true,
  });

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const groups = [
    {
      title: "Consultas",
      icon: "📅",
      items: [
        { key: "consultaLembrete",    label: "Lembrete de consulta",          sub: "1 dia antes da consulta" },
        { key: "consultaConfirmacao", label: "Confirmação de agendamento",     sub: "Quando uma consulta for marcada" },
      ],
    },
    {
      title: "Exames",
      icon: "🧪",
      items: [
        { key: "exameDisponivel",   label: "Resultado disponível",   sub: "Quando seu exame ficar pronto" },
        { key: "exameAgendamento",  label: "Agendamento de exame",   sub: "Confirmação de exames marcados" },
      ],
    },
    {
      title: "Receitas",
      icon: "📋",
      items: [
        { key: "receitaVencer", label: "Receita a vencer", sub: "7 dias antes do vencimento" },
      ],
    },
    {
      title: "Mensagens",
      icon: "💬",
      items: [
        { key: "mensagensNova", label: "Nova mensagem", sub: "De médicos e clínicas" },
      ],
    },
    {
      title: "Novidades",
      icon: "🎉",
      items: [
        { key: "novidades", label: "Comunicados e novidades", sub: "Atualizações da plataforma" },
      ],
    },
  ];

  return (
    <div className="cfg-tab-content">
      {groups.map((g) => (
        <SectionCard key={g.title} icon={g.icon} title={g.title}>
          {g.items.map((item) => (
            <div className="cfg-toggle-row" key={item.key}>
              <div>
                <div className="cfg-toggle-label">{item.label}</div>
                <div className="cfg-toggle-sub">{item.sub}</div>
              </div>
              <Toggle checked={prefs[item.key]} onChange={() => toggle(item.key)} />
            </div>
          ))}
        </SectionCard>
      ))}

      <SectionCard icon="📡" title="Canais de notificação" subtitle="Como você prefere receber os avisos">
        {[
          { key: "email", label: "E-mail", sub: "joao.silva@email.com" },
          { key: "sms",   label: "SMS",    sub: "(11) 99999-1234" },
          { key: "push",  label: "Push no app", sub: "Notificações no celular" },
        ].map((c) => (
          <div className="cfg-toggle-row" key={c.key}>
            <div>
              <div className="cfg-toggle-label">{c.label}</div>
              <div className="cfg-toggle-sub">{c.sub}</div>
            </div>
            <Toggle checked={prefs[c.key]} onChange={() => toggle(c.key)} />
          </div>
        ))}
      </SectionCard>
    </div>
  );
};

/* ---------- PRIVACIDADE ---------- */
const TabPrivacidade = () => {
  const [opts, setOpts] = useState({ compartilhar: true, analytics: false, historico: true });
  const toggle = (k) => setOpts((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="cfg-tab-content">
      <SectionCard icon="🛡" title="Controle de Dados" subtitle="Escolha como seus dados são utilizados">
        <div className="cfg-toggle-row">
          <div>
            <div className="cfg-toggle-label">Compartilhar dados com médicos</div>
            <div className="cfg-toggle-sub">Permite que médicos acessem seu histórico</div>
          </div>
          <Toggle checked={opts.compartilhar} onChange={() => toggle("compartilhar")} />
        </div>
        <div className="cfg-toggle-row">
          <div>
            <div className="cfg-toggle-label">Análise de uso anônima</div>
            <div className="cfg-toggle-sub">Ajuda a melhorar a plataforma</div>
          </div>
          <Toggle checked={opts.analytics} onChange={() => toggle("analytics")} />
        </div>
        <div className="cfg-toggle-row">
          <div>
            <div className="cfg-toggle-label">Salvar histórico de navegação</div>
            <div className="cfg-toggle-sub">Mantém seu histórico de acesso</div>
          </div>
          <Toggle checked={opts.historico} onChange={() => toggle("historico")} />
        </div>
      </SectionCard>

      <SectionCard icon="📦" title="Meus Dados" subtitle="Gerencie os dados armazenados na plataforma">
        <div className="cfg-data-actions">
          <div className="cfg-data-item">
            <div className="cfg-data-icon">⬇️</div>
            <div>
              <div className="cfg-toggle-label">Exportar meus dados</div>
              <div className="cfg-toggle-sub">Baixe uma cópia completa das suas informações</div>
            </div>
            <button className="cfg-btn-outline small">Exportar</button>
          </div>
          <div className="cfg-data-item danger">
            <div className="cfg-data-icon">🗑</div>
            <div>
              <div className="cfg-toggle-label" style={{ color: "#c53030" }}>Excluir minha conta</div>
              <div className="cfg-toggle-sub">Esta ação é permanente e não pode ser desfeita</div>
            </div>
            <button className="cfg-btn-danger small">Excluir</button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

/* ---------- PLANO ---------- */
const TabPlano = () => (
  <div className="cfg-tab-content">
    <SectionCard icon="⭐" title="Seu Plano Atual" subtitle="Gerencie sua assinatura">
      <div className="cfg-plan-box">
        <div className="cfg-plan-badge">✦ Plano Premium</div>
        <div className="cfg-plan-price">R$ 49<span>/mês</span></div>
        <div className="cfg-plan-renova">Renova em 15/06/2025</div>
        <div className="cfg-plan-features">
          {["Consultas ilimitadas","Resultados de exames em tempo real","Receitas digitais","Suporte prioritário 24h","Histórico completo"].map((f, i) => (
            <div className="cfg-plan-feat" key={i}><span className="feat-check">✓</span> {f}</div>
          ))}
        </div>
      </div>
    </SectionCard>

    <SectionCard icon="💳" title="Forma de Pagamento" subtitle="Cartão cadastrado na assinatura">
      <div className="cfg-payment-row">
        <div className="cfg-card-brand">💳</div>
        <div>
          <div className="cfg-toggle-label">Mastercard terminando em 4242</div>
          <div className="cfg-toggle-sub">Vence em 08/2027</div>
        </div>
        <button className="cfg-btn-outline small">Alterar</button>
      </div>
    </SectionCard>

    <SectionCard icon="📄" title="Histórico de Faturas">
      {[
        { data: "01/05/2025", valor: "R$ 49,00", status: "Pago" },
        { data: "01/04/2025", valor: "R$ 49,00", status: "Pago" },
        { data: "01/03/2025", valor: "R$ 49,00", status: "Pago" },
      ].map((f, i) => (
        <div className="cfg-fatura-row" key={i}>
          <span className="cfg-fatura-data">{f.data}</span>
          <span className="cfg-fatura-valor">{f.valor}</span>
          <span className="badge-pago">{f.status}</span>
          <button className="cfg-link-btn">⬇ Baixar</button>
        </div>
      ))}
    </SectionCard>
  </div>
);

/* ---------- APARÊNCIA ---------- */
const TabAparencia = () => {
  const [tema, setTema] = useState("claro");
  const [idioma, setIdioma] = useState("pt-BR");
  const [tamanho, setTamanho] = useState("medio");

  return (
    <div className="cfg-tab-content">
      <SectionCard icon="🎨" title="Tema" subtitle="Escolha a aparência do sistema">
        <div className="cfg-theme-grid">
          {[
            { id: "claro",    label: "Claro",    emoji: "☀️" },
            { id: "escuro",   label: "Escuro",   emoji: "🌙" },
            { id: "sistema",  label: "Sistema",  emoji: "💻" },
          ].map((t) => (
            <button
              key={t.id}
              className={`cfg-theme-card ${tema === t.id ? "selected" : ""}`}
              onClick={() => setTema(t.id)}
            >
              <span className="cfg-theme-emoji">{t.emoji}</span>
              <span className="cfg-theme-label">{t.label}</span>
              {tema === t.id && <span className="cfg-theme-check">✓</span>}
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard icon="🌐" title="Idioma" subtitle="Idioma exibido na plataforma">
        <select className="cfg-select full" value={idioma} onChange={(e) => setIdioma(e.target.value)}>
          <option value="pt-BR">🇧🇷 Português (Brasil)</option>
          <option value="en">🇺🇸 English</option>
          <option value="es">🇪🇸 Español</option>
        </select>
      </SectionCard>

      <SectionCard icon="🔠" title="Tamanho do texto" subtitle="Ajuste o tamanho da fonte">
        <div className="cfg-size-row">
          {[
            { id: "pequeno", label: "Pequeno" },
            { id: "medio",   label: "Médio" },
            { id: "grande",  label: "Grande" },
          ].map((s) => (
            <button
              key={s.id}
              className={`cfg-size-btn ${tamanho === s.id ? "selected" : ""}`}
              onClick={() => setTamanho(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </SectionCard>

      <div className="cfg-actions">
        <button className="cfg-btn-ghost">Redefinir padrões</button>
        <button className="cfg-btn-primary">💾 Salvar preferências</button>
      </div>
    </div>
  );
};

// ===================== MAIN PAGE =====================
export default function ConfiguracoesPage() {

  const [activeTab, setActiveTab] =
    useState("perfil");

  const API =
    "https://localhost:7150/api/usuarios/perfil";

  const [usuario, setUsuario] =
    useState({});

  useEffect(() => {

    async function carregarPerfil() {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await fetch(API, {

            headers: {
              Authorization:
                `Bearer ${token}`
            }

          });

        if (!res.ok) return;

        const dados =
          await res.json();

        setUsuario(dados);

      }
      catch(err) {

        console.log(err);

      }

    }

    carregarPerfil();

  }, []);

  const renderTab = () => {

    switch (activeTab) {

      case "perfil":
        return (<TabPerfil usuario={usuario}/>);

      case "seguranca":
        return <TabSeguranca />;

      case "notificacoes":
        return <TabNotificacoes />;

      case "privacidade":
        return <TabPrivacidade />;

      case "plano":
        return <TabPlano />;

      case "aparencia":
        return <TabAparencia />;

      default:return (<TabPerfil usuario={usuario}/>);                                                                                           
    }

  };

  return (
    <div className="configuracoes-page">
      {/* Left nav */}
      <aside className="cfg-nav">
        <div className="cfg-nav-title">Configurações</div>
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`cfg-nav-item ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            <span className="cfg-nav-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </aside>

      {/* Content */}
      <div className="cfg-content">
        {renderTab()}
      </div>
    </div>
  );
}