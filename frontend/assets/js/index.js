import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { homeScreen } from './pages/home/home';
import { headerHtml } from './components/header';
import { footerHtml } from './components/footer';
import { renderAgendamentoPage } from './pages/schedulling/schedulling';
import { loginScreen } from "./pages/loginScreen/loginScreen";
import { createPageAdm } from "./pages/adm/admpage";
import { StudioManegementPage } from "./pages/adm/StudioManegement/StudioManegement";




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
    case "#gerenciamento":
      createPageAdm()
      break;
    case "#Studio-manegment":
        StudioManegementPage()
      break;
  }
}
renderContentBasedOnHash();
window.addEventListener("hashchange", renderContentBasedOnHash);