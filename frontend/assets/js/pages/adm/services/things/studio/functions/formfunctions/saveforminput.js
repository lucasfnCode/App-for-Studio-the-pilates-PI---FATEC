async function POST(bodyrequest) {
    try{
        const $form = document.querySelector("#formsec")

        fetch("http://localhost:8080/studios",{
            method : "POST",   
            headers : { 'Content-Type': 'application/json'},
            body : JSON.stringify(bodyrequest)
        })
        location.hash = "#home"
        alert("studio criado com sucesso")
        
        $form.remove()
    }catch(error){
        console.log(error);
        return error
        
    }
}
export  function savePOSTform(){
    
        
        window.addEventListener("submit",(e) =>{
            e.preventDefault()
            const $form = document.querySelector("#form")
            const form = new FormData($form)
            const data = Object.fromEntries(form.entries());

            data.unavailableTimes = []
            data.instructorsByTime = {}

            data.daysOperation = form.getAll("daysOperation")
            data.openingHours = data.openingHours.split("\n")
            data.holidays = data.holidays.split("\n")
            data.recesses = data.recesses.split("\n")
            data.isActive = true

        
            const $bnt = document.querySelector("#save")
            $bnt.addEventListener("click",POST(data))

        })
}
