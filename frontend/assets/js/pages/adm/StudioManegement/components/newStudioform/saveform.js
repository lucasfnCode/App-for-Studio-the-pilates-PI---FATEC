import { MainReload } from "../../../function/reloadmain"
import { listarStudios } from "../../service/functions/listar"
import { createStudio } from "../../service/service"
import { closeform } from "./closeform"

export function saveform(){
    const $form = document.querySelector("#cardInfoForm")
    window.addEventListener("submit",async(e)=>
    {
        e.preventDefault()

        
        const form = new FormData($form)
        const data = Object.fromEntries(form.entries())
        data.isActive = true
        data.unavailableTimes = []
        data.instructorsByTime = {}

        const recessos = [data.recesses]
        const feriados = [data.holidays]

        data.daysOperation = form.getAll("daysOperation")
        data.openingHours = data.openingHours.split("\n")
        data.holidays = feriados
        data.recesses = recessos



        console.log("estudio q esta sendo enviado pro back via post:",data);
        
        createStudio(data)
        SoFuncionaDeUmaVez()
    })
}
async function  SoFuncionaDeUmaVez(){
    document.addEventListener("DOMContentLoaded",()=>{

        if(document.querySelector("studios-row")){
        
            
            MainReload("studios-row")
            closeform()
            listarStudios()
        }else{
        window.addEventListener("DOMContentLoaded",)
        }
        
    })
}