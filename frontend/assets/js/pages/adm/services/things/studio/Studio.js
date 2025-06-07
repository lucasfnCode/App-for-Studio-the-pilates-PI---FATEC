import { getOrCreateMainElement } from "../../../../../components/main";

export async function getallstudio(){
    try{
        const response = await fetch("http://localhost:8080/studios")
        const result  = await response.json();
        result.forEach(element => {
            createstudio(element)
        });
    }catch(error){
        console.log(error);
        return error
    }
}
function createstudio(studio){ 
    const $section = document.querySelector("#studios-row")
    if($section){
        const $studicard = `
        <a href="#studio-${studio.id}">
            <section class="d-inline-flex">
            <p class="bg-secondary   p-5">
                        ${studio.name}
            </p>
            </section>
        </a>
        `
        $section.insertAdjacentHTML("afterbegin",$studicard)
    }
}