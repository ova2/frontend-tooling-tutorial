import "../../../typings/index.d.ts";

import {expect} from "chai";
import * as sinon from "sinon";
import Application from "./main";
import Greeting from "./../greeting/greeting";

declare function require(moduleName: string): any;

describe("Application tests", function () {
    let app: Application;
    let cleanup: Function;

    beforeEach(function () {
        // setup the simplest document and window
        cleanup = require("jsdom-global")();
    });

    afterEach(function () {
        cleanup();
    });

    it("greeting should be present in the DOM for valid selector", (done) => {
        // setup mocks
        let node: any = {};
        let nodeList: [any] = [node];

        sinon.stub(document, "querySelectorAll").withArgs(".greeting").returns(nodeList);

        // execute logic
        app = new Application(".greeting");
        app.showHello("TypeScript!");

        // verify
        expect(node.innerText).to.be.eq(Greeting.sayHello("TypeScript!"));

        done();
    });
});
