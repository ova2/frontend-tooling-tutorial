import {sayHello} from "./greeting";

function showHello(selector:string, name:string) {
    const el = <HTMLElement>document.querySelectorAll(selector)[0];
    el.innerText = sayHello(name);
}

showHello(".greeting", "TypeScript!");
