import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { homeScreen } from './pages/home/home';
import { headerHtml } from './components/header';
import { footerHtml } from './components/footer';
import { renderAgendamentoPage } from './pages/schedulling/schedulling';
import { loginScreen } from "./pages/loginScreen/loginScreen";




function renderContentBasedOnHash() {

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
  }
}
renderContentBasedOnHash();
window.addEventListener("hashchange", renderContentBasedOnHash);