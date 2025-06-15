import { getOrCreateMainElement } from "../../components/main"

export function createPageAdm(){
    const main = getOrCreateMainElement()
    main.innerHTML = `
        <section class="menagement container d-flex  p-4">
            <a href="#Studio-manegment">
                    <div id="Studios" class="card m-2 text-bg-primary" style="width: 18rem">
                        <div class="card-body">
                            <h5 class="card-title text-center p-5">gerenciar estudios</h5>
                            <h6> </h6>
                        </div>
                    </div>
            </a>

                <a href="#instructor-manegment">
                    <div id="Studios" class="card m-2 text-bg-success" style="width: 18rem">
                        <div class="card-body">
                            <h5 class="card-title text-center p-5">gerenciar instrutores</h5>
                            <h6> </h6>
                        </div>
                    </div>
            </a>
        </section>
    `

}