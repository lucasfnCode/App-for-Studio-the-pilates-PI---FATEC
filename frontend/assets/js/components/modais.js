export function criarModalListaAlunosHTML(alunos = []) {
  const alunosRows = alunos.map(aluno => `
    <tr>
      <td>${aluno.nome}</td>
      <td>${aluno.cpf}</td>
      <td>${aluno.dataNascimento}</td>
      <td><button class="btn btn-danger" onclick="removerAluno('${aluno.id}')">Remover</button></td>
    </tr>
  `).join("");

  return `
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
            <button type="button" class="btn btn-outline-success" onclick="adicionarAluno()">Adicionar Aluno</button>
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;
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

export function modalSalvarAlteração() {
}