import { MainReload } from "../../../function/reloadmain"
import { createStudio } from "../../service/service"
import { StudioManegementPage } from "../../StudioManegement"
import { closeform } from "./closeform"

export function saveform(){

window.addEventListener("submit",(e)=>
{
    e.preventDefault()
    const $form = document.querySelector("#cardInfoForm")
    const form = new FormData($form)
    const data = Object.fromEntries(form.entries())
    data.isActive = true
    console.log(data);

    createStudio(data)
    MainReload("studios-row");
    closeform()
    StudioManegementPage()

    
})
}