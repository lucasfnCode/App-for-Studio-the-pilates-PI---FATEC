import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { homeScreen } from './pages/home/home';
import { headerHtml } from './components/header';
import { footerHtml } from './components/footer';




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