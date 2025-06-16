import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { criarModalConfirmacaoExclusaoHTML } from "./modaisSessions/confirmModal.js";
import {
  atualizarAula,
  excluirAula,
  fetchAlunoById,
  fetchAlunosDaAula,
  fetchAulasInstrutor,
  fetchStudios,
  removerPresencaAula,
} from "../service/sessionService.js";
import { criarModalEditarAulaHTML } from "./modaisSessions/editModal.js";
import { formatarDataExibicao } from "../../../service/formatData.js";

export async function renderizarTabelaAulas() {
  const aulas = (await fetchAulasInstrutor()).filter((aula) => aula.isActive);
  const tabela = document.getElementById("tabelaAulas").querySelector("tbody");
  if (!tabela) return;

  tabela.innerHTML = aulas
    .map(
      (aula) => `
    <tr>
      <td>${aula.studio || "-"}</td>
      <td>${formatarDataExibicao(aula.day) || "-"}</td>
      <td>${aula.hours || "-"}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editarAula('${
          aula.id
        }')">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-danger btn-sm" onclick="confirmarExclusao('${
          aula.id
        }')">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `
    )
    .join("");
}

// Função global para excluir aula
window.confirmarExclusao = function (id) {
  const modalId = criarModalConfirmacaoExclusaoHTML(
    "Você tem certeza que deseja excluir esta aula?"
  );
  const modalEl = document.getElementById(modalId);
  const modal = new bootstrap.Modal(modalEl);
  modal.show();

  modalEl
    .querySelector("#btnConfirmarExclusao")
    ?.addEventListener("click", async () => {
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

window.editarAula = async function (id) {
  // Busca a aula pelo id
  const aulas = await fetchAulasInstrutor();
  const aula = aulas.find((a) => a.id == id);
  if (!aula) {
    alert("Aula não encontrada!");
    return;
  }

  // Busca studios e alunos/presenças
  const studios = await fetchStudios();
  const { presences } = await fetchAlunosDaAula(id);

  // Remove modal antigo se existir
  const modalExistente = document.getElementById("modalEditarAula");
  if (modalExistente) modalExistente.remove();

  // Busca os dados dos alunos presentes (nome/id) via fetchAlunoById
  const alunosPresentes = await Promise.all(
    presences.map(async (alunoId) => {
      try {
        const aluno = await fetchAlunoById(alunoId);
        return { id: alunoId, nome: aluno.nome || aluno.name || alunoId };
      } catch {
        return { id: alunoId, nome: alunoId };
      }
    })
  );

  // Insere o modal no DOM
  document.body.insertAdjacentHTML(
    "beforeend",
    criarModalEditarAulaHTML(aula, studios, alunosPresentes, presences)
  );

  // Inicializa o modal Bootstrap
  const modalEl = document.getElementById("modalEditarAula");
  const modal = new bootstrap.Modal(modalEl);
  modal.show();

  // Evento para remover presença (ao clicar no X da tag)
  modalEl.querySelectorAll(".remover-presenca-btn").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const alunoId = this.dataset.alunoId;
      try {
        await removerPresencaAula(id, alunoId);
        modal.hide();
        modalEl.addEventListener(
          "hidden.bs.modal",
          () => {
            window.editarAula(id);
          },
          { once: true }
        );
      } catch (err) {
        alert("Erro ao remover presença!");
      }
    });
  });

  // Submit do form de edição
  modalEl.querySelector("#formEditarAula").onsubmit = async function (e) {
    e.preventDefault();
    const studio = modalEl.querySelector("#studioSelectEdit").value;
    const day = modalEl.querySelector("#campoData").value;
    const hours = modalEl.querySelector("#campoHorario").value;
    const type = modalEl.querySelector("#tipoAulaEdit").value;
    const status = modalEl.querySelector("#statusAulaEdit").value;
    const isActive =
      modalEl.querySelector("#isActiveAulaEdit").value === "true";

    // Atualiza presences pegando os badges restantes (apenas os IDs)
    const presencesEdit = Array.from(
      modalEl.querySelectorAll(".remover-presenca-btn")
    ).map((btn) => btn.dataset.alunoId);

    // Garante que students seja igual ao original (ou busque se necessário)
    const students = (aula.students || []).map((s) =>
      typeof s === "string" ? s : s.id
    );

    const body = {
      students,
      studio,
      instructor: aula.instructor,
      day,
      hours,
      status,
      presences: presencesEdit,
      type,
      isActive,
    };

    await atualizarAula(id, body);

    modal.hide();
    modalEl.remove();
    window.renderizarTabelaAulas && window.renderizarTabelaAulas();
  };
};
