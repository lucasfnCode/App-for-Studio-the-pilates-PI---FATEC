import { getOrCreateMainElement } from "../../../../../../components/main";
import { editStudio } from "../components/editStudioPage";
import { deletStudio } from "./deletStudio";


export async function getStudioById(id) {
     
        const response = await fetch(`http://localhost:8080/studios/${id}`);
        const result = await response.json();
        createviewStudio(result)

}

async function createviewStudio(studio) {
    
    await studio;
    if (!studio) {
        return `
            <section class="container">
                <h1>Studio não encontrado</h1>
                <p>Não foi possível carregar as informações do studio.</p>
            </section>
        `;
    }

    const $studioabout = `
    <section class="${studio.id}">
        <section class="container">
            <section class="position-relative start-100">
                <button class="btn btn-info" id="editar"> editar </button>
                <button class="btn btn-danger" id="delet"> excluir</button>
            </section>
            <h1>${studio.name || 'Nome não disponível'}</h1>
          
            <h2>${studio.address || 'Endereço não disponível'}</h2>
            <p>Abre às: ${studio.openingHours || 'Horário não disponível'}</p>
            <p>Capacidade máxima de pessoas: ${studio.limitStudentsPerClass || 'Não informado'}</p>
        </section>

        <section class="container">
            <h2>Dias de operação</h2>
            <section>
                ${studio.daysOperation ? studio.daysOperation.join(', ') : 'Não informado'}
            </section>

            <h3>Dias que não abre</h3>
            <p>${studio.holidays || 'Não informado'}</p>
            <p>${studio.recesses || 'Não informado'}</p>
            <h6 class="h6 small" id="id">
                ${studio.id}
            </h6>
        </section>
      
    </section>
    `;
    
    const $main = getOrCreateMainElement();
    $main.insertAdjacentHTML("afterbegin", $studioabout);

    editStudio()
    deletStudio()
}
