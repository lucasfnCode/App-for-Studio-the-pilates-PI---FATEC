import { getOrCreateMainElement } from "../../components/main";
import {
  criarModalCadastroAlunoHTML,
  criarModalListaAlunosHTML,
  criarModalConfirmacaoHTML,
  buscarDadosCompletosDosAlunos,
} from "../../components/modais";

// Retorna a role do usuário logado
export function getUserRole() {
  const user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  return user?.role;
}

// Retorna os dados do usuário logado
export function getUserLoggedData() {
  const user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
  return { ...user, id: user.id || user.sub };
}

async function fetchAulas() {
  const user = getUserLoggedData();
  const role = getUserRole();

  // Se for instrutor e não houver nome, tenta buscar pelo id
  if (role === "ROLE_INSTRUCTOR" && !user.name) {
    try {
      const response = await fetch(`http://localhost:8080/users/instructors/${user.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        user.name = userData.name; // ajuste se o campo for diferente
        // Atualiza o localStorage para as próximas requisições
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
        usuarioLogado.name = userData.name;
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
      }
    } catch (e) {
      console.warn("Não foi possível buscar o nome do instrutor:", e);
    }
  }

  try {
    const response = await fetch("http://localhost:8080/sessions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      console.error("Erro ao buscar aulas:", response.statusText);
      return [];
    }

    const text = await response.text();
    if (!text) {
      console.error("Resposta vazia do servidor.");
      return [];
    }

    const data = JSON.parse(text);

    // Filtra as aulas pelo nome do instrutor logado
    if (role === "ROLE_INSTRUCTOR" && user.name) {
      return data.filter(aula => aula.instructor === user.name);
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar aulas:", error);
    return [];
  }
}

window.aulaSelecionadaId = null;
const eventoAtualizarAlunos = new Event("atualizarListaAlunos");

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
        const aulaId = aula.id || aula._id?.$oid || aula._id;
        let acoes = "";
        const jaAgendado =
          Array.isArray(aula.students) &&
          aula.students
            .filter((id) => !!id && id !== "null")
            .map(String)
            .includes(String(user.id));

        if (role === "ROLE_STUDENT") {
          if (!jaAgendado && aula.status === "aberta") {
            acoes = `<button class="btn btn-sm btn-success" onclick="agendarAula('${aulaId}')">Agendar</button>`;
          } else if (jaAgendado) {
            acoes = `<button class="btn btn-sm btn-danger" onclick="cancelarAula('${aulaId}')">Cancelar</button>`;
          }
        } else if (role === "ROLE_RECEPTIONIST") {
          acoes = `<button class="btn btn-sm btn-outline-success" onclick="abrirModalAlunos('${aulaId}')">Ver</button>`;
        } else if (role === "ROLE_INSTRUCTOR") {
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
}

window.registrarAluno = async function (sessionId, studentId) {
  const id = sessionId || aulaSelecionadaId;

  // Garante que só envia ID válido
  if (!id || !studentId || studentId === "null" || studentId.length < 10) {
    alert("ID da aula ou do aluno não foi definido corretamente.");
    return;
  }

  try {
    const response = await fetch(`/api/sessions/register/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ studentId: String(studentId) }),
    });

    if (response.ok) {
      document.dispatchEvent(eventoAtualizarAlunos);
      mostrarModalConfirmacao("Aluno registrado com sucesso!");
    } else {
      const erro = await response.json();
      alert(erro.message || "Erro ao registrar aluno.");
    }
  } catch (error) {
    console.error("Erro ao registrar aluno:", error);
    alert("Erro de conexão ao tentar registrar aluno.");
  }
};

let ultimaListaAlunos = [];

async function verificarAtualizacoes() {
  if (!aulaSelecionadaId) return;

  const response = await fetch(`/api/sessions/${aulaSelecionadaId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) return;

  const aula = await response.json();
  const alunosAtuais = aula.students || [];

  if (JSON.stringify(alunosAtuais) !== JSON.stringify(ultimaListaAlunos)) {
    ultimaListaAlunos = alunosAtuais;
    await atualizarModalAlunos(aulaSelecionadaId);
  }
}

window.agendarAula = async function (id) {
  try {
    const user = getUserLoggedData();
    if (!user.id) {
      alert("Usuário sem ID válido.");
      return;
    }
    const response = await fetch(`/api/sessions/register/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ studentId: String(user.id) }),
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
    if (!user.id) {
      alert("Usuário sem ID válido.");
      return;
    }
    const response = await fetch(`/api/sessions/unregister/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ studentId: String(user.id) }),
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
    window.aulaSelecionadaId = id;
    const role = getUserRole();

    // Fecha modal aberto anteriormente
    const modalEl = document.getElementById("modalListaAlunos");
    const existingInstance = bootstrap.Modal.getInstance(modalEl);
    if (existingInstance) existingInstance.hide();
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

    const response = await fetch(`/api/sessions/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Falha ao buscar aula");

    const aula = await response.json();
    const alunosIds = aula.students || [];
    const alunos = await buscarDadosCompletosDosAlunos(alunosIds);

    const presences = aula.presences || [];

    criarModalListaAlunosHTML(alunos, role, presences);

    const modal = new bootstrap.Modal(
      document.getElementById("modalListaAlunos")
    );
    modal.show();
  } catch (error) {
    console.error("Erro ao abrir modal de alunos:", error);
    alert("Não foi possível carregar os alunos da aula.");
  }
};

window.mostrarModalConfirmacao = function (mensagem) {
  const el = document.getElementById("mensagemConfirmacao");
  if (el) el.textContent = mensagem;

  const modalLista = bootstrap.Modal.getInstance(
    document.getElementById("modalListaAlunos")
  );
  if (modalLista) modalLista.hide();

  const modalConfirmacao = new bootstrap.Modal(
    document.getElementById("modalConfirmacao")
  );
  modalConfirmacao.show();
};

async function atualizarModalAlunos(aulaId) {
  try {
    const response = await fetch(`/api/sessions/${aulaId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Falha ao buscar aula");

    const aula = await response.json();
    const alunosIds = aula.students || [];
    const alunos = await buscarDadosCompletosDosAlunos(alunosIds);

    const presences = aula.presences || [];
    const role = getUserRole();

    const tbody = document.querySelector("#modalListaAlunos tbody");
    if (!tbody) return;

    const checkboxesState = {};
    document.querySelectorAll(".presence-checkbox").forEach((checkbox) => {
      checkboxesState[checkbox.dataset.alunoId] = checkbox.checked;
    });

    tbody.innerHTML = alunos
      .map((alunoId) => {
        const wasChecked = checkboxesState[alunoId];
        const isPresent = presences.includes(alunoId) || wasChecked;

        if (role === "ROLE_INSTRUCTOR") {
          return `
          <tr>
            <td>${alunoId}</td>
            <td>—</td>
            <td>—</td>
            <td>
              <input type="checkbox" class="form-check-input presence-checkbox" 
                     data-aluno-id="${alunoId}" ${isPresent ? "checked" : ""}>
            </td>
          </tr>
        `;
        }

        return `
        <tr>
          <td>${alunoId}</td>
          <td>—</td>
          <td>—</td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="removerAluno('${alunoId}')">Remover</button>
          </td>
        </tr>
      `;
      })
      .join("");
  } catch (error) {
    console.error("Erro ao atualizar lista de alunos:", error);
  }
}

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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

// Fecha o modal de cadastro de aluno
window.cancelarCadastro = function () {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastroAluno")
  );
  modal.hide();
};

window.salvarPresencas = async function () {
  try {
    const checkboxes = document.querySelectorAll(".presence-checkbox");
    const presences = [];

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        presences.push(checkbox.dataset.alunoId);
      }
    });

    if (!aulaSelecionadaId) {
      alert("Erro: Aula não encontrada.");
      return;
    }

    const response = await fetch(
      `/api/sessions/presence/${aulaSelecionadaId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(presences),
      }
    );

    if (response.ok) {
      mostrarModalConfirmacao("Presenças registradas com sucesso!");
    } else {
      const erro = await response.json();
      alert(erro.message || "Erro ao salvar presenças.");
    }
  } catch (error) {
    console.error("Erro ao salvar presenças:", error);
    alert("Erro ao processar presença dos alunos.");
  }
};
