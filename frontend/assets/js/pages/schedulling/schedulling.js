import { getOrCreateMainElement } from "../../components/main";
import {
  criarModalCadastroAlunoHTML,
  criarModalListaAlunosHTML,
} from "../../components/modais";

// Mock de função para obter a role do usuário logado
function getUserRole() {
  const user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  return user?.role || "aluno"; // padrão: aluno
}
// Função corrigida para obter o objeto completo do usuário logado
function getUserLoggedData() {
  return JSON.parse(localStorage.getItem("usuarioLogado")) || {};
}


// Mock de função para obter aulas do backend
async function fetchAulas() {
  return [
    {
      _id: { $oid: "67f08325d5ffb65cce5d56f0" },
      aluno: "",
      studio: "Studio Central",
      instrutor: "João Silva",
      data: "2025-04-10",
      horario: "10:00",
      status: "confirmada",
      tipo: "aula_fixa",
    },
    {
      _id: { $oid: "67f08325d5ffb65cce5d56f1" },
      aluno: "",
      studio: "Studio Central",
      instrutor: "João Silva",
      data: "2025-04-12",
      horario: "14:00",
      status: "aberta",
      tipo: "aula_fixa",
    },
    {
      _id: { $oid: "67f08325d5ffb65cce5d56f2" },
      aluno: "",
      studio: "Studio Central",
      instrutor: "João Silva",
      data: "2025-04-12",
      horario: "18:00",
      status: "aberta",
      tipo: "aula_fixa",
    },
  ];
}

export async function renderAgendamentoPage() {
  const main = getOrCreateMainElement();
  main.innerHTML = "";
  main.style.minHeight = "calc(100vh - 200px)";
  main.style.display = "flex";
  main.style.flexDirection = "column";
  main.style.justifyContent = "between";

  const role = getUserRole();
  const user = getUserLoggedData();
  const aulas = await fetchAulas();

  const tableRows = aulas
    .map((aula) => {
      let acoes = "";
      if (role === "aluno") {
        if (aula.status === "aberta") {
          acoes = `<button class="btn btn-success" onclick="agendarAula('${aula._id.$oid}')">Agendar</button>`;
        } else if (
          aula.status === "confirmada"
        ) {
          acoes = `<button class="btn btn-danger" onclick="cancelarAula('${aula._id.$oid}')">Cancelar</button>`;
        }
      } else if (role === "recepcionista") {
        acoes = `<button class="btn btn-outline-success" onclick="abrirModalAlunos('${aula._id.$oid}')">Ver</button>`;
      } else if (role === "instrutor") {
        acoes = `<button class="btn btn-secondary" onclick="verAlunosInstrutor('${aula._id.$oid}')">Visualizar</button>`;
      }

      return `
      <tr>
        <td>${aula.instrutor}</td>
        <td>${aula.data}</td>
        <td>${aula.horario}</td>
        <td>${aula.studio}</td>
        <td>${aula.status}</td>
        <td>${acoes}</td>
      </tr>
    `;
    })
    .join("");

  main.innerHTML = `
    <h2 class="ms-4">Datas</h2>
    <div class="d-flex justify-content-center">
    <div class="table-responsive w-100" style="max-width: 960px;">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th>Instrutor</th>
          <th>Data</th>
          <th>Hora</th>
          <th>Estúdio</th>
          <th>Status</th>
          <th>Situação</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        ${tableRows}
      </tbody>
    </table>
    </div>
    </div>
    ${criarModalListaAlunosHTML()}
    ${criarModalCadastroAlunoHTML()}
  `;
}

window.agendarAula = function (id) {
  alert("Agendando aula ID: " + id);
};

window.cancelarAula = function (id) {
  alert("Cancelando aula ID: " + id);
};

window.abrirModalAlunos = function (id) {
  const modal = new bootstrap.Modal(document.getElementById("modalListaAlunos"));
  modal.show();
};

window.fecharModalAlunos = function () {
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalListaAlunos"));
  modal.hide();
};

window.adicionarAluno = function () {
  const modalCadastro = new bootstrap.Modal(document.getElementById("modalCadastroAluno"));
  modalCadastro.show();
};

window.salvarAluno = function () {
  const modalCadastro = bootstrap.Modal.getInstance(document.getElementById("modalCadastroAluno"));
  modalCadastro.hide();

  const modalConfirmacao = new bootstrap.Modal(document.getElementById("modalConfirmacao"));
  modalConfirmacao.show();
};

window.cancelarCadastro = function () {
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalCadastroAluno"));
  modal.hide();
};

window.verAlunosInstrutor = function (id) {
  alert("Instrutor visualizando alunos da aula ID: " + id);
};
