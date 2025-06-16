import { renderizarTabelaAulas } from './components/tableSession';
import { criarModalCadastroAulaHTML, configurarModalCadastroAula } from './components/modaisSessions/formModal';
import { getOrCreateMainElement } from '../../components/main';

export async function init() {
  let usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuario || usuario.role !== "ROLE_INSTRUCTOR") {
    document.body.innerHTML = "<h2 class='text-center mt-5'>Acesso restrito a instrutores.</h2>";
    return;
  }

  // Garante que o nome do instrutor está no localStorage
  if (!usuario.name) {
    try {
      const response = await fetch(`http://localhost:8080/users/instructors/${usuario.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        usuario.name = userData.name;
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      } else {
        console.warn("Não foi possível buscar o nome do instrutor.");
      }
    } catch (e) {
      console.warn("Erro ao buscar nome do instrutor:", e);
    }
  }

  const main = getOrCreateMainElement();
  main.innerHTML = `
    <section class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Minhas Aulas</h2>
        <button id="btnAdicionarAula" class="btn btn-success">Adicionar Aula</button>
      </div>
      <div class="table-responsive">
        <table class="table" id="tabelaAulas">
          <thead>
            <tr>
              <th>Studio</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <!-- As aulas serão renderizadas aqui -->
          </tbody>
        </table>
      </div>
    </section>
  `;

  // Garante que o DOM foi atualizado antes de renderizar a tabela
  setTimeout(() => {
    renderizarTabelaAulas();
    window.renderizarTabelaAulas = renderizarTabelaAulas;
  }, 0);

  document.getElementById('btnAdicionarAula').addEventListener('click', () => {
    const modalExistente = document.getElementById('modalCadastroAula');
    if (modalExistente) modalExistente.remove();

    document.body.insertAdjacentHTML('beforeend', criarModalCadastroAulaHTML());
    configurarModalCadastroAula();
    const modal = new bootstrap.Modal(document.getElementById('modalCadastroAula'));
    modal.show();
  });
}