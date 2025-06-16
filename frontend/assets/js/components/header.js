function getUserRole() {
  try {
    const user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    return user?.role;
  } catch {
    return null;
  }
}

export function renderHeader() {
  const isInstructor = getUserRole() === "ROLE_INSTRUCTOR";
  const headerHtml = `
    <section class="d-flex justify-content-center" id="head">
      <h1>Estudio de Pilates</h1>
    </section>
    <nav class="d-flex justify-content-between align-items-center px-4 py-2 border-bottom"  id="nav">
      <div class="nav nav-underline">
        <a class="nav-link m-1 text-secondary" aria-current="page" href="#home">Home</a>
        <a class="nav-link m-1 text-secondary" href="#agendamento">Agendamento</a>
        ${isInstructor ? `<a class="nav-link m-1 text-secondary" href="#aula">Gerenciar Aulas</a>` : ""}
      </div>
      <div class="nav">
        <a class="nav-link m-1 text-secondary" href="#login">
          <i class="bi bi-people-fill"></i>
        </a>
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
}

export const headerHtml = ""; // Não use mais diretamente, mas mantém para evitar erros de importação