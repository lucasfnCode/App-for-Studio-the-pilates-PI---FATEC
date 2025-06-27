export function getUserRoles() {
    try {
        const user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
        return Array.isArray(user?.role) ? user.role : [user?.role].filter(Boolean);
    } catch {
        return [];
    }
}

export function renderHeader() {
    const roles = getUserRoles();
    const isInstructor = roles.includes("ROLE_INSTRUCTOR");
    const isAdmin = roles.includes("ROLE_ADMIN");
    const user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    const nomeUsuario = user.name || "";

    const agendamentoLink = user && user.id
        ? `<a class="nav-link m-1 text-secondary" href="#agendamento">Agendamento</a>`
        : "";

    const logoutBtnHtml = user && user.id
        ? `<button id="logoutBtn" class="btn btn-outline-danger btn-sm ms-2" title="Sair">
      <i class="bi bi-box-arrow-right"></i>
    </button>`
        : "";

    const loginLinkHtml = !(user && user.id)
        ? `<a class="nav-link m-1 text-secondary" href="#login">
            <i class="bi bi-people-fill"></i>
         </a>`
        : "";

    const headerHtml = `
  <section class="d-flex justify-content-center" id="head">
    <h1>Estudio de Pilates</h1>
  </section>
  <nav class="d-flex justify-content-between align-items-center px-4 py-2 border-bottom"  id="nav">
    <div class="nav nav-underline">
      <a class="nav-link m-1 text-secondary" aria-current="page" href="#home">Home</a>
      ${agendamentoLink}
      ${(isInstructor || isAdmin) ? `<a class="nav-link m-1 text-secondary" href="#aula">Gerenciar Aulas</a>` : ""}
      ${isAdmin ? `<a class="nav-link m-1 text-secondary" href="#gerenciamento">Gerenciamento</a>` : ""}
    </div>
    <div class="nav align-items-center">
      <span class="me-3 fw-bold text-secondary" title="Usuário logado">${nomeUsuario}</span>
      ${loginLinkHtml}
      ${logoutBtnHtml}
    </div>
  </nav>
`;
    const oldHeader = document.querySelector('header');
    if (oldHeader) oldHeader.remove();

    const headerElement = document.createElement('header');
    headerElement.innerHTML = headerHtml;
    document.body.insertAdjacentElement('afterbegin', headerElement);

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            localStorage.removeItem("token");
            location.hash = "#login";
            location.reload();
        });
    }
}

// export const headerHtml = "";