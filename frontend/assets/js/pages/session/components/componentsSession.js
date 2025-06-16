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

export function criarModalEditarAulaHTML(aula, studios, alunosPresentes, presences) {
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
                <label for="studioSelectEdit" class="form-label">Studio</label>
                <select class="form-control" id="studioSelectEdit" required>
                  ${studios.map(studio => `<option value="${studio.name}" ${studio.name === aula.studio ? "selected" : ""}>${studio.name}</option>`).join("")}
                </select>
              </div>
              <div class="mb-3">
                <label for="campoData" class="form-label">Data</label>
                <input type="date" class="form-control" id="campoData" value="${aula.day}" required>
              </div>
              <div class="mb-3">
                <label for="campoHorario" class="form-label">Horário</label>
                <input type="time" class="form-control" id="campoHorario" value="${aula.hours}" required>
              </div>
              <div class="mb-3">
                <label for="tipoAulaEdit" class="form-label">Tipo</label>
                <input type="text" class="form-control" id="tipoAulaEdit" value="${aula.type}" required>
              </div>
              <div class="mb-3">
      <label class="form-label">Presenças</label>
      <div id="listaPresencasEdit" class="d-flex flex-wrap gap-2">
        ${alunosPresentes
          .map(
            (aluno) => `
              <span class="badge bg-primary d-flex align-items-center">
                ${aluno.nome}
                <button type="button" class="btn btn-sm btn-close ms-2 remover-presenca-btn" data-aluno-id="${aluno.id}" aria-label="Remover"></button>
              </span>
            `
          )
          .join("")}
        ${
          alunosPresentes.length === 0
            ? '<span class="text-muted">Nenhum aluno presente.</span>'
            : ""
        }
      </div>
    </div>
              <button type="submit" class="btn btn-success">Salvar Alterações</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}