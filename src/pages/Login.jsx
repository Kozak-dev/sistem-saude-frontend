// ─────────────────────────────────────────────────────────
// LOGIN + CADASTRO LIMPO E CORRIGIDO
// ─────────────────────────────────────────────────────────

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// ─────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────

const UserIcon = () => <i className="fa-solid fa-user" />;
const LockIcon = () => <i className="fa-solid fa-lock" />;
const MailIcon = () => <i className="fa-solid fa-envelope" />;
const CpfIcon = () => <i className="fa-regular fa-id-card" />;
const PhoneIcon = () => <i className="fa-solid fa-phone" />;
const CalendarIcon = () => <i className="fa-regular fa-calendar" />;
const EyeIcon = () => <i className="fa-regular fa-eye" />;
const EyeOffIcon = () => <i className="fa-regular fa-eye-slash" />;

// ─────────────────────────────────────────────────────────
// INPUT
// ─────────────────────────────────────────────────────────

function InputField({
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  togglePassword,
  showPassword,
  error,
}) {
  return (
    <div className="field-wrap">
      <label className="field-label">{label}</label>

      <div className={`field-box ${error ? "field-error" : ""}`}>
        <span className="field-icon">{icon}</span>

        <input
          type={
            togglePassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="field-input"
        />

        {togglePassword && (
          <button
            type="button"
            className="toggle-pw"
            onClick={togglePassword}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {error && <span className="field-error-msg">{error}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// LOGIN FORM
// ─────────────────────────────────────────────────────────

function LoginForm({ onSwitch, onSubmit, loading, error }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      identifier,
      password,
    });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h1 className="form-title">Bem-vindo 👋</h1>
        <p className="form-sub">Entre na sua conta</p>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <InputField
        label="E-mail"
        icon={<MailIcon />}
        placeholder="Digite seu e-mail"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />

      <InputField
        label="Senha"
        icon={<LockIcon />}
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        togglePassword={() => setShowPw(!showPw)}
        showPassword={showPw}
      />

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <p className="switch-text">
        Não tem conta?{" "}
        <button
          type="button"
          className="link-btn"
          onClick={onSwitch}
        >
          Criar conta
        </button>
      </p>
    </form>
  );
}

// ─────────────────────────────────────────────────────────
// REGISTER FORM
// ─────────────────────────────────────────────────────────

function RegisterForm({ onSwitch, onSubmit, loading, error }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  const validate = () => {
    const errs = {};

    if (!form.nome.trim()) {
      errs.nome = "Nome obrigatório";
    }

    if (!form.email.includes("@")) {
      errs.email = "E-mail inválido";
    }

    if (form.cpf.replace(/\D/g, "").length < 11) {
      errs.cpf = "CPF inválido";
    }

    if (!form.dataNascimento) {
      errs.dataNascimento = "Data obrigatória";
    }

    if (form.senha.length < 6) {
      errs.senha = "Mínimo 6 caracteres";
    }

    if (form.senha !== form.confirmarSenha) {
      errs.confirmarSenha = "Senhas não coincidem";
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    onSubmit(form);
  };

  return (
    <form className="auth-form register-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h1 className="form-title">Criar conta</h1>
        <p className="form-sub">Cadastre-se no sistema</p>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="field-grid-2">
        <InputField
          label="Nome"
          icon={<UserIcon />}
          placeholder="Seu nome"
          value={form.nome}
          onChange={set("nome")}
          error={errors.nome}
        />

        <InputField
          label="E-mail"
          icon={<MailIcon />}
          placeholder="email@email.com"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
        />
      </div>

      <div className="field-grid-2">
        <InputField
          label="CPF"
          icon={<CpfIcon />}
          placeholder="000.000.000-00"
          value={form.cpf}
          onChange={set("cpf")}
          error={errors.cpf}
        />

        <InputField
          label="Telefone"
          icon={<PhoneIcon />}
          placeholder="(11) 99999-9999"
          value={form.telefone}
          onChange={set("telefone")}
        />
      </div>

      <InputField
        label="Data de nascimento"
        icon={<CalendarIcon />}
        type="date"
        value={form.dataNascimento}
        onChange={set("dataNascimento")}
        error={errors.dataNascimento}
      />

      <InputField
        label="Senha"
        icon={<LockIcon />}
        placeholder="Digite sua senha"
        value={form.senha}
        onChange={set("senha")}
        togglePassword={() => setShowPw(!showPw)}
        showPassword={showPw}
        error={errors.senha}
      />

      <InputField
        label="Confirmar senha"
        icon={<LockIcon />}
        placeholder="Confirme sua senha"
        value={form.confirmarSenha}
        onChange={set("confirmarSenha")}
        togglePassword={() => setShowPw2(!showPw2)}
        showPassword={showPw2}
        error={errors.confirmarSenha}
      />

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>

      <p className="switch-text">
        Já possui conta?{" "}
        <button
          type="button"
          className="link-btn"
          onClick={onSwitch}
        >
          Fazer login
        </button>
      </p>
    </form>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ───────────────────────────────────────────────────────
  // LOGIN
  // ───────────────────────────────────────────────────────

  const handleLogin = async ({ identifier, password }) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://localhost:7150/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: identifier,
            senha: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || "Login inválido");
      }

      localStorage.setItem("token", data.token);

localStorage.setItem(
  "usuario",
  JSON.stringify(data.usuario)
);

localStorage.setItem(
  "perfil",
  data.usuario.perfil
);

localStorage.setItem(
  "nome",
  data.usuario.nome
);

// =====================================================
// REDIRECIONA POR PERFIL
// =====================================================

switch (data.usuario.perfil) {

  case 3:
  case "Admin":
    navigate("/admin");
    break;

  case 1:
  case "Medico":
    navigate("/medico");
    break;

  case 2:
  case "Funcionario":
    navigate("/funcionario");
    break;

  case 0:
  case "Paciente":
    navigate("/home");
    break;

  default:
    navigate("/");
    break;
}

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ───────────────────────────────────────────────────────
  // CADASTRO
  // ───────────────────────────────────────────────────────

  const handleRegister = async (form) => {
  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      "https://localhost:7150/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          CPF: form.cpf,
          telefone: form.telefone,
          dataNascimento: new Date(
            form.dataNascimento
          ).toISOString(),
          senha: form.senha,
          perfil: 0,
        }),
      }
    );

    // 🔥 PEGA TEXTO PRIMEIRO
    const text = await response.text();

    console.log(text);

    // 🔥 TENTA CONVERTER
    let data = {};

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        "A API não retornou JSON. Verifique o backend."
      );
    }

    if (!response.ok) {
      throw new Error(
        data.mensagem ||
        data.title ||
        "Erro ao cadastrar"
      );
    }

    alert("Cadastro realizado com sucesso!");

    setMode("login");

  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">
      <div className={`login-card ${mode === "register" ? "wide" : ""}`}>

        {/* LEFT */}
        <div className="left-panel">
          <div className="brand">
            <div className="brand-icon">
              <i className="fa-solid fa-heart-pulse" />
            </div>

            <div>
              <div className="brand-name">Saúde+</div>
              <div className="brand-tag">
                Bem cuidar de você
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-panel-auth">

          {mode === "login" ? (
            <LoginForm
              onSwitch={() => {
                setMode("register");
                setError("");
              }}
              onSubmit={handleLogin}
              loading={loading}
              error={error}
            />
          ) : (
            <RegisterForm
              onSwitch={() => {
                setMode("login");
                setError("");
              }}
              onSubmit={handleRegister}
              loading={loading}
              error={error}
            />
          )}

        </div>
      </div>
    </div>
  );
}

