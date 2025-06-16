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