import { fetchStudios, criarAula } from "../../service/sessionService.js";
import { criarModalConfirmacaoCriaçãoHTML } from "./confirmModal.js";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export function criarModalCadastroAulaHTML() {
  // Retorna o HTML do modal
  return `
    <div class="modal fade" id="modalCadastroAula" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <form class="modal-content" id="formCadastroAula">
          <div class="modal-header">
            <h5 class="modal-title">Adicionar Aula</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="studioSelect" class="form-label">Studio</label>
              <select class="form-control" id="studioSelect" required></select>
            </div>
            <div class="mb-3">
              <label for="dataAula" class="form-label">Data</label>
              <input type="date" class="form-control" id="dataAula" required>
            </div>
            <div class="mb-3">
              <label for="horarioInput" class="form-label">Horário</label>
              <input type="time" class="form-control" id="horarioInput" required>
            </div>
            <div class="mb-3">
              <label for="tipoAula" class="form-label">Tipo</label>
              <input type="text" class="form-control" id="tipoAula" value="aula_flexivel" required>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-success">Salvar</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function configurarModalCadastroAula() {
  setTimeout(async () => {
    // Preenche studios
    const studios = await fetchStudios();
    const selectStudio = document.getElementById("studioSelect");
    selectStudio.innerHTML = studios
      .map((studio) => `<option value="${studio.name}">${studio.name}</option>`)
      .join("");

    document.getElementById("formCadastroAula").onsubmit = async function (e) {
      e.preventDefault();
      const usuario = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
      const body = {
        students: [],
        studio: document.getElementById("studioSelect").value,
        instructor: usuario.name,
        day: document.getElementById("dataAula").value,
        hours: document.getElementById("horarioInput").value,
        status: "aberta",
        presences: [],
        type: document.getElementById("tipoAula").value,
        isActive: true,
      };

      try {
        await criarAula(body);

        // Fecha e remove imediatamente o modal de cadastro e o backdrop
        const modalEl = document.getElementById("modalCadastroAula");
        let modalCadastro = bootstrap.Modal.getInstance(modalEl);
        if (!modalCadastro) {
          modalCadastro = new bootstrap.Modal(modalEl);
        }
        modalCadastro.hide();
        modalEl.classList.remove('show');
        modalEl.style.display = 'none';
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        modalEl.remove();

        // Agora sim, mostra o modal de confirmação
        const modalId = criarModalConfirmacaoCriaçãoHTML("Aula criada com sucesso!");
        const modalConfirmEl = document.getElementById(modalId);
        const modalConfirm = new bootstrap.Modal(modalConfirmEl);
        modalConfirm.show();

        // Ao fechar o modal de confirmação, remove ele e atualiza a tabela
        modalConfirmEl.addEventListener('hidden.bs.modal', () => {
          modalConfirmEl.remove();
          window.renderizarTabelaAulas && window.renderizarTabelaAulas();
        }, { once: true });

      } catch (err) {
        alert("Erro ao criar aula!");
      }
    };
  }, 0);
}