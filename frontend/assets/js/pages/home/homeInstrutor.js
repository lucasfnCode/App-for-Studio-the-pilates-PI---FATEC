document.addEventListener('DOMContentLoaded', () => {
  const conteudo = document.getElementById('conteudo');
  conteudo.innerHTML = `
    <section id="bemVindoSection">
      <div class="bem-vindo-container text-center">
        <img src="img/professor.png" class="bem-vindo-icone" alt="Instrutor">
        <h1 class="bem-vindo-titulo">Olá, Instrutor!</h1>
        <p class="bem-vindo-subtitulo">Gerencie suas aulas e alunos facilmente pela sua área.</p>
      </div>
    </section>

    <div class="container mb-5">
      <div class="row g-4">

        <div class="col-md-6 col-lg-4">
          <div class="card p-3" id="painelHome">
            <img src="img/nova-aula.jpg" class="card-img-top" height="200">
            <div class="card-body text-center">
              <h5 class="card-title">Criar Aula</h5>
              <button class="btn btn-warning" onclick="window.location.href='criarAula.html'">Nova Aula</button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card p-3" id="painelHome">
            <img src="img/lista-alunos.jpg" class="card-img-top" height="200">
            <div class="card-body text-center">
              <h5 class="card-title">Alunos</h5>
              <button class="btn btn-warning" onclick="window.location.href='listaAlunos.html'">Ver Alunos</button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card p-3" id="painelHome">
            <img src="img/presenca.jpg" class="card-img-top" height="200">
            <div class="card-body text-center">
              <h5 class="card-title">Presenças</h5>
              <button class="btn btn-warning" onclick="window.location.href='presenca.html'">Gerenciar</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
});
