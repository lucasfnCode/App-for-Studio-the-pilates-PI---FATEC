import { getOrCreateMainElement } from "../../../components/main";
import { callformsAlunos } from "../components/newalunoForm";

export function createlistalunos(){
    const $list = `
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>email</th>
                    <th>id</th>
                    <th>açoes</th>
                </tr>
            </thead>
            <tbody id="tr">
                <tr>
                
                </tr>
            </tbody>
        </table>
        <button id="new"> criar novo aluno </button>
    `
    //adm cria novo aluno, ou aluno cria aluno?
    const main = getOrCreateMainElement()
    main.insertAdjacentHTML("afterbegin",$list)
    listadealunos();
      const $newbtn = document.getElementById("new")
    
    $newbtn.addEventListener("click",() => callformsAlunos())
}

async function listadealunos(){
    const response = await fetch("http://localhost:8080/alunos",{
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
    console.log(aluno);
    
    console.log(aluno.id);
    
    const $aluno = `
    <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.email}</td>
        <td>${aluno.id}</td>
        <td>
            <button class="btn btn-sm btn-primary">Editar</button>
            <button class="btn btn-sm btn-info">Ver</button>
            <button class="btn btn-sm btn-danger">Excluir</button>
        </td>
    </tr>
    `
    tr.insertAdjacentHTML("afterbegin",$aluno)
}