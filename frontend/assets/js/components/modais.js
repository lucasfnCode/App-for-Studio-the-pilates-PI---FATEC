export function criarModalListaAlunosHTML(
  alunos = [],
  role = "aluno",
  presences = []
) {
  const alunosRows = alunos
    .map((aluno) => {
      const alunoId = aluno.id || aluno._id || "—";
      const nome = aluno.name || "—";
      const cpf = aluno.cpf || "—";
      const nascimento = aluno.birthDate || "—";
      const isPresent = presences.includes(alunoId);

      if (role === "instrutor") {
        return `
          <tr>
            <td>${nome}</td>
            <td>${cpf}</td>
            <td>${nascimento}</td>
            <td>
              <input type="checkbox" class="form-check-input presence-checkbox" 
                     data-aluno-id="${alunoId}" ${isPresent ? "checked" : ""}>
            </td>
          </tr>
        `;
      }

      return `
        <tr>
          <td>${nome}</td>
          <td>${cpf}</td>
          <td>${nascimento}</td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="removerAluno('${alunoId}')">Remover</button>
          </td>
        </tr>
      `;
    })
    .join("");

  const modalExistente = document.getElementById("modalListaAlunos");
  if (modalExistente) modalExistente.remove();

  const modalHTML = `
    <div class="modal fade" id="modalListaAlunos" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h5 class="modal-title">Alunos da Aula</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table text-center">
              <thead>
                <tr><th>Nome</th><th>CPF</th><th>Nascimento</th><th>Ações</th></tr>
              </thead>
              <tbody>
                ${alunosRows}
              </tbody>
            </table>
          </div>
          <div class="modal-footer d-flex justify-content-end gap-2">
            ${
              role !== "instrutor"
                ? `<button type="button" class="btn btn-outline-success" onclick="adicionarAluno()">Adicionar Aluno</button>`
                : `<button type="button" class="btn btn-outline-primary" onclick="salvarPresencas()">Salvar Presenças</button>`
            }
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
  return "";
}

export function criarModalCadastroAlunoHTML() {
  const modal = document.getElementById("modalCadastroAluno");
  if (modal) modal.remove();

  const modalHTML = `
    <div id="modalCadastroAluno" class="modal fade" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h3 class="modal-title">Adicionar Alunos</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div id="listaAlunosDisponiveis" class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Selecionar</th>
                    <th>ID</th>
                    <th>Data de Nascimento</th>
                  </tr>
                </thead>
                <tbody id="alunosDisponiveisTabela">
                  <tr><td colspan="3">Carregando alunos...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success" onclick="salvarAlunosSelecionados()">Adicionar Selecionados</button>
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
  carregarAlunosDisponiveis();

  return "";
}

window.adicionarAluno = function () {
  const modalAnterior = bootstrap.Modal.getInstance(
    document.getElementById("modalListaAlunos")
  );
  if (modalAnterior) modalAnterior.hide();

  const modalCadastro = new bootstrap.Modal(
    document.getElementById("modalCadastroAluno")
  );
  modalCadastro.show();
};

window.carregarAlunosDisponiveis = async function () {
  try {
    const response = await fetch(
      "http://localhost:8080/users/students/actives",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) throw new Error("Erro ao buscar alunos");

    const alunos = await response.json();

    const tbody = document.getElementById("alunosDisponiveisTabela");
    tbody.innerHTML = alunos
      .map(
        (aluno) => `
      <tr>
        <td><input type="checkbox" class="form-check-input" data-id="${
          aluno.id
        }"></td>
        <td>${aluno.name || aluno.id}</td>
        <td>${aluno.birthDate || "—"}</td>
      </tr>
    `
      )
      .join("");
  } catch (error) {
    console.error("Erro ao carregar alunos disponíveis:", error);
    const tbody = document.getElementById("alunosDisponiveisTabela");
    tbody.innerHTML = `<tr><td colspan="3">Erro ao carregar alunos</td></tr>`;
  }
};

window.salvarAlunosSelecionados = async function () {
  const checkboxes = document.querySelectorAll(
    "#alunosDisponiveisTabela input[type='checkbox']:checked"
  );
  const alunosSelecionados = Array.from(checkboxes).map((cb) => cb.dataset.id);

  for (const studentId of alunosSelecionados) {
    await window.registrarAluno(window.aulaSelecionadaId, studentId);
  }

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastroAluno")
  );
  modal.hide();
};

export function criarModalConfirmacaoHTML() {
  return `
    <div id="modalConfirmacao" class="modal fade" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h5 class="modal-title">Confirmação</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <p id="mensagemConfirmacao">Ação concluída com sucesso.</p>
          </div>
          <div class="modal-footer d-flex justify-content-end">
            <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function criarModalInstrutoresHTML() {
  return `
    <div class="modal fade" id="modalInstrutores" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content p-4 rounded-4">
          <div class="modal-header border-0">
            <h4 class="modal-title">Nossos Instrutores</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body row g-4">
            <div class="col-md-4 text-center">
              <img src="https://placehold.co/600x400?text=Ana" class="img-fluid rounded-3 shadow-sm" alt="Ana Clara">
              <h5 class="mt-3">Ana Clara</h5>
              <p>Especialista em Pilates Solo e Alongamento</p>
            </div>
            <div class="col-md-4 text-center">
              <img src="https://placehold.co/600x400?text=Bruno" class="img-fluid rounded-3 shadow-sm" alt="Bruno Silva">
              <h5 class="mt-3">Bruno Silva</h5>
              <p>Reabilitação e Pilates para Idosos</p>
            </div>
            <div class="col-md-4 text-center">
              <img src="https://placehold.co/600x400?text=Camila" class="img-fluid rounded-3 shadow-sm" alt="Camila Torres">
              <h5 class="mt-3">Camila Torres</h5>
              <p>Pilates com foco em respiração e relaxamento</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function criarModalAssinaturasHTML() {
  return `
    <div class="modal fade" id="modalAssinaturas" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content p-4 rounded-4">
          <div class="modal-header border-0">
            <h4 class="modal-title">Planos de Assinatura</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <div class="list-group">
              <div class="list-group-item py-3">
                <h5>✨ Básico</h5>
                <p>2x por semana, acesso ao app, <strong>R$ 89/mês</strong></p>
              </div>
              <div class="list-group-item py-3">
                <h5>🔥 Intermediário</h5>
                <p>3x por semana + sessões online, <strong>R$ 129/mês</strong></p>
              </div>
              <div class="list-group-item py-3">
                <h5>💎 Premium</h5>
                <p>Aulas diárias + consultoria personalizada, <strong>R$ 199/mês</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function criarModalSobreHTML() {
  return `
    <div class="modal fade" id="modalSobre" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content p-4 rounded-4">
          <div class="modal-header border-0">
            <h4 class="modal-title">Sobre o Pilates</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body row g-4 align-items-center">
            <div class="col-md-6">
              <img src="https://placehold.co/600x400?text=Pilates" class="img-fluid rounded-3 shadow-sm" alt="Pilates Studio">
            </div>
            <div class="col-md-6">
              <p class="fs-5">
                O Pilates é uma prática de exercícios físicos focada no controle muscular, respiração, alongamento e fortalecimento.
                Criado por Joseph Pilates, ele promove equilíbrio entre corpo e mente, melhorando postura, flexibilidade e bem-estar geral.
              </p>
              <p class="fs-5">
                Ideal para todas as idades, o método trabalha a musculatura profunda, favorece a reabilitação física e previne dores crônicas.
                A prática regular ajuda no aumento da consciência corporal, da energia e da saúde mental.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function modalSalvarAlteracaoHTML() {
  return `
    <div class="modal fade" id="modalSalvarAlteracao" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-4 rounded-4">
          <div class="modal-header border-0">
            <h5 class="modal-title">Confirmar Alterações</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <p class="fs-5">Você tem certeza de que deseja salvar as alterações feitas?</p>
          </div>
          <div class="modal-footer d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-outline-primary" onclick="confirmarSalvarAlteracoes()">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function criarModalDetalhesInstrutorHTML(instrutor = {}) {
  return `
    <div class="modal fade" id="modalDetalhesInstrutor" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content p-4 rounded-4">
          <div class="modal-header border-0">
            <h4 class="modal-title">${instrutor.nome}</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body row g-4">
            <div class="col-md-5 text-center">
              <img src="${
                instrutor.foto || "https://placehold.co/300x300"
              }" class="img-fluid rounded-circle shadow-sm" alt="${
    instrutor.nome
  }">
            </div>
            <div class="col-md-7">
              <p class="fs-5">${instrutor.descricao}</p>
              <p><strong>Especialidades:</strong> ${
                instrutor.especialidades?.join(", ") || "Pilates Geral"
              }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function criarModalConfirmarAssinaturaHTML(plano = {}) {
  return `
    <div class="modal fade" id="modalConfirmarAssinatura" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-4 rounded-4">
          <div class="modal-header border-0">
            <h5 class="modal-title">Confirmar Assinatura</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <p class="fs-5">Você está prestes a assinar o plano <strong>${
              plano.nome || "Selecionado"
            }</strong> por <strong>${plano.valor || "R$ XX,XX"}</strong>.</p>
            <p class="text-muted">Deseja continuar?</p>
          </div>
          <div class="modal-footer d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-outline-success" onclick="confirmarPlano('${
              plano.nome
            }')">Assinar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function criarModalAulasInstrutorHTML() {
  return `
    <div class="modal fade" id="modalAulasInstrutor" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content p-4 rounded-4">
          <div class="modal-header border-0">
            <h4 class="modal-title">Aulas do Instrutor</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <p class="fs-5">Lista de aulas, horários ou qualquer conteúdo relacionado ao instrutor selecionado.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function criarModalPerfilInstrutorHTML() {
  return `
    <div class="modal fade" id="modalPerfilInstrutor" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content p-4 rounded-4">
          <div class="modal-header border-0">
            <h4 class="modal-title">Perfil do Instrutor</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <p class="fs-5">Detalhes completos sobre o instrutor, como experiência, certificações, especialidades etc.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function criarModalAgendaRecepcaoHTML() {
  return `
    <div class="modal fade" id="modalAgendaRecepcao" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content p-4 rounded-4">
          <div class="modal-header border-0">
            <h4 class="modal-title">Agenda da Recepção</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <p class="fs-5">Visualização da agenda diária, semanal ou mensal dos atendimentos agendados.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function criarModalCadastroClientesHTML() {
  return `
    <div class="modal fade" id="modalCadastroClientes" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content p-4 rounded-4">
          <div class="modal-header border-0">
            <h4 class="modal-title">Cadastro de Clientes</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <p class="fs-5">Formulário ou painel para cadastro de novos clientes.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function buscarDadosCompletosDosAlunos(listaDeIds) {
  try {
    const response = await fetch("/api/students");
    if (!response.ok) throw new Error("Erro ao buscar alunos");
    const todosAlunos = await response.json();

    // Filtra apenas os que estão na lista da aula
    return todosAlunos.filter((aluno) => listaDeIds.includes(aluno.id));
  } catch (error) {
    console.error("Erro ao buscar dados completos dos alunos:", error);
    return [];
  }
}

document.addEventListener("atualizarListaAlunos", async function () {
  if (!aulaSelecionadaId) return;

  try {
    const response = await fetch(`/api/sessions/${aulaSelecionadaId}`);
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
        <td>
          <button class="btn btn-sm btn-danger" onclick="removerAluno('${alunoId}')">Remover</button>
        </td>
      </tr>
    `
      )
      .join("");

    console.log("Lista de alunos atualizada!");
  } catch (error) {
    console.error("Erro ao atualizar lista de alunos:", error);
  }
});
