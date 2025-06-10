
import {  savePOSTform } from "./functions/formfunctions/saveforminput";
import { NewStudiForm } from "./functions/FromNewStudio";

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
        <section class="m-2" >
            <a href="#studio-${studio.id}">
                <section class="d-flex">
                <p class="bg-secondary   p-5">
                            ${studio.name}
                </p>
                </section>
            </a>
        </section>
        `
        $section.insertAdjacentHTML("afterbegin",$studicard)
        NewStudiForm()
    }
}