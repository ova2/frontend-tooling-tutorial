import Greeting from "../greeting/greeting";

export default class Application {

    private selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    public showHello(text: string) {
        let nodeList = document.querySelectorAll(this.selector);
        if (nodeList && nodeList.length > 0) {
            // cast generic Element to HTMLElement because the result can be SVGElement, etc. too
            const el = <HTMLElement> nodeList[0];
            if (el) {
                el.innerText = Greeting.sayHello(text);
            }
        }
    }
}
