
import { createStudio } from "../../service/service"

export async function saveform(){
    const $form = document.querySelector("#cardInfoForm")
    window.addEventListener("DOMContentLoaded",()=>{
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
            
            const $formContainer = document.querySelector("#studios-row")
            $formContainer.innerHTML= "";
            await createStudio(data)
        })
    })
}

