/// <reference path="../../typings/index.d.ts" />

declare function require(moduleName: string): any;

import {join} from "path";
import {env, Callback} from "jsdom";
import {expect} from "chai";
import * as fs from "fs";
import {Application as App} from "./main";

describe('Application tests', function () {
    const html = fs.readFileSync(join(__dirname, 'index.html'), 'utf8');
    let app : App;

    /*
    beforeEach(function () {
        app = new Application(".greeting");
    });
    */

    it('check innerHTML', (done) => {
        env({
            html: html,
            src: [],
            done: (err, window) => {
                let Application: typeof App = require("./main");
                app = new Application('.greeting');
                app.showHello('TypeScript!');
                
                const el = <HTMLElement>document.querySelectorAll('.greeting')[0];
                expect(el.innerHTML).to.be.eq('TypeScript!');
    
                window.close();
                done();
            }
        });
    })
});