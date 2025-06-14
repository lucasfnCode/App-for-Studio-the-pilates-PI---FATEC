import { getOrCreateMainElement } from "../../../../../components/main";
import { deleteStudio } from "../service";

export function Deletar(id) {
   const main = getOrCreateMainElement()
  
   main.insertAdjacentHTML("afterbegin",`
    <div class="card shadow-sm mx-auto position-absolute top-50 start-50 translate-middle" style="max-width: 300px;" id="alert">
    <div class="card-body text-center p-4">
        <p class="mb-4">Tem certeza que quer deletar esse estudio?</p>
        
        <div class="d-flex justify-content-center gap-2">
        <button class="btn btn-danger fw-bold" id="deletar">Deletar</button>
        <button class="btn btn-outline-secondary" id="cancelar">Cancelar</button>
        </div>
    </div>
    </div>
    `)
    const $alert = document.querySelector("#alert")
    const $deletar = document.querySelector("#deletar")
    const $cacelar = document.querySelector("#cancelar")

    $deletar.addEventListener("click",() => {
        
        alert("estudio deletado") 
        deleteStudio(id)
        $alert.remove()
    })
    $cacelar.addEventListener("click",()=>{
        $alert.remove()
    })
    console.log(id);
   
}
