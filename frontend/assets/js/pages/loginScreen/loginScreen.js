import { getOrCreateMainElement } from "../../components/main";

export function loginScreen() {
  const mainElement = getOrCreateMainElement();
  mainElement.innerHTML = `
    <section class="d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4 w-25">
        <h2 class="text-center mb-4">Login</h2>
        <form id="loginForm">
          <div class="mb-3">
            <label for="email" class="form-label">Usuário</label>
            <input type="email" class="form-control" id="username" required>
          </div>
          <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" class="form-control" id="password" required>
          </div>
          <button type="submit" class="btn btn-secondary w-100">Login</button>
        </form>
      </div>
    </section>
  `;

  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    
    // Redirecionamento
    location.hash = '#home';
    
  });
}