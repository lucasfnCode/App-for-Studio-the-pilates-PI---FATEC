import { getOrCreateMainElement } from "../../../../../components/main";
import { closeform } from "./closeform";
import { saveform } from "./saveform";

export function NewStudioForm(){
    const main = getOrCreateMainElement();
    if(!document.querySelector("#newformcon")){

    main.insertAdjacentHTML("beforeend",`

    <div class="card position-absolute top-50 start-50 translate-middle" id="newformcon">
  <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
    <h5 class="card-title mb-0">Cadastro de Local</h5>


    <button id="close" class="p-0 btn">
      <i class="bi bi-x-lg btn btn-danger"></i>
    </button>
  </div>
  <div class="card-body">
    <form id="cardInfoForm">
      <!-- Linha 1 - Nome -->
      <div class="mb-3">
        <label for="name" class="form-label">Nome do Estudio</label>
        <input type="text" class="form-control" name="name" id="name" placeholder="Digite o nome" required>
      </div>

      <!-- Linha 2 - Endereço -->
      <div class="mb-3">
        <label for="address" class="form-label">Endereço</label>
        <textarea class="form-control" id="address" rows="2" placeholder="Endereço completo" required name="address"></textarea>
      </div>

      <!-- Linha 3 - Dias de Funcionamento -->
      <div class="mb-3">
        <label class="form-label">Dias de Funcionamento</label>
        <div class="d-flex flex-wrap gap-3">
          <div class="form-check">

            <input class="form-check-input" name="daysOperation" type="checkbox" id="monday" value="segunda-feira">
            <label class="form-check-label" for="monday">Seg</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" name="daysOperation" type="checkbox" id="tuesday" value="terça-feira">
            <label class="form-check-label" for="tuesday">Ter</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" name="daysOperation" type="checkbox" id="wednesday" value="quarta-feira">
            <label class="form-check-label" for="wednesday">Qua</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" name="daysOperation" type="checkbox" id="thursday" value="quinta-feira">
            <label class="form-check-label" for="thursday">Qui</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" name="daysOperation" type="checkbox" id="friday" value="Sexta-feira">
            <label class="form-check-label" for="friday">Sex</label>
          </div>
          
          <div class="form-check">
            <input class="form-check-input" name="daysOperation" type="checkbox" id="saturday" value="sábado">
            <label class="form-check-label" for="saturday">Sáb</label>
          </div>
          
          <div class="form-check">
            <input class="form-check-input" name="daysOperation" type="checkbox" id="sunday" value="domingo">
            <label class="form-check-label" for="sunday">Dom</label>
          </div>
        </div>
      </div>

      
      <!-- Linha 4 - Horário e Limite -->
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label">Horário de Funcionamento</label>
          <div class="input-group">
            <input type="time" class="form-control" name="openingHours">
          </div>
        </div>
        <div class="col-md-6">
          <label for="limitStudents" class="form-label">Limite de Alunos</label>
          <input type="number" class="form-control" id="limitStudents" min="1" placeholder="Ex: 20" name="limitStudentsPerClass">
        </div>
      </div>


        <!-- linha 5 - instrutor -->
         <div class="row mb-3">
        <div class="col-md-6 ">

          <label for="instructorsByTime" class="form-label">instrutores</label>
            <input type="text" name="instructorsByTime" class="form-control" data-instructor="instrutor"/>
 
          </div>

          <div class="col-md-6">                
            <label for="instructorsByTime" class="form-label">horario</label>
            <input type="time" name="instructorsByTime" class="form-control" data-instructor="horario"/>
          
          </div>
        </div>
        <!-- linha 6 - datas em dias - -->
        
            <div class="row mb-3">
                <div class="col-md-6">

                    <label for="limitStudents" class="form-label">dias que nao abrem</label>
        </div>
      
                    <label for="limitStudents" class="form-label">feriados</label>
                    <input type="date" class="form-control" id="limitStudents" min="1" placeholder="Ex: 20" name="holidays">
                    
                    <label for="limitStudents" class="form-label">recessos</label>
                    <input type="date" class="form-control" id="limitStudents" min="1" placeholder="Ex: 20" name="recesses">
                    </div>
         

      <button type="submit" class="btn btn-success start-50 w-100 mx-5r"> salvar </button>
    </form>
  </div>
    `)
  }
    
    closeform()
    saveform()
}