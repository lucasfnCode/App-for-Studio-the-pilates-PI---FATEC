import { getOrCreateMainElement } from "../../components/main";
import { jwtDecode } from "jwt-decode";
import { criarModalCadastroUsuarioHTML } from "../../components/modais";

export function loginScreen() {
  const mainElement = getOrCreateMainElement();

  mainElement.innerHTML = `
    <section class="d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4 w-50 w-sm-75 w-md-50 w-lg-25"">
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
        <div class="text-center text-decoration-none fw-light mt-3">
          <button id="btnCadastroUsuario" class="btn btn-link text-decoration">Cadastre-se</button>
        </div>
      </div>
    </section>
  `;

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
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
        // Armazenar o token
        localStorage.setItem("token", data.token);

        // loginScreen.js
        const decoded = jwtDecode(data.token);
        // Descubra qual campo é o ID do banco (exemplo: decoded.id, decoded._id, decoded.sub)
        const userId = decoded.id || decoded._id || decoded.sub; // ajuste conforme o JWT
        const role = decoded.roles ? decoded.roles[0] : decoded.role;

        localStorage.setItem(
          "usuarioLogado",
          JSON.stringify({ ...decoded, id: userId, role, token: data.token })
        );
        localStorage.setItem("token", data.token);

        document.getElementById("loginMessage").innerHTML =
          "<span class='text-info'>Login realizado com sucesso</span>";

        // Redirecionar após login
        setTimeout(() => {
          location.hash = "#home";
        }, 800);
      } else {
        document.getElementById("loginMessage").innerHTML =
          "<span class='text-danger'>" +
          (data.message || "Erro ao fazer login.") +
          "</span>";
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      document.getElementById("loginMessage").innerHTML =
        "<span class='text-danger'>Erro de conexão.</span>";
    }
  });

  if (!document.getElementById("modalCadastroUsuario")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      criarModalCadastroUsuarioHTML()
    );
  }

  document.getElementById("btnCadastroUsuario").onclick = function () {
    // Remove e recria o modal para garantir que está limpo
    const modalExistente = document.getElementById("modalCadastroUsuario");
    if (modalExistente) modalExistente.remove();
    document.body.insertAdjacentHTML(
      "beforeend",
      criarModalCadastroUsuarioHTML()
    );

    const modal = new bootstrap.Modal(
      document.getElementById("modalCadastroUsuario")
    );
    modal.show();
  };
}
