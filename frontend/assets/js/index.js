import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { homeScreen } from './pages/home/home';
import { headerHtml } from './components/header';
import { footerHtml } from './components/footer';
import { renderAgendamentoPage } from './pages/schedulling/schedulling';
import { admpage } from "./pages/adm/admpage";
import { clearBody } from "./function/clearbody";
import { createlistalunos } from "./pages/adm/services/people/alunos";
import { createlistinstrutor } from "./pages/adm/services/people/instrutor";
import { createviewStudio, getStudioById, loadAndRenderStudio } from "./pages/adm/services/things/studio/functions/viewstudioinfo";
import { getallstudio } from "./pages/adm/services/things/studio/Studio";

function renderContentBasedOnHash() {
  const id =location.hash.split("-")[1]
  clearBody();
  switch (location.hash) {
    case "":
    case "#home":
    case undefined:
      homeScreen();
      break;
    case "#agendamento":
      renderAgendamentoPage();
      break;
    case "#gerencia":
      admpage()
      break;
                    case "#alunos-lista":
                      createlistalunos()
                      break;
                    case "#instrutor-lista":
                      createlistinstrutor()
                      break;
                    case `#studio-${id}`:
                      const studioid =location.hash.split("-")[1]
                      getStudioById(studioid)
                      break;
  } 
}

renderContentBasedOnHash();
window.addEventListener("hashchange", renderContentBasedOnHash);