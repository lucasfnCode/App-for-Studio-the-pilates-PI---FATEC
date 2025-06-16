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
  const headerHtml = `
    <section class="d-flex justify-content-center" id="head">
      <h1>Estudio de Pilates</h1>
    </section>
    <nav class="d-flex justify-content-between align-items-center px-4 py-2 border-bottom"  id="nav">
      <div class="nav nav-underline">
        <a class="nav-link m-1 text-secondary" aria-current="page" href="#home">Home</a>
        <a class="nav-link m-1 text-secondary" href="#agendamento">Agendamento</a>
        ${(isInstructor || isAdmin) ? `<a class="nav-link m-1 text-secondary" href="#aula">Gerenciar Aulas</a>` : ""}
        ${isAdmin ? `<a class="nav-link m-1 text-secondary" href="#gerenciamento">gerenciamento</a>` : ""}
      </div>
      <div class="nav">
        <a class="nav-link m-1 text-secondary" href="#login">
          <i class="bi bi-people-fill"></i>
        </a>
        <button id="logoutBtn" class="btn btn-outline-danger btn-sm ms-2" title="Sair">
          <i class="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </nav>
  `;
  // Remove header antigo, se existir
  const oldHeader = document.querySelector('header');
  if (oldHeader) oldHeader.remove();

  // Cria e insere o novo header
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

export const headerHtml = ""; // Não use mais diretamente, mas mantém para evitar erros de importação