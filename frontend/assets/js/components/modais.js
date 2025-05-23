export function criarModalListaAlunosHTML() {
  return `
    <div id="modalListaAlunos" style="display: none;">
      <div class="modal-content">
        <h3>Alunos da Aula</h3>
        <table class="table">
          <thead><tr><th>Nome</th><th>CPF</th><th>Nascimento</th><th>Ações</th></tr></thead>
          <tbody>
            <tr><td>Ana</td><td>000.000.000-01</td><td>11/09/2001</td><td><button class="btn btn-danger">Remover</button></td></tr>
            <tr><td>Beatriz</td><td>000.000.000-02</td><td>21/11/2000</td><td><button class="btn btn-danger">Remover</button></td></tr>
          </tbody>
        </table>
        <button class="btn btn-secondary" onclick="adicionarAluno()">Adicionar Aluno</button>
        <button class="btn" onclick="fecharModalAlunos()">Fechar</button>
      </div>
    </div>
  `;
}

export function criarModalCadastroAlunoHTML() {
  return `
    <div id="modalCadastroAluno" style="display: none;">
      <div class="modal-content">
        <h3>Cadastro de Aluno</h3>
        <label>Nome: <input type="text"></label><br>
        <label>CPF: <input type="text"></label><br>
        <label>Data de Nascimento: <input type="date"></label><br>
        <button class="btn btn-outline-success" onclick="salvarAluno()">Salvar</button>
        <button class="btn btn-danger" onclick="cancelarCadastro()">Cancelar</button>
      </div>
    </div>
  `;
}
