import { getOrCreateMainElement } from "../../components/main";
import { listadealunos } from "./services/alunos";

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
    `   
    const main = getOrCreateMainElement();
    main.insertAdjacentHTML("afterbegin",$admpage)
    
}