export const headerHtml = `

<section class="d-flex justify-content-center" id="head">

<h1>Estudio de Pilates</h1>

</section>

<nav class="d-flex justify-content-between align-items-center px-4 py-2 border-bottom"  id="nav">

  <div class="nav nav-underline">
    <a class="nav-link m-1 text-secondary" aria-current="page" href="#home">Home</a>
    <a class="nav-link m-1 text-secondary" href="#">Agendamento</a>
    <a class="nav-link m-1 text-secondary" href="#">Aulas</a>
  </div>

  <div class="nav">
    <a class="nav-link m-1 text-secondary" href="#">
      <i class="bi bi-people-fill"></i>
    </a>
  </div>

</nav>
`;

const headerElement = document.createElement('header');
headerElement.innerHTML = headerHtml;
document.body.insertAdjacentElement('afterbegin', headerElement);