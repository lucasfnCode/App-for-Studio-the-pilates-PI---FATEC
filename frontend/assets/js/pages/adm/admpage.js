import { getOrCreateMainElement } from "../../components/main"

export function createPageAdm(){
    const main = getOrCreateMainElement()
    main.innerHTML = `
        <section class="menagement container p-5">
        <a href="#Studio-manegment">
                <div id="Studios" class="card text-bg-primary" style="width: 18rem">
                    <div class="card-body">
                        <h5 class="card-title text-center p-5">gerenciar estudios</h5>
                        <h6> </h6>
                    </div>
                </div>
        </a>
        </section>
    `

}