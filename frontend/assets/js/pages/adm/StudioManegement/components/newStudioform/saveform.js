import { MainReload } from "../../../function/reloadmain"
import { createStudio } from "../../service/service"
import { StudioManegementPage } from "../../StudioManegement"
import { closeform } from "./closeform"

export function saveform(){
    const $form = document.querySelector("#cardInfoForm")
    const form = new FormData($form)
    const data = Object.fromEntries(form.entries())
    data.isActive = true

window.addEventListener("submit",async(e)=>
{
    e.preventDefault()
    console.log("estudio q esta sendo enviado pro back via post:",data);
    await createStudio(data)
    MainReload("studios-row")
    close
    StudioManegementPage()
})
}