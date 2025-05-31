import { main } from "@popperjs/core"
import { getOrCreateMainElement } from "../../../components/main"

export function createrecepcionistapage(){
    const $recepcionistalist = `
        <h1> tem nao </h1>
    `
    const main = getOrCreateMainElement()
    main.insertAdjacentHTML("afterbegin",$recepcionistalist)
}