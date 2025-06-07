
export function editStudio(){
    const $btn = document.querySelector("#editar")
     const $id = document.querySelector("#id").textContent.trim("")
    $btn.addEventListener("click",()=>alert(`rapaziada do back, vamo estar fazendo o PUT de estudio ai o caba quer editar o: ${$id}`))
}