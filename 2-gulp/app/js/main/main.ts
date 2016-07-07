import Greeting from "../greeting/greeting";

export default class Application {

    private selector:string;

    constructor(selector:string) {
        this.selector = selector;
    }

    public showHello(text:string) {
        // cast generic Element to HTMLElement because the result can be SVGElement too
        const el = <HTMLElement>document.querySelectorAll(this.selector)[0];
        el.innerText = Greeting.sayHello(text);
    }
}