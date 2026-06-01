import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const token = localStorage.getItem("token");

  const perfil = String(
    localStorage.getItem("perfil")
  );

  console.log("PERFIL BRUTO:", perfil);

  const roleMap = {
    "0": "Paciente",
    "1": "Medico",
    "2": "Funcionario",
    "3": "Admin",
  };

  const perfilNome = roleMap[perfil];

  console.log("PERFIL NOME:", perfilNome);

  console.log("ALLOWED:", allowedRoles);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(perfilNome)
  ) {
    console.log("SEM PERMISSÃO");

    return <Navigate to="/" />;
  }

  return children;
}