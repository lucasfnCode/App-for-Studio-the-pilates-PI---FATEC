import { getOrCreateMainElement } from "../../../components/main"
import { clearBody } from "../../../function/clearbody";
import { createlistalunos } from "../services/people/alunos";

//modal
export function callformsAlunos(){
  
         const $form = `
            <section class="position-absolute bg-warning top-0  w-50">
                <form class="container mt-4 " id="form">
          
                
                    <div class="mb-3">
                        <label class="form-label">Nome:</label>
                        <input type="text" class="form-control" name="nome">
                    </div>


                    <div class="mb-3">
                        <label class="form-label">Email:</label>
                        <input type="text" class="form-control" name="email">
                    </div>



                    <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                </form>
            </section>
        
    `
    // POST
     async function createaluno(bodyrequest){
            try{
                fetch("http://localhost:8080/alunos",{
                    method : "POST",
                    headers : { 'Content-Type': 'application/json'},
                    body : JSON.stringify(bodyrequest)
                })
            }catch(error){
                console.log(error);
                return error
            }
        }
    const main = getOrCreateMainElement();
    main.insertAdjacentHTML("afterbegin",$form)
 


    window.addEventListener("submit",(e) =>{
        e.preventDefault()
        const form = document.getElementById("form")
        const formrawdata = new FormData(form)
        const formdata = Object.fromEntries(formrawdata.entries())
     
        createaluno(formdata)
        clearBody()
        createlistalunos();
    })
}