import "../../../typings/index.d.ts";

import {expect} from "chai";
import * as sinon from "sinon";
import Application from "./main";
import Greeting from "./../greeting/greeting";

declare function require(moduleName:string):any;

describe('Application tests', function () {
    let app:Application;
    let cleanup:Function;
    let nodeList:Array<HTMLElement>;
    let node:HTMLElement;

    beforeEach(function () {
        // setup the simplest document and window
        cleanup = require("jsdom-global")();
    });

    afterEach(function () {
        cleanup();
    });

    it('check existing innerHTML', (done) => {
        // setup mocks
        node = require("jsdom/lib/jsdom/living/generated/HTMLElement");
        nodeList = [node];
        
        sinon.stub(document, 'querySelectorAll').withArgs('.greeting').returns(nodeList);

        // execute logic
        app = new Application('.greeting');
        app.showHello('TypeScript!');

        // verify
        //const el = <HTMLElement>document.querySelectorAll('.greeting')[0];
        expect(node.innerText).to.be.eq(Greeting.sayHello('TypeScript!'));

        done();
    })
});