/// <reference path="../../typings/index.d.ts" />

declare function require(moduleName:string):any;

import {expect} from "chai";
import {Application as App} from "./main";

describe('Application tests', function () {
    let app:App;
    let cleanup:Function;

    beforeEach(function () {      
        // setup the simplest document and window
        cleanup = require("jsdom-global")();
    });
    
    afterEach(function () {
        cleanup();
    });

    it('check innerHTML', (done) => {
        let Application:typeof App = require("./main");
        app = new Application('.greeting');
        app.showHello('TypeScript!');

        const el = <HTMLElement>document.querySelectorAll('.greeting')[0];
        expect(el.innerHTML).to.be.eq('TypeScript!');
        
        done();
    })
});