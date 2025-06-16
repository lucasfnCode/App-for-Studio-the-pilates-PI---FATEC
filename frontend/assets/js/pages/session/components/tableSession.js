import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { criarModalConfirmacaoExclusaoHTML } from "./modaisSessions/confirmModal.js";
import { excluirAula, fetchAulasInstrutor } from "../service/sessionService.js";

export async function renderizarTabelaAulas() {
  const aulas = (await fetchAulasInstrutor()).filter(aula => aula.isActive);
  const tabela = document.getElementById('tabelaAulas').querySelector('tbody');
  if (!tabela) return;

  tabela.innerHTML = aulas.map(aula => `
    <tr>
      <td>${aula.studio || "-"}</td>
      <td>${aula.day || "-"}</td>
      <td>${aula.hours || "-"}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editarAula('${aula.id}')">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-danger btn-sm" onclick="confirmarExclusao('${aula.id}')">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// Função global para excluir aula
window.confirmarExclusao = function(id) {
  const modalId = criarModalConfirmacaoExclusaoHTML("Você tem certeza que deseja excluir esta aula?");
  const modalEl = document.getElementById(modalId);
  const modal = new bootstrap.Modal(modalEl);
  modal.show();

  modalEl.querySelector("#btnConfirmarExclusao")?.addEventListener("click", async () => {
    try {
      await excluirAula(id);
      modal.hide();
      modalEl.remove();
      window.renderizarTabelaAulas && window.renderizarTabelaAulas();
    } catch (err) {
      alert("Erro ao excluir aula!");
    }
  });
};