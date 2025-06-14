import { getOrCreateMainElement } from "../../../components/main";
import { EditFrom } from "./components/editform/editformstudi";
import { NewStudioForm } from "./components/newStudioform/NewStudioForm";
import { Deletar } from "./service/functions/deletar";
import { listarStudios } from "./service/functions/listar";

export function StudioManegementPage(){
    const main = getOrCreateMainElement()
    
    main.insertAdjacentHTML("beforebegin",`
    <section class="container-fluid my-4">
        <button class="btn btn-primary fw-bold px-4 py-2 rounded-pill shadow-sm" id="new">
                <i class="bi bi-plus-circle me-2"></i>Criar Estúdio
        </button>

        <section id="studios-row" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">

            <div class="m-4 card" style="max-width: 400px;">
                <div class="card-header bg-primary text-white p-2 d-flex justify-content-between align-items-center">
                    <h6 class="card-title mb-0">Informações do Estúdio: [name]</h6>
                    <div>
                  
                    <button class="btn btn-sm btn-danger delete">
                        <i class="bi bi-trash"></i>
                    </button>
                    </div>
                </div>
                <div class="card-body p-2">
                    <dl class="row mb-0">
                    <dt class="col-sm-5">ID:</dt>
                    <dd class="id col-sm-7 p-0 " data-id="${"123"}">[123]</dd>

                    <dt class="col-sm-5">Endereço:</dt>
                    <dd class="col-sm-7 p-0 ">[address]</dd>
                    
                    <dt class="col-sm-5">Dias/Horários:</dt>
                    <dd class="col-sm-7 p-0  days">
                        <div>Seg, Qua, Sex</div>
                        <div class="small">08:00 - 12:00</div>
                    </dd>
                    
                    <dt class="col-sm-5">capacidade :</dt>
                    <dd class="col-sm-7 p-0 ">20 pessoas por turma</dd>

                    <dt class="col-sm-5">Instrutores:</dt>
                    <dd class="col-sm-7 p-0 ">[instrutores]</dd>
                    </dl>
                </div>
                </div>
                 
              
                    <div class="m-4 card" style="max-width: 400px;">
                <div class="card-header bg-primary text-white p-2 d-flex justify-content-between align-items-center">
                    <h6 class="card-title mb-0">Informações do Estúdio: [name]</h6>
                    <div>
                    
                    <button class="btn btn-sm btn-danger delete">
                        <i class="bi bi-trash"></i>
                    </button>
                    </div>
                </div>
                <div class="card-body p-2">
                    <dl class="row mb-0">
                    <dt class="col-sm-5">ID:</dt>
                    <dd class="id col-sm-7 p-0 " data-id="${"456"}">[456]</dd>

                    <dt class="col-sm-5">Endereço:</dt>
                    <dd class="col-sm-7 p-0 ">[address]</dd>
                    
                    <dt class="col-sm-5">Dias/Horários:</dt>
                    <dd class="col-sm-7 p-0  days">
                        <div>Seg, Qua, Sex</div>
                        <div class="small">08:00 - 12:00</div>
                    </dd>
                    
                    <dt class="col-sm-5">capacidade :</dt>
                    <dd class="col-sm-7 p-0 ">20 pessoas por turma</dd>

                    <dt class="col-sm-5">Instrutores:</dt>
                    <dd class="col-sm-7 p-0 ">[instrutores]</dd>
                    </dl>
                </div>
                </div>




                <div class="m-4 card" style="max-width: 400px;">
                <div class="card-header bg-primary text-white p-2 d-flex justify-content-between align-items-center">
                    <h6 class="card-title mb-0">Informações do Estúdio: [name]</h6>
                    <div>
                    
                    <button class="btn btn-sm btn-danger delete">
                        <i class="bi bi-trash"></i>
                    </button>
                    </div>
                </div>
                <div class="card-body p-2">
                    <dl class="row mb-0">
                    <dt class="col-sm-5">ID:</dt>
                    <dd class="id col-sm-7 p-0 " data-id="${"987"}">[987]</dd>

                    <dt class="col-sm-5">Endereço:</dt>
                    <dd class="col-sm-7 p-0 ">[address]</dd>
                    
                    <dt class="col-sm-5">Dias/Horários:</dt>
                    <dd class="col-sm-7 p-0  days">
                        <div>Seg, Qua, Sex</div>
                        <div class="small">08:00 - 12:00</div>
                    </dd>
                    
                    <dt class="col-sm-5">capacidade :</dt>
                    <dd class="col-sm-7 p-0 ">20 pessoas por turma</dd>

                    <dt class="col-sm-5">Instrutores:</dt>
                    <dd class="col-sm-7 p-0 ">[instrutores]</dd>
                    </dl>
                </div>
                </div>
        </section>

    <section>
    `)

    const $new = document.querySelector("#new")
    $new.addEventListener("click",()=>NewStudioForm())

    const button =document.querySelectorAll("button.delete")
    button.forEach(btn => {
        btn.addEventListener("click",()=>{
            const card = btn.closest(".card");
            const id = card.querySelector(".id").dataset.id;
            Deletar(id)
        })  
    })
    listarStudios()
}