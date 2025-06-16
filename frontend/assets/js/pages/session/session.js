import { renderizarTabelaAulas } from './components/tableSession';
import { criarModalCadastroAulaHTML } from './components/modaisSessions/formModal';
import { getOrCreateMainElement } from '../../components/main';

export function init() {
  // Verifica se o usuário é instrutor
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuario || usuario.role !== "ROLE_INSTRUCTOR") {
    document.body.innerHTML = "<h2 class='text-center mt-5'>Acesso restrito a instrutores.</h2>";
    return;
  }

  // Sempre use o helper para pegar o main correto
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

  // Agora sim, chama a função para renderizar as aulas
  renderizarTabelaAulas();

  // Adiciona o evento do botão
  document.getElementById('btnAdicionarAula').addEventListener('click', () => {
    // Remove modal antigo se existir
    const modalExistente = document.getElementById('modalCadastroAula');
    if (modalExistente) modalExistente.remove();

    document.body.insertAdjacentHTML('beforeend', criarModalCadastroAulaHTML());
    const modal = new bootstrap.Modal(document.getElementById('modalCadastroAula'));
    modal.show();
  });
}