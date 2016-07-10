import "../../../typings/index.d.ts";

import {expect} from "chai";
import Greeting from "./greeting";

describe("Greeting tests", function () {

    it("check greeting with parameter", () => {
        let greeting = Greeting.sayHello("TypeScript!");

        expect(greeting).to.be.eq("Hello from TypeScript!");
    });

    it("check greeting without parameter", () => {
        let greeting = Greeting.sayHello();

        expect(greeting).to.be.eq("Hello from World!");
    });
});
