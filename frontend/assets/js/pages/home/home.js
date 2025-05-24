import { getOrCreateMainElement } from "../../components/main";

export function homeScreen() {
    const homeHTML = `
    <section class="container py-5 d-flex flex-column align-items-center gap-4">
        <section id="painelHome" class="w-100 p-5 rounded-4 shadow-lg text-center" style="max-width: 900px;">
            <h1 class="display-5 fw-bold mb-3">Bem vindo</h1>
            <p class="fs-5 text-muted">Abubleblé abu abublé abuua</p>
        </section>

        <section class="row row-cols-1 row-cols-md-3 g-4 w-100 justify-content-center">
            ${createCard("Instrutores", "https://placehold.co/600x400", "#")}
            ${createCard("Assinaturas", "https://placehold.co/600x400", "#")}
            ${createCard("Sobre", "https://placehold.co/600x400", "#")}
        </section>
    </section>
    `;

    const main = getOrCreateMainElement();
    main.innerHTML = homeHTML;
}

function createCard(title, imageUrl, link) {
    return `
    <div class="col">
        <div class="card h-100 border-0 rounded-4 shadow-sm overflow-hidden">
            <img src="${imageUrl}" class="card-img-top object-fit-cover" alt="${title}" style="height: 200px;">
            <div class="card-body text-center d-flex flex-column justify-content-between gap-2 p-4">
                <h5 class="card-title fs-4 fw-semibold">${title}</h5>
                <a href="${link}" class="btn btn-dark rounded-pill px-4">Acessar</a>
            </div>
        </div>
    </div>
    `;
}
