import { getOrCreateMainElement } from "../../components/main";
import {
  criarModalCadastroAlunoHTML,
  criarModalListaAlunosHTML,
} from "../../components/modais";

function getUserRole() {
  const user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  return user?.role || "aluno"; // padrão: aluno
}

function getUserLoggedData() {
  return JSON.parse(localStorage.getItem("usuarioLogado")) || {};
}

// Busca aulas reais usando proxy para o backend
async function fetchAulas() {
  try {
    const response = await fetch("/api/sessions");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar aulas:", error);
    return [];
  }
}

let intervalId = null;

export async function renderAgendamentoPage() {
  const main = getOrCreateMainElement();
  main.innerHTML = "";
  main.style.minHeight = "calc(100vh - 200px)";
  main.style.display = "flex";
  main.style.flexDirection = "column";
  main.style.justifyContent = "between";

  const role = getUserRole();
  const user = getUserLoggedData();

  async function atualizarTabela() {
    const aulas = await fetchAulas();
    const tableBody = document.querySelector("tbody.table-group-divider");
    if (!tableBody) return;

    const tableRows = aulas
      .map((aula) => {
        const aulaId = aula._id?.$oid || aula._id;
        let acoes = "";
        const jaAgendado = aula.aluno === user.name;

        if (role === "aluno") {
          if (aula.status === "aberta" && !jaAgendado) {
            acoes = `<button class="btn btn-success" onclick="agendarAula('${aulaId}')">Agendar</button>`;
          } else if (aula.status === "confirmada" && jaAgendado) {
            acoes = `<button class="btn btn-danger" onclick="cancelarAula('${aulaId}')">Cancelar</button>`;
          }
        } else if (role === "recepcionista") {
          acoes = `<button class="btn btn-outline-success" onclick="abrirModalAlunos('${aulaId}')">Ver</button>`;
        } else if (role === "instrutor") {
          acoes = `<button class="btn btn-secondary" onclick="verAlunosInstrutor('${aulaId}')">Visualizar</button>`;
        }

        return `
        <tr>
          <td>${aula.instructor}</td>
          <td>${aula.day}</td>
          <td>${aula.hours}</td>
          <td>${aula.studio}</td>
          <td>${aula.status}</td>
          <td>${acoes}</td>
        </tr>
      `;
      })
      .join("");

    tableBody.innerHTML = tableRows;
  }

  main.innerHTML = `
    <h2 class="ms-4">Datas</h2>
    <div class="d-flex justify-content-center">
    <div class="table-responsive w-100" style="max-width: 960px;">
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th>Instrutor</th>
          <th>Dia</th>
          <th>Hora</th>
          <th>Estúdio</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody class="table-group-divider"></tbody>
    </table>
    </div>
    </div>
    ${criarModalListaAlunosHTML()}
    ${criarModalCadastroAlunoHTML()}
  `;

  await atualizarTabela();

  // Inicia o polling para atualizar a cada 5 segundos
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(atualizarTabela, 5000);
}

window.agendarAula = async function (id) {
  try {
    const user = getUserLoggedData();
    const response = await fetch(`/api/sessions/${id}/agendar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aluno: user.name }),
    });
    if (response.ok) {
      alert("Agendado com sucesso!");
      renderAgendamentoPage();
    } else {
      const erro = await response.json();
      alert(erro.message || "Erro ao agendar a aula.");
    }
  } catch (error) {
    console.error("Erro ao agendar:", error);
    alert("Erro de conexão ao tentar agendar a aula.");
  }
};

window.cancelarAula = async function (id) {
  try {
    const user = getUserLoggedData();
    const response = await fetch(`/api/sessions/${id}/cancelar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aluno: user.name }),
    });
    if (response.ok) {
      alert("Agendamento cancelado.");
      renderAgendamentoPage();
    } else {
      alert("Erro ao cancelar a aula.");
    }
  } catch (error) {
    console.error("Erro ao cancelar:", error);
  }
};

window.abrirModalAlunos = function (id) {
  const modal = new bootstrap.Modal(
    document.getElementById("modalListaAlunos")
  );
  modal.show();
};

window.fecharModalAlunos = function () {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalListaAlunos")
  );
  modal.hide();
};

window.adicionarAluno = function () {
  const modalCadastro = new bootstrap.Modal(
    document.getElementById("modalCadastroAluno")
  );
  modalCadastro.show();
};

window.salvarAluno = function () {
  const modalCadastro = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastroAluno")
  );
  modalCadastro.hide();

  const modalConfirmacao = new bootstrap.Modal(
    document.getElementById("modalConfirmacao")
  );
  modalConfirmacao.show();
};

window.cancelarCadastro = function () {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastroAluno")
  );
  modal.hide();
};

window.verAlunosInstrutor = function (id) {
  alert("Instrutor visualizando alunos da aula ID: " + id);
};
