import { getOrCreateMainElement } from "../../components/main";
import {
  criarModalCadastroAlunoHTML,
  criarModalListaAlunosHTML,
  criarModalConfirmacaoHTML
} from "../../components/modais";

// Retorna a role do usuário logado (padrão: aluno)
function getUserRole() {
  const user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  return user?.role || "aluno";
}

// Retorna os dados do usuário logado
function getUserLoggedData() {
  return JSON.parse(localStorage.getItem("usuarioLogado")) || {};
}

// Busca todas as aulas do backend
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
let aulaSelecionadaId = null;

// Renderiza a tela de agendamento
export async function renderAgendamentoPage() {
  const main = getOrCreateMainElement();
  main.innerHTML = "";
  main.style.minHeight = "calc(100vh - 200px)";
  main.style.display = "flex";
  main.style.flexDirection = "column";
  main.style.justifyContent = "between";

  const role = getUserRole();
  const user = getUserLoggedData();

  // Atualiza a tabela de aulas
  async function atualizarTabela() {
    // console.log("Usuário logado:", user);
    const aulas = await fetchAulas();
    const tableBody = document.querySelector("tbody.table-group-divider");
    if (!tableBody) return;

    const tableRows = aulas
      .map((aula) => {
        const aulaId = aula.id || aula._id?.$oid || aula._id;
        let acoes = "";
        // console.log("Aula:", aula);
        // console.log("Students na aula:", aula.students);
        // console.log("User ID:", user.id);

        const jaAgendado =
          Array.isArray(aula.students) && aula.students.includes(user.id);
        // console.log("Status da aula:", aula.status);
        // console.log("Já agendado:", jaAgendado);

        if (role === "aluno") {
          if (!jaAgendado && aula.status === "aberta") {
            acoes = `<button class="btn btn-sm btn-success" onclick="agendarAula('${aulaId}')">Agendar</button>`;
          } else if (jaAgendado) {
            acoes = `<button class="btn btn-sm btn-danger" onclick="cancelarAula('${aulaId}')">Cancelar</button>`;
          }
        } else if (role === "recepcionista") {
          acoes = `<button class="btn btn-sm btn-outline-success" onclick="abrirModalAlunos('${aulaId}')">Ver</button>`;
        } else if (role === "instrutor") {
          acoes = `<button class="btn btn-sm btn-secondary" onclick="abrirModalAlunos('${aulaId}')">Visualizar</button>`;
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

  // Estrutura da tela principal
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
    ${criarModalConfirmacaoHTML()}
  `;

  await atualizarTabela();

  // Atualiza a listagem a cada 5s
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(atualizarTabela, 5000);
}

window.agendarAula = async function (id) {
  try {
    const user = getUserLoggedData();
    const response = await fetch(`/api/sessions/register/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: user.id }),
    });

    if (response.ok) {
      mostrarModalConfirmacao("Aula agendada com sucesso!");
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
    const response = await fetch(`/api/sessions/unregister/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: user.id }),
    });

    if (response.ok) {
      mostrarModalConfirmacao("Agendamento cancelado.");
      renderAgendamentoPage();
    } else {
      alert("Erro ao cancelar a aula.");
    }
  } catch (error) {
    console.error("Erro ao cancelar:", error);
  }
};


// Abre modal com alunos na aula
window.abrirModalAlunos = async function (id) {
  try {
    aulaSelecionadaId = id;

    // Fecha modal aberto anteriormente
    const modalEl = document.getElementById("modalListaAlunos");
    const existingInstance = bootstrap.Modal.getInstance(modalEl);
    if (existingInstance) existingInstance.hide();
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

    const response = await fetch(`/api/sessions/${id}`);
    if (!response.ok) throw new Error("Falha ao buscar aula");

    const aula = await response.json();
    const alunos = aula.students || [];

    const tbody = document.querySelector("#modalListaAlunos tbody");
    tbody.innerHTML = alunos
      .map(
        (alunoId) => `
      <tr>
        <td>${alunoId}</td>
        <td>—</td>
        <td>—</td>
        <td><button class="btn btn-sm btn-danger" onclick="removerAluno('${alunoId}')">Remover</button></td>
      </tr>
    `
      )
      .join("");

    const modal = new bootstrap.Modal(modalEl);
    modal.show();

    // Atualiza a lista de alunos a cada 5s com o modal aberto
    if (window.alunoModalInterval) clearInterval(window.alunoModalInterval);
    window.alunoModalInterval = setInterval(async () => {
      const isOpen = document
        .getElementById("modalListaAlunos")
        ?.classList.contains("show");
      if (!isOpen) return;
      await atualizarModalAlunos(aulaSelecionadaId);
    }, 5000);
  } catch (error) {
    console.error("Erro ao abrir modal de alunos:", error);
    alert("Não foi possível carregar os alunos da aula.");
  }
};

window.mostrarModalConfirmacao = function (mensagem) {
  const el = document.getElementById("mensagemConfirmacao");
  if (el) el.textContent = mensagem;

  const modal = new bootstrap.Modal(document.getElementById("modalConfirmacao"));
  modal.show();
};

// Atualiza a lista de alunos no modal
async function atualizarModalAlunos(aulaId) {
  try {
    const response = await fetch(`/api/sessions/${aulaId}`);
    if (!response.ok) throw new Error("Falha ao buscar aula");

    const aula = await response.json();
    const alunos = aula.students || [];

    const modalBody = document.querySelector("#modalListaAlunos tbody");
    if (!modalBody) return;

    modalBody.innerHTML = alunos
      .map(
        (alunoId) => `
      <tr>
        <td>${alunoId}</td>
        <td>—</td>
        <td>—</td>
        <td><button class="btn btn-sm btn-danger" onclick="removerAluno('${alunoId}')">Remover</button></td>
      </tr>
    `
      )
      .join("");
  } catch (error) {
    console.error("Erro ao atualizar modal:", error);
    alert("Não foi possível atualizar os alunos da aula.");
  }
}

// Remove aluno da aula
window.removerAluno = async function (studentId) {
  if (!aulaSelecionadaId) {
    alert("Aula não encontrada.");
    return;
  }

  try {
    const response = await fetch(
      `/api/sessions/unregister/${aulaSelecionadaId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      }
    );

    if (response.ok) {
      await atualizarModalAlunos(aulaSelecionadaId);
    } else {
      const erro = await response.json();
      alert(erro.message || "Erro ao remover o aluno.");
    }
  } catch (error) {
    console.error("Erro ao remover aluno:", error);
    alert("Erro ao remover aluno.");
  }
};

// Fecha o modal de alunos
window.fecharModalAlunos = function () {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalListaAlunos")
  );
  modal.hide();

  if (window.alunoModalInterval) {
    clearInterval(window.alunoModalInterval);
    window.alunoModalInterval = null;
  }
};

// Abre o modal de cadastro de aluno (falta implementar a lógica de cadastro)
window.adicionarAluno = function () {
  const modalCadastro = new bootstrap.Modal(
    document.getElementById("modalCadastroAluno")
  );
  modalCadastro.show();
};

// Simula salvar aluno e atualiza listagem
window.salvarAluno = async function () {
  const modalCadastro = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastroAluno")
  );
  modalCadastro.hide();

  const modalConfirmacao = new bootstrap.Modal(
    document.getElementById("modalConfirmacao")
  );
  modalConfirmacao.show();

  if (aulaSelecionadaId) {
    await atualizarModalAlunos(aulaSelecionadaId);
  }
};

// Fecha o modal de cadastro de aluno
window.cancelarCadastro = function () {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastroAluno")
  );
  modal.hide();
};

// Simula visualização pelo instrutor
window.verAlunosInstrutor = function (id) {
  alert("Instrutor visualizando alunos da aula ID: " + id);
};
