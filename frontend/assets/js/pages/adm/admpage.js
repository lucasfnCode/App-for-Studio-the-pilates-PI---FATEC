import { getOrCreateMainElement } from "../../components/main"

export function createPageAdm() {
    const main = getOrCreateMainElement()
    main.innerHTML = `
        <div class="container">
            <div class="row h-100 align-items-center justify-content-center">
                <div class="col d-flex align-items-center justify-content-center h-100">
                    <a href="#Studio-manegment" class="w-100 h-100">
                        <div class="card text-bg-primary w-100 h-100">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center h-100">
                                <h5 class="card-title text-center">gerenciar estudios</h5>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col d-flex align-items-center justify-content-center h-100">
                    <a href="#instructor-manegment" class="w-100 h-100">
                        <div class="card text-bg-success w-100 h-100">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center h-100">
                                <h5 class="card-title text-center">gerenciar instrutores</h5>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col d-flex align-items-center justify-content-center h-100">
                    <a href="#student-manegment" class="w-100 h-100">
                        <div class="card text-bg-success w-100 h-100">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center h-100">
                                <h5 class="card-title text-center">gerenciar alunos</h5>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    `
    main.classList.add("d-flex", "justify-content-center")
}