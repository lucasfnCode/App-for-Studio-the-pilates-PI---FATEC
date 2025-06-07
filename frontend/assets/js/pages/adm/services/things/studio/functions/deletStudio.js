export function deletStudio(){
    const $btn = document.querySelector("#delet")
    const $id = document.querySelector("#id").textContent.trim("")
    $btn.addEventListener("click",async () => {
               fetch(`http://localhost:8080/studios/${$id}`,{
                    method : "DELETE",
                    redirect: "follow"
                })
        alert("estudio excluido")
        location.hash = "#gerencia"
    })
} 
