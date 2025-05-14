import { getOrCreateMainElement } from "../../components/main";


export function homeScreen(){
    const homeHTML= `
    <section class="container d-flex vh-100 p-5">
            <section class="container p-4 border border-white rounded" id="painelHome">
                <h1 class="h1 text-center">
                    Bem vindo
                </h1>
                
                <p class="fs-5 text-center">
                    Abubleblé abu abublé abuua
                </p>
            </section>
`;

    const main = getOrCreateMainElement();
    main.innerHTML = homeHTML;
}