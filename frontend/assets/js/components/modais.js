export function criarModalListaAlunosHTML(
  alunos = [],
  role = "aluno",
  presences = []
) {
  const alunosRows = alunos
    .map((alunoId) => {
      const isPresent = presences.includes(alunoId);

      if (role === "instrutor") {
        return `
        <tr>
          <td>${alunoId}</td>
          <td>—</td>
          <td>—</td>
          <td>
            <input type="checkbox" class="form-check-input presence-checkbox" data-aluno-id="${alunoId}" ${
          isPresent ? "checked" : ""
        }>
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
                <tr><th>Nome (ID)</th><th>CPF</th><th>Nascimento</th><th>Ações</th></tr>
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
                : ""
            }
            ${
              role === "instrutor"
                ? `<button type="button" class="btn btn-outline-primary" onclick="salvarPresencas()">Salvar Presenças</button>`
                : ""
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
  return `
    <div id="modalCadastroAluno" class="modal fade" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h3 class="modal-title">Cadastro de Aluno</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="d-flex flex-column gap-3">
              <div class="mb-3">
                <label class="form-label" for="nomeAluno">Nome:</label>
                <input type="text" class="form-control" id="nomeAluno">
              </div>
              <div class="mb-3">
                <label class="form-label" for="cpfAluno">CPF:</label>
                <input type="text" class="form-control" id="cpfAluno">
              </div>
              <div class="mb-3">
                <label class="form-label" for="dataNascimento">Data de Nascimento:</label>
                <input type="date" class="form-control" id="dataNascimento">
              </div>
            </form>
          </div>
          <div class="modal-footer d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success" onclick="salvarAluno()">Salvar</button>
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

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
