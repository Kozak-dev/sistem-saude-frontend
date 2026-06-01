import { useState,useEffect} from "react";
import "./HistoricoMedico.css";



const ITENS_POR_PAGINA = 5;
const TOTAL_PAGINAS = 5;

export default function Historico() {
  const [busca, setBusca] = useState("");
  const [periodo, setPeriodo] = useState("Todos os períodos");
  const [tipo, setTipo] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  carregarHistorico();
}, []);

async function carregarHistorico() {

  try {

    setLoading(true);

    const token =
      localStorage.getItem("token");

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

    const formatado =
      data.map((item) => ({

        data:
          new Date(item.data)
          .toLocaleDateString("pt-BR"),

        paciente:
          item.paciente,

        tipo:
          item.status,

        descricao:
          item.especialidade,

        protocolo:
          `#C${item.id}`
      }));

    setAtendimentos(formatado);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);
  }
}

  const filtrados = atendimentos.filter((a) => {
    const q = busca.toLowerCase();
    return (
      a.paciente.toLowerCase().includes(q) ||
      a.descricao.toLowerCase().includes(q) ||
      a.protocolo.toLowerCase().includes(q)
    );
  });
  
  if (loading) {
  return (
    <div>
      Carregando histórico...
    </div>
  );
}

  return (
    <div className="hist">
      {/* Filtros */}
      <div className="hist-filtros">
        <div className="hist-busca">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            type="text"
            placeholder="Buscar atendimento, paciente ou protocolo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="hist-filtros-right">
          <div className="hist-select-wrap">
            <label>Período</label>
            <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
              <option>Todos os períodos</option>
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
              <option>Últimos 90 dias</option>
            </select>
            <i className="fa-solid fa-chevron-down" />
          </div>

          <div className="hist-select-wrap">
            <label>Tipo</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option>Todos</option>
              <option>Consulta</option>
              <option>Exame</option>
              <option>Retorno</option>
            </select>
            <i className="fa-solid fa-chevron-down" />
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="hist-card">
        <table className="hist-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Paciente</th>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Protocolo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((a, i) => (
              <tr key={i}>
                <td className="hist-td-data">{a.data}</td>
                <td className="hist-td-nome">{a.paciente}</td>
                <td><span className="hist-tipo">{a.tipo}</span></td>
                <td className="hist-td-desc">{a.descricao}</td>
                <td className="hist-td-proto">{a.protocolo}</td>
                <td>
                  <button className="hist-btn-ver">Ver detalhes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="hist-paginacao">
          <button
            className="hist-pag-btn"
            disabled={pagina === 1}
            onClick={() => setPagina((p) => p - 1)}
          >
            Anterior
          </button>

          <div className="hist-pag-nums">
            {Array.from({ length: TOTAL_PAGINAS }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`hist-pag-num ${pagina === n ? "hist-pag-num--active" : ""}`}
                onClick={() => setPagina(n)}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            className="hist-pag-btn"
            disabled={pagina === TOTAL_PAGINAS}
            onClick={() => setPagina((p) => p + 1)}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}