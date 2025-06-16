export function closeform(){
    const $btn = document.querySelector("#close")
    $btn.addEventListener("click",()=>{
      const $form = document.querySelector("#newformcon")
      $form.innerHTML= ``;
      $form.remove()
  })
  document.addEventListener("submit",()=>{
    const $form = document.querySelector("#newformcon")
      $form.innerHTML= ``;
      $form.remove()
  })
}