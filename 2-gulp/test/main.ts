/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/jquery/index.d.ts" />
/// <reference path="../typings/globals/jsdom/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />
/// <reference path="../typings/globals/node/index.d.ts" />

import {env, Callback} from "jsdom";
import {expect} from "chai";
import * as fs from "fs";
import {Application} from "../app/js/main";

describe('Application tests', function () {
    var jsdomWrap = (() => {
        var html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
        
        return (cb:Callback) => {
            env({
                html: html,
                src: [],
                done: cb
            });
        };
    })();
    
    var app : Application;

    /*
    beforeEach(function () {
        app = new Application(".greeting");
    });
    */

    it('check innerHTML', (done) => {
        jsdomWrap((err, window) => {
            app = new Application('.greeting');
            app.showHello('TypeScript!');
            
            const el = <HTMLElement>document.querySelectorAll('.greeting')[0];
            expect(el.innerHTML).to.be.eq('TypeScript!');

            window.close();
            done();
        });
    })
});