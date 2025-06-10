import { getOrCreateMainElement } from "../../components/main";
import { savePOSTform } from "./services/things/studio/functions/formfunctions/saveforminput";
import { NewStudiForm } from "./services/things/studio/functions/FromNewStudio";
import { getallstudio } from "./services/things/studio/Studio";



export function admpage(){
    const $admpage = `
    <a href="#alunos-lista">
        <section>
            alunos
        </section>
    </a>

    <a href="#instrutor-lista">
        <section>
            instrutor
        </section>
    </a>
    
     <section class="container d-flex m-2">
                <h1> Estudios </h1>
                <button id="new"> criar novo estudio </button> 
            </section>
    <section id="studios-row" class="container d-flex">

    </section>
    `   
    
    const main = getOrCreateMainElement();
    main.insertAdjacentHTML("afterbegin",$admpage);

 
    NewStudiForm()
    getallstudio();
    savePOSTform();
}
