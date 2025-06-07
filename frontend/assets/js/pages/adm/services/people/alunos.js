import { getOrCreateMainElement } from "../../../../components/main";
import { callformsAlunos } from "../../components/newalunoForm";

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
    const response = await fetch("http://localhost:8080/alunos")
    const result = await response.json();
    result.forEach(element => {
        const alunos =  element
        insertinlist(element)
    });
}
async function insertinlist(aluno){
    const tr = document.getElementById("tr")

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

    function excloiraluno(){
        const $deletbtn = document.querySelectorAll(".btn-danger").forEach(btn =>{
            btn.addEventListener("click", ()=>console.log(btn.closest("tr").innerHTML))
        })
    }excloiraluno();
    tr.insertAdjacentHTML("afterbegin",$aluno)
}