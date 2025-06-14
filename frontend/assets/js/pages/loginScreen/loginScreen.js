import { getOrCreateMainElement } from "../../components/main";
import jwtDecode from "jwt-decode";

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
        <div id="loginMessage" class="mt-3"></div>
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

      console.log(data);
      if (response.ok) {
        
        // localStorage.setItem("token", data.token); // Armazena o token no localStorage
        const decodedHeader = await jwtDecode(token, { header: true });
        console.log("Decoded Token!", decodedHeader);

        localStorage.setItem("usuarioLogado", JSON.stringify(decodedToken)); // Armazena os dados do usuário
        const roles = decodedToken.roles || []; // Supondo que a role esteja em 'roles'
        localStorage.setItem("userRole", JSON.stringify(roles)); // Armazena as roles
        console.log(roles);
        
        location.hash = '#home';
      } else {
        // document.getElementById("loginMessage").textContent = data.message || "Erro ao fazer login.";
        console.log(data.message);
        
      }
    } catch (error) {
      console.error("Erro ao buscar dados do login:", error);
      document.getElementById("loginMessage").textContent = "Erro de conexão ao tentar fazer login.";
    }
  });
}