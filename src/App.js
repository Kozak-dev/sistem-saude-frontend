import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// LOGIN
import Login from "./pages/Login";

// PACIENTE
import Home from "./pages/paciente/Home";
import Consultas from "./pages/paciente/Consultas";
import Exames from "./pages/paciente/Exames";
import Receitas from "./pages/paciente/Receitas";
import Mensagens from "./pages/paciente/Mensagens";
import Configuracoes from "./pages/paciente/Configuracoes";

// ADMIN
import AdminPage from "./pages/admin/AdminPage";

// MÉDICO
import HomeMedico from "./pages/medico/HomeMedico";
import CalendarioMedico from "./pages/medico/CalendarioMedico";
import HistoricoMedico from "./pages/medico/HistoricoMedico";
import PacientesMedico from "./pages/medico/PacientesMedico";
import AtestadosMedico from "./pages/medico/AtestadosMedico";
import ReceitasMedico from "./pages/medico/ReceitasMedico";
import ExamesMedico from "./pages/medico/ExamesMedico";
import MensagensMedico from "./pages/medico/MensagensMedico";
import ConfiguracoesMedico from "./pages/medico/ConfiguracoesMedico";

// FUNCIONÁRIO
import FuncionarioPage from "./pages/funcionario/FuncionarioPage";

// LAYOUTS
import LayoutPaciente from "./components/paciente/Layout";
import LayoutMedico from "./components/medico/Layout";

// PROTEÇÃO
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
  script.async = true;

  script.onload = () => {
    new window.VLibras.Widget("https://vlibras.gov.br/app");
  };

  document.body.appendChild(script);
}, []);
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* PACIENTE */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                "Paciente",
                "PACIENTE",
                "paciente",
                "0",
                0
              ]}
            >
              <LayoutPaciente />
            </ProtectedRoute>
          }
        >

          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/consultas"
            element={<Consultas />}
          />

          <Route
            path="/exames"
            element={<Exames />}
          />

          <Route
            path="/receitas"
            element={<Receitas />}
          />

          <Route
            path="/mensagens"
            element={<Mensagens />}
          />

          <Route
            path="/configuracoes"
            element={<Configuracoes />}
          />

        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "ADMIN",
                "admin",
                "1",
                1
              ]}
            >
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* MÉDICO */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                "Medico",
                "MEDICO",
                "medico",
                "2",
                2
              ]}
            >
              <LayoutMedico />
            </ProtectedRoute>
          }
        >

          <Route
            path="/medico"
            element={<HomeMedico />}
          />

          <Route
            path="/medico/calendario"
            element={<CalendarioMedico />}
          />

          <Route
            path="/medico/historico"
            element={<HistoricoMedico />}
          />

          <Route
            path="/medico/pacientes"
            element={<PacientesMedico />}
          />

          <Route
            path="/medico/atestados"
            element={<AtestadosMedico />}
          />

          <Route
            path="/medico/receitas"
            element={<ReceitasMedico />}
          />

          <Route
            path="/medico/exames"
            element={<ExamesMedico />}
          />

          <Route
            path="/medico/mensagens"
            element={<MensagensMedico />}
          />

          <Route
            path="/medico/configuracoes"
            element={<ConfiguracoesMedico />}
          />

        </Route>

        {/* FUNCIONÁRIO */}
        <Route
          path="/funcionario"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Funcionario",
                "FUNCIONARIO",
                "funcionario",
                "3",
                3
              ]}
            >
              <FuncionarioPage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;