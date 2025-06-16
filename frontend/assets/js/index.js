import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { homeScreen } from './pages/home/home';
import { renderHeader } from './components/header';
import { footerHtml } from './components/footer';
import { renderAgendamentoPage } from './pages/schedulling/schedulling';
import { loginScreen } from "./pages/loginScreen/loginScreen";
import { createPageAdm } from "./pages/adm/admpage";
import { StudioManegementPage } from "./pages/adm/StudioManegement/StudioManegement";
import { clearBody } from "./functions/clearBody";
import { instructorManegement } from "./pages/adm/instrutor/instructorManegement";
import { init } from "./pages/session/session";

function isUserLoggedIn() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  return usuario && usuario.token;
}

function renderContentBasedOnHash() {
  clearBody();
  renderHeader();
  switch (location.hash) {
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
      case "#gerenciamento":
      createPageAdm()
      break;
    case "#Studio-manegment":
      StudioManegementPage()
      break;
    case "#instructor-manegment":
      instructorManegement()
      break;
  }
}

renderContentBasedOnHash();
window.addEventListener("hashchange", renderContentBasedOnHash);
