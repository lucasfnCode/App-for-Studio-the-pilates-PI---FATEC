import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { homeScreen } from './pages/home/home';
import { renderHeader } from './components/header';
import { footerHtml } from './components/footer';
import { renderAgendamentoPage } from './pages/schedulling/schedulling';
import { loginScreen } from "./pages/loginScreen/loginScreen";
import { init } from "./pages/session/session";


function isUserLoggedIn() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  return usuario && usuario.token;
}

function renderContentBasedOnHash() {
  const hash = location.hash;

  if (!isUserLoggedIn() && hash !== "#login") {
    location.hash = "#login";
    return;
  }
  renderHeader();
  switch (hash) {
    case "":
    case "#home":
    case undefined:
      homeScreen();
      break;
    case "#agendamento":
      renderAgendamentoPage();
      break;
    case "#login":
      loginScreen();
      break;
    case "#aula":
      init();
      break;
  }
}

renderContentBasedOnHash();
window.addEventListener("hashchange", renderContentBasedOnHash);
