import { getUserRoles } from "../../components/header";
import { getOrCreateMainElement } from "../../components/main";
import {
  criarModalInstrutoresHTML,
  criarModalAssinaturasHTML,
  criarModalSobreHTML,
  criarModalAulasInstrutorHTML,
  criarModalPerfilInstrutorHTML,
  criarModalAgendaRecepcaoHTML,
  criarModalCadastroClientesHTML,
  criarModalUsuariosAdminHTML,   
  criarModalAulasAdminHTML,      
} from "../../components/modais";
import { criarModalCadastroAulaHTML } from "../session/components/componentsSession";
import { renderizarTabelaAulas } from "../session/components/tableSession";
import { init } from "../session/session";


function createCard(title, imageUrl, modalTargetId, useOnClick = false) {
  const button = useOnClick
    ? `<button class="btn btn-dark w-100 rounded-pill mt-2" onclick="${modalTargetId}()">Acessar</button>`
    : `<button class="btn btn-dark w-100 rounded-pill mt-2" data-bs-toggle="modal" data-bs-target="#${modalTargetId}">Acessar</button>`;

  return `
    <div class="col p-3">
      <div class="card h-100 border-0 shadow-lg rounded-4 overflow-hidden">
        <img src="${imageUrl}" class="card-img-top" alt="${title}">
        <div class="card-body text-center">
          <h5 class="card-title fw-bold">${title}</h5>
          ${button}
        </div>
      </div>
    </div>
  `;
}

export async function homeScreen() {  
  const role = getUserRoles();

  let titulo = "Bem-vindo ao Estúdio de Pilates";
  let subtitulo = "Transforme seu corpo e mente com nossas aulas especializadas.";
  let cards = "";
  let modais = "";

  if (roles.includes("ROLE_INSTRUCTOR")) {
    titulo = "Área do Instrutor";
    subtitulo = "Gerencie suas aulas e visualize seu perfil profissional.";
    cards += createCard("Minhas Aulas", "https://placehold.co/600x400?text=Minhas+Aulas", "modalAulasInstrutor");
    cards += createCard("Meu Perfil", "https://placehold.co/600x400?text=Perfil", "modalPerfilInstrutor");
    modais += await criarModalAulasInstrutorHTML();
    modais += await criarModalPerfilInstrutorHTML();
  } else if (role === "ROLE_RECEPTIONIST") {
    titulo = "Área da Recepção";
    subtitulo = "Organize agendamentos e cadastros de clientes com facilidade.";
    cards += createCard("Agenda", "https://placehold.co/600x400?text=Agenda", "modalAgendaRecepcao");
    cards += createCard("Clientes", "https://placehold.co/600x400?text=Clientes", "modalCadastroClientes");
    modais += await criarModalAgendaRecepcaoHTML();
    modais += await criarModalCadastroClientesHTML();
  } else if (role === "ROLE_ADMIN") {
    titulo = "Área do Administrador";
    subtitulo = "Gerencie usuários, aulas e todo o sistema.";
    cards += createCard("Gerenciar Usuários", "https://placehold.co/600x400?text=Usuários", "modalUsuariosAdmin");
    cards += createCard("Gerenciar Aulas", "https://placehold.co/600x400?text=Aulas", "modalAulasAdmin");
    modais += await criarModalUsuariosAdminHTML();
    modais += await criarModalAulasAdminHTML();
  } else {
    // Aluno padrão
    cards += createCard("Instrutores", "https://placehold.co/600x400?text=Instrutores", "abrirModalInstrutores", true);
    cards += createCard("Assinaturas", "https://placehold.co/600x400?text=Assinaturas", "modalAssinaturas");
    modais += await criarModalAssinaturasHTML();
  }

  // O modal "Sobre" é comum a todos
  cards += createCard("Sobre", "https://placehold.co/600x400?text=Sobre", "modalSobre");
  modais += await criarModalSobreHTML();

  const homeHTML = `
    <section id="bemVindoSection">
      <div class="bem-vindo-container text-center">
        <img src="https://cdn-icons-png.flaticon.com/512/2983/2983094.png" alt="Ícone de Pilates" class="bem-vindo-icone">
        <h1 class="bem-vindo-titulo">${titulo}</h1>
        <p class="bem-vindo-subtitulo">${subtitulo}</p>
      </div>
    </section>

    <section class="row row-cols-1 row-cols-md-3 g-4 w-100 justify-content-center">
      ${cards}
    </section>

    ${modais}
  `;

  const main = getOrCreateMainElement();
  main.innerHTML = homeHTML;
}

window.abrirModalInstrutores = async function () {
  await criarModalInstrutoresHTML();  

  setTimeout(() => {
    const modalEl = document.getElementById("modalInstrutores");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    } else {
      console.error("Modal de instrutores não foi encontrado no DOM.");
    }
  }, 100);
};

window.abrirModalUsuariosAdmin = async function () {
  await criarModalUsuariosAdminHTML();

  setTimeout(() => {
    const modalEl = document.getElementById("modalUsuariosAdmin");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    } else {
      console.error("Modal de usuários não foi encontrado no DOM.");
    }
  }, 100);
};

window.abrirModalAulasAdmin = async function () {
  await criarModalAulasAdminHTML();

  setTimeout(() => {
    const modalEl = document.getElementById("modalAulasAdmin");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    } else {
      console.error("Modal de aulas não foi encontrado no DOM.");
    }
  }, 100);
};

