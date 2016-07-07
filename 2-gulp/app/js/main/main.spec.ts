import "../../../typings/index.d.ts";

import {expect} from "chai";
import Application from "./main";

declare function require(moduleName:string):any;

describe('Application tests', function () {
    let app:Application;
    let cleanup:Function;

    beforeEach(function () {
        // setup the simplest document and window
        cleanup = require("jsdom-global")();
    });

    afterEach(function () {
        cleanup();
    });

    it('check innerHTML', (done) => {
        app = new Application('.greeting');
        app.showHello('TypeScript!');

        const el = <HTMLElement>document.querySelectorAll('.greeting')[0];
        expect(el.innerHTML).to.be.eq('TypeScript!');

        done();
    })
});