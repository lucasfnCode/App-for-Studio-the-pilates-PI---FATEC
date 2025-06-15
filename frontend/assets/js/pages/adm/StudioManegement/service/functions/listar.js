import { getStudios } from "../service"
import { Deletar } from "./deletar"

export async function listarStudios(){
    const $stuiosrow = document.querySelector("#studios-row")
    const studio = await getStudios()
    if($stuiosrow){
        $stuiosrow.innerHTML = ""
    }
    studio.forEach(e => {
        $stuiosrow.insertAdjacentHTML("beforeend",`

   <div class="m-4 card" style="max-width: 400px;">
    <div class="card-header bg-primary text-white p-2 d-flex justify-content-between align-items-center">
        <h6 class="card-title mb-0">Informações do Estúdio: ${e.name}</h6>
        <div>
            <button class="btn btn-sm btn-danger delete">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    </div>
    <div class="card-body p-2">
        <dl class="row mb-0">
            <dt class="col-sm-5">ID:</dt>
            <dd class="id col-sm-7 p-0 " data-id="${e.id}">${e.id}</dd>

            <dt class="col-sm-5">Endereço:</dt>
            <dd class="col-sm-7 p-0 ">${e.address}</dd>
            
            <dt class="col-sm-5">Dias/Horários:</dt>
            <dd class="col-sm-7 p-0 days">
                <div>${e.daysOperation}</div>
                <div class="small">${e.openingHours}</div>
            </dd>
            
            <dt class="col-sm-5">Capacidade:</dt>
            <dd class="col-sm-7 p-0 ">${e.limitStudentsPerClass} pessoas por turma</dd>

            <dt class="col-sm-5">Instrutores:</dt>
            <dd class="col-sm-7 p-0 ">${e.instructorsByTime}</dd>
        </dl>
    </div>
</div>

            `)
    })
    
    
    console.log("lista de estudios vindo do back : ",studio);
    
     const button =document.querySelectorAll("button.delete")

    button.forEach(btn => {
    btn.addEventListener("click",()=>{
        const card = btn.closest(".card");
        const id = card.querySelector(".id");
        const cardid = id.innerHTML.trim();
        
        Deletar(cardid)
        })
    })  
}