import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { homeScreen } from './pages/home/home';
import { renderHeader } from './components/header';
import { renderAgendamentoPage } from './pages/schedulling/schedulling';
import { loginScreen } from "./pages/loginScreen/loginScreen";
import { createPageAdm } from "./pages/adm/admpage";
import { StudioManegementPage } from "./pages/adm/StudioManegement/StudioManegement";
import { clearBody } from "./functions/clearBody";
import { instructorManegement } from "./pages/adm/instrutor/instructorManegement";
import { init } from "./pages/session/session";
import { getUserRoles } from './components/header';
import { studentManagement } from "./pages/adm/student/studentManagement";
import { studentReportPage } from "./pages/adm/student/studentReport";

function isUserLoggedIn() {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    return usuario && usuario.token;
}

function hasAccess(allowedRoles = []) {
    if (!isUserLoggedIn()) return false;
    const roles = getUserRoles();
    if (allowedRoles.length === 0) return true;
    return roles.some(role => allowedRoles.includes(role));
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
            if (!isUserLoggedIn()) {
                loginScreen();
                break;
            }
            renderAgendamentoPage();
            break;
        case "#login":
            loginScreen();
            break;
        case "#aula":
            if (!hasAccess(["ROLE_INSTRUCTOR", "ROLE_ADMIN", "ROLE_RECEPTIONIST"])) {
                loginScreen();
                break;
            }
            init();
            break;
        case "#gerenciamento":
            if (!hasAccess(["ROLE_ADMIN"])) {
                loginScreen();
                break;
            }
            createPageAdm();
            break;
        case "#Studio-manegment":
            if (!hasAccess(["ROLE_ADMIN"])) {
                loginScreen();
                break;
            }
            StudioManegementPage();
            break;
        case "#instructor-manegment":
            if (!hasAccess(["ROLE_ADMIN"])) {
                loginScreen();
                break;
            }
            instructorManegement();
            break;
        case "#student-manegment":
            if (!hasAccess(["ROLE_ADMIN"])) {
                loginScreen();
                break;
            }
            studentManagement();
            break;
        default:
            if (location.hash.startsWith("#student-report-")) {
                if (!hasAccess(["ROLE_ADMIN"])) {
                    loginScreen();
                    break;
                }
                const alunoId = location.hash.replace("#student-report-", "");
                console.log(alunoId);
                
                studentReportPage(alunoId);
                break;
            }
            homeScreen();
    }
}

renderContentBasedOnHash();
window.addEventListener("hashchange", renderContentBasedOnHash);
