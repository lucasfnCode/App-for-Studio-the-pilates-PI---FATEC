// frontend/assets/js/components/modais.js
export function criarModalCadastroAulaHTML() {
  return `
    <div class="modal fade" id="modalCadastroAula" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">Adicionar Aula</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="formCadastroAula">
              <div class="mb-3">
                <label for="campoNome" class="form-label">Nome da Aula</label>
                <input type="text" class="form-control" id="campoNome" required>
              </div>
              <div class="mb-3">
                <label for="campoData" class="form-label">Data</label>
                <input type="date" class="form-control" id="campoData" required>
              </div>
              <div class="mb-3">
                <label for="campoHorario" class="form-label">Horário</label>
                <input type="time" class="form-control" id="campoHorario" required>
              </div>
              <button type="submit" class="btn btn-success">Criar Aula</button>
              <button type="cancel" class="btn btn-danger">Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function criarModalEditarAulaHTML(aula) {
  return `
    <div class="modal fade" id="modalEditarAula" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Aula</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="formEditarAula">
              <div class="mb-3">
                <label for="campoNome" class="form-label">Nome da Aula</label>
                <input type="text" class="form-control" id="campoNome" value="${aula.nome}" required>
              </div>
              <div class="mb-3">
                <label for="campoData" class="form-label">Data</label>
                <input type="date" class="form-control" id="campoData" value="${aula.data}" required>
              </div>
              <div class="mb-3">
                <label for="campoHorario" class="form-label">Horário</label>
                <input type="time" class="form-control" id="campoHorario" value="${aula.horario}" required>
              </div>
              <button type="submit" class="btn btn-success">Salvar Alterações</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function criarModalConfirmacaoHTML(callback) {
  return `
    <div class="modal fade" id="modalConfirmacao" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmação</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Você tem certeza que deseja excluir esta aula?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" id="btnConfirmar">Excluir</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}