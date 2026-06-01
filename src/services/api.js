export async function getConsultas() {
  const response = await fetch("https://localhost:7150/api/Consultas");

  return response.json();
}

export async function criarConsulta(consulta) {
  const response = await fetch("https://localhost:7150/api/Consultas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(consulta)
  });

  return response.json();
}