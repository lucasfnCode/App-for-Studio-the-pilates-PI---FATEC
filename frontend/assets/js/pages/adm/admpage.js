import { getOrCreateMainElement } from "../../components/main";
import { createstudio, getallstudio } from "./services/things/studio/Studio";

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
    
    
    <section id="studios-row">

    </section>
    `   
    
    const main = getOrCreateMainElement();
    main.insertAdjacentHTML("afterbegin",$admpage)
    
    getallstudio()  
}
