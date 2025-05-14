import { getOrCreateMainElement } from "../../components/main";


export function homeScreen(){
    const homeHTML= `
    <section class="container d-flex p-5">
            <section class="container p-4 border border-white rounded" id="painelHome">
                <h1 class="h1 text-center">
                    Bem vindo
                </h1>
                
                <p class="fs-5 text-center">
                    Abubleblé abu abublé abuua
                </p>
            </section>
            
            
            </section>

            <section class="row row-cols-3 p-4">

                <div class="col-sm">
                <div class="card text-bg-warning text-center w-75" style="width: 20rem;">
                    <img src="https://placehold.co/10" class="card-img-top" alt="...">
                        <div class="card-body p-2">
                            <h5 class="card-title">Planos</h5>
                                <a href="#" class="btn btn-outline-dark">Go somewhere</a>
                        </div>
                </div>
                </div>
                
                <div class="col-sm">
                <div class="card text-bg-warning text-center w-75" style="width: 20rem;">
                    <img src="https://placehold.co/10" class="card-img-top" alt="...">
                        <div class="card-body p-2">
                            <h5 class="card-title">Card title</h5>
                                <a href="#" class="btn btn-outline-dark">Go somewhere</a>
                        </div>
                </div>
                </div>

                <div class="col-sm">
                <div class="card text-bg-warning text-center w-75" style="width: 20rem;">
                    <img src="https://placehold.co/10" class="card-img-top" alt="...">
                        <div class="card-body p-2">
                            <h5 class="card-title">Card title</h5>
                                <a href="#" class="btn btn-outline-dark">Go somewhere</a>
                        </div>
                </div>
                </div>
            </section>
`;

    const main = getOrCreateMainElement();
    main.innerHTML = homeHTML;
}