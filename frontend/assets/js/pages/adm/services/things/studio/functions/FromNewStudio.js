import { getOrCreateMainElement } from "../../../../../../components/main"

export function NewStudiForm(){
    const $Form = `
    <section class="studio-form position-absolute  start-50 translate-middle w-100 bg-warning" id="formsec"> 
        <button> X </button>
            <form id="form">
                <section class="container">
                    <div class="form-group">
                        <label>Nome do Estúdio:</label>
                        <input type="text" class="form-control"  name="name" />
                    </div>
                    <div class="form-group">
                        <label>Endereço:</label>
                        <input type="text" class="form-control"  name="address" />
                    </div>
                    
                    <h2>Dias de Operação</h2>
                    <div class="form-group">
                        <div class="checkbox-group">
                            <label>
                                <input type="checkbox" name="daysOperation" value="Segunda-feira" /> Segunda-feira
                            </label>
                            <label>
                                <input type="checkbox" name="daysOperation" value="Terça-feira" /> Terça-feira
                            </label>
                            <label>
                                <input type="checkbox" name="daysOperation" value="Quarta-feira" /> Quarta-feira
                            </label>
                            <label>
                                <input type="checkbox" name="daysOperation" value="Quinta-feira" /> Quinta-feira
                            </label>
                            <label>
                                <input type="checkbox" name="daysOperation" value="Sexta-feira" /> Sexta-feira
                            </label>
                            <label>
                                <input type="checkbox" name="daysOperation" value="Sábado" /> Sábado
                            </label>
                            <label>
                                <input type="checkbox" name="daysOperation" value="Domingo" /> Domingo
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Horário de funcionamento:</label>
                        <textarea type="text" class="form-control" name="openingHours"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Capacidade Máxima:</label>
                        <input type="text" class="form-control" name="limitStudentsPerClass" />
                    </div>

                    <h3>Dias que não abre</h3>
                    <div class="form-group">
                        <label>Feriados:</label>
                        <textarea class="form-control" name="holidays"></textarea> 
                    </div>
                    
                    <div class="form-group">
                        <label>Recessos:</label>
                        <textarea type="date" class="form-control" name="recesses" ></textarea> 
                    </div>
                    
                    <input type="hidden" id="studioId" name="id" value="" />
            </section>
                <button id="save"> salvar </button>
                
        </form>
        
    </section>
            `

    const main = getOrCreateMainElement()
  
   document.querySelector("#new").addEventListener("click", () => {
       if (!document.querySelector("#formsec")) {
           main.insertAdjacentHTML("afterend",$Form);
          
       }
   });
    
     
}
