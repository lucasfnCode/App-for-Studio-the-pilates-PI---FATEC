import { getOrCreateMainElement } from "../../../components/main";
import { callFormInstrutor } from "../components/newInstrutorForm";

export function createlistinstrutor(){

    const $list = `
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>---</th>
                    <th>instrutor</th>
                    <th>telefone</th>
                    <th>açoes</th>
                </tr>
            </thead>
            <tbody id="tr">
                <tr>
                
                </tr>
            </tbody>
        </table>
            <button id="new"> novo instrutor</button>
    `
    const main = getOrCreateMainElement()
    main.insertAdjacentHTML("afterbegin",$list)
    listarInstrutores();
    const $newbtn = document.getElementById("new")

    $newbtn.addEventListener("click",() => callFormInstrutor())
    // todo ta podendo criar varios forms de mesma coisa tem q ver isso ai
}

async function listarInstrutores(){
    const response = await fetch("http://localhost:8080/instructors",{
        method:"GET",
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
        }
    })
    const result = await response.json();
    result.forEach(element => {
        insertinlist(element)
    });
}
function insertinlist(aluno){
    const tr = document.getElementById("tr")
    const $aluno = `
    <tr>
        <td>
            <img src="${aluno.photo}">
        </td>
        <td>
             nome :${aluno.name} 
            <br>
            email: ${aluno.email}
            <br>
            id: ${aluno.id}
        </td>
        <td>${aluno.contact}</td>
        <td>
            <button class="btn btn-sm btn-primary">Editar</button>
            <button class="btn btn-sm btn-info">Ver</button>
            <button class="btn btn-sm btn-danger">Excluir</button>
        </td>
    </tr>
    `
    tr.insertAdjacentHTML("afterbegin",$aluno)
}
