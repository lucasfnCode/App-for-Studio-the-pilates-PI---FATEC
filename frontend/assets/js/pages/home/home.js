import { getOrCreateMainElement } from "../../components/main";
import {
  criarModalInstrutoresHTML,
  criarModalAssinaturasHTML,
  criarModalSobreHTML,
} from "../../components/modais";

function createCard(title, imageUrl, modalTargetId) {
  return `
    <div class="col">
      <div class="card h-100 border-0 shadow-lg rounded-4 overflow-hidden">
        <img src="${imageUrl}" class="card-img-top" alt="${title}">
        <div class="card-body text-center">
          <h5 class="card-title fw-bold">${title}</h5>
          <button class="btn btn-dark w-100 rounded-pill mt-2" data-bs-toggle="modal" data-bs-target="#${modalTargetId}">Acessar</button>
        </div>
      </div>
    </div>
  `;
}

export function homeScreen() {
  const homeHTML = `
    <section id="bemVindoSection" class="text-center p-5">
  <div class="bem-vindo-container">
    <img src="https://cdn-icons-png.flaticon.com/512/685/685352.png" alt="Ícone Pilates" class="bem-vindo-icone">
    <h1 class="bem-vindo-titulo">Bem-vindo</h1>
    <p class="bem-vindo-subtitulo">Explore mais sobre nossos instrutores, planos e o mundo do Pilates!</p>
  </div>

      <section class="row row-cols-1 row-cols-md-3 g-4 w-100 justify-content-center">
        ${createCard("Instrutores", "https://placehold.co/600x400?text=Instrutores", "modalInstrutores")}
        ${createCard("Assinaturas", "https://placehold.co/600x400?text=Assinaturas", "modalAssinaturas")}
        ${createCard("Sobre", "https://placehold.co/600x400?text=Sobre", "modalSobre")}
      </section>

      ${criarModalInstrutoresHTML()}
      ${criarModalAssinaturasHTML()}
      ${criarModalSobreHTML()}
    </section>
  `;

  const main = getOrCreateMainElement();
  main.innerHTML = homeHTML;
}
