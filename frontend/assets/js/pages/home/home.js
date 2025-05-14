import { getOrCreateMainElement } from "../../components/main";


export function homeScreen(){
    const homeHTML= `
    <section class="container-xxl d-flex flex-wrap col-md-5">
            <section class="container-sm d-inline py-0" id="first-container">
                <h1 class="h1 text-center">
                    Home
                </h1>
                
                <p class="fs-5 text-center">
                    Abubleblé abu abublé abuua
                </p>
            </section>
`;

    const main = getOrCreateMainElement();
    main.innerHTML = homeHTML;
}