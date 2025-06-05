import { getOrCreateMainElement } from "../../../components/main"
import { clearBody } from "../../../function/clearbody";
import { createlistinstrutor } from "../services/people/instrutor";

//modal
export function callFormInstrutor(){
  
         const $form = `
            <section class=" position-absolute bg-warning top-0  w-50">
                <form class="container mt-4 " id="form">
             
         
                
                    <div class="mb-3">
                        <label class="form-label">Nome:</label>
                        <input type="text" class="form-control" name="name">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">funçao:</label>
                        <input type="text" class="form-control" name="type"> 
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Data de Contratação:</label>
                        <input type="date" class="form-control" name="hiringDate" >
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Email:</label>
                        <input type="email" class="form-control" name="email">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Contato:</label>
                        <input type="tel" class="form-control"  name="contact">
                    </div>

                    
                        <div class="mb-3">
                            <label class="form-label">Foto:</label>
                            <input type="file" accept="image/*" class="form-control" name="photo" value="null">
                        </div>
                    

                    <div class="mb-3">
                        <label class="form-label">Formação:</label>
                        <input type="text" class="form-control" name="formation">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Conselho:</label>
                        <textarea class="form-control" name="advice"></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Permissões:</label>
                        <ul class="list-group">
                            <li class="list-group-item">Aprovar Orçamentos
                                <input type="checkbox" name="permissions" value="aprovar_orcamentos">
                            </li>

                            <li class="list-group-item" id="gerenciaEquipe">
                            Gerenciar Equipe
                             <input type="checkbox" name="permissions" value="gerenciar_equipe">
                            </li>

                            <li class="list-group-item" id="acessototal">
                            Acesso Total
                             <input type="checkbox" name="permissions" value="acesso_total"">
                            </li>
                        </ul>
                    </div>

                    <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                </form>
            </section>
        
    `
    // POST
     async function createInstructors(bodyrequest){
            try{
                fetch("http://localhost:8080/instructors",{
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

        const permissions = formrawdata.getAll("permissions")
        const formdata = Object.fromEntries(formrawdata.entries())
        formdata.permissions = permissions;
        console.log(formdata);
        formdata.isActive = true
        if(formdata.photo.size === 0 ){
            formdata.photo = "null"
        }else{
            // todo transoformar a imagem em base64, por enquanto vou passar o url da imagem so para poder criar o objeto no backend
            formdata.photo = formdata.photo.name
        }

        createInstructors(formdata)
        clearBody()
        createlistinstrutor()
    })
    // "isActive": false
    const botoesDeletar = document.querySelectorAll(".btn-danger");

        botoesDeletar.forEach(botao => {
        botao.addEventListener("click", function() {
            console.log("Botão clicado:", this);
        });
    })
}