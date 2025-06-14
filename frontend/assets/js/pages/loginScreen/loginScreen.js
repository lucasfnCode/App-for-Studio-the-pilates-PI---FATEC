import { getOrCreateMainElement } from "../../components/main";

export function loginScreen() {
  const mainElement = getOrCreateMainElement();
  mainElement.innerHTML = `
    <section class="d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4 w-25">
        <h2 class="text-center mb-4">Login</h2>
        <form id="loginForm">
          <div class="mb-3">
            <label class="form-label">Usuário</label>
            <input name="username" class="form-control" id="username" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Senha</label>
            <input name="password" type="password" class="form-control" id="password" required>
          </div>
          <button type="submit" class="btn btn-secondary w-100">Login</button>
        </form>
      </div>
    </section>
  `;

  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const body = {
      username: username,
      password: password,
    };
    console.log(body);
    try {
      const response = await fetch(`http://localhost:8080/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json(); // Captura o corpo da resposta como objeto JS
      localStorage.setItem("token", data.token); // Armazena o token no localStorage
    } catch (error) {
      console.error("Erro ao buscar dados completos dos alunos:", error);
      return [];
    }
    // // Redirecionamento
    // location.hash = '#home';
  });
}
