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
    <section id="bemVindoSection">
  <div class="bem-vindo-container text-center">
    <img src="https://cdn-icons-png.flaticon.com/512/2983/2983094.png" alt="Ícone de Pilates" class="bem-vindo-icone">
    <h1 class="bem-vindo-titulo">Bem-vindo ao Estúdio de Pilates</h1>
    <p class="bem-vindo-subtitulo">Transforme seu corpo e mente com nossas aulas especializadas.</p>
  </div>
</section>

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
