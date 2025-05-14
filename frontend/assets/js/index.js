import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { homeScreen } from './pages/home/home';
import { headerHtml } from './components/header';




function renderContentBasedOnHash() {
  switch (location.hash) {
    case "":
    case "#home":
    case undefined:
      homeScreen();
      break;
  }
}
renderContentBasedOnHash();