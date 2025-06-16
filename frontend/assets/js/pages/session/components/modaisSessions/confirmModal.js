export function criarModalConfirmacaoExclusaoHTML(mensagem = "Você tem certeza que deseja excluir esta aula?") {
  // Remove modal antigo se existir
  const existente = document.getElementById("modalConfirmacaoExclusao");
  if (existente) existente.remove();

  const modalHTML = `
    <div id="modalConfirmacaoExclusao" class="modal fade" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h5 class="modal-title">Confirmação</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <p>${mensagem}</p>
          </div>
          <div class="modal-footer d-flex justify-content-end">
            <button type="button" class="btn btn-danger" id="btnConfirmarExclusao">Excluir</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  return "modalConfirmacaoExclusao";
}

export function criarModalConfirmacaoCriaçãoHTML(mensagem = "Ação concluída com sucesso.") {
  // Remove modal antigo se existir
  const existente = document.getElementById("modalConfirmacao");
  if (existente) existente.remove();

  const modalHTML = `
    <div id="modalConfirmacaoCriacao" class="modal fade" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h5 class="modal-title">Confirmação</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body">
            <p>${mensagem}</p>
          </div>
          <div class="modal-footer d-flex justify-content-end">
            <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
}