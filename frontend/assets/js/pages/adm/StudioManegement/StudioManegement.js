import { getOrCreateMainElement } from "../../../components/main";

import { NewStudioForm } from "./components/newStudioform/NewStudioForm";
import { Deletar } from "./service/functions/deletar";
import { listarStudios } from "./service/functions/listar";

export function StudioManegementPage(){
    const main = getOrCreateMainElement()
    
    main.insertAdjacentHTML("beforebegin",`
       <button class="btn btn-primary fw-bold px-4 py-2 rounded-pill shadow-sm" id="new">
                <i class="bi bi-plus-circle me-2"></i>Criar Estúdio
        </button>
    <section class="container-fluid my-4" >

        <section id="studios-row" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">

           
                
        </section>

    <section>
    `)
        listarStudios()
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
    
    
}