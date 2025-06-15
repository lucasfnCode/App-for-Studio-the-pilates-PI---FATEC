import { getOrCreateMainElement } from "../../components/main";
import { jwtDecode } from "jwt-decode";

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
        <div id="loginMessage" class="mt-3 text-center"></div>
      </div>
    </section>
  `;

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazenar o token junto às infos do usuário
        localStorage.setItem("token", data.token);

        // Decodificar o JWT para obter o role
        const decoded = jwtDecode(data.token);
        const role = decoded.roles[0];
        localStorage.setItem("usuarioLogado", JSON.stringify({...decoded, role}));
        
        // Exibir mensagem de sucesso
        document.getElementById("loginMessage").innerHTML =
          "<span class='text-info'>Login realizado com sucesso</span>";

          console.log(data.token);
          
        console.log("Dados do usuário!", decoded);
        console.log("Role!", role);

        // Redirecionar para home ou agendamento
        // location.hash = "#home";
      } else {
        document.getElementById("loginMessage").innerHTML =
          "<span class='text-danger'>" +
          (data.message || "Erro ao fazer login.") +
          "</span>";
      }
    } catch (error) {
      console.error("Erro ao fazer login.", error);
      document.getElementById("loginMessage").innerHTML =
        "<span class='text-danger'>Erro de conexão.</span>";
    }
  });
}
