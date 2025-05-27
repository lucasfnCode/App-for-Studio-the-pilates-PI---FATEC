import { getOrCreateMainElement } from "../../components/main";

export function renderCriarAula(){
    const criarAulaHTML = `

        

    `;

    const main = getOrCreateMainElement();
    main.innerHTML = criarAulaHTML;
}