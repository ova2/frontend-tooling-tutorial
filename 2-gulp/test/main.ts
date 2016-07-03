/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/modules/chai/index.d.ts" />
import {expect} from "chai";

describe('mocha tests', function () {

    it('has document', function () {
        var div = document.createElement('div');
        expect(div.nodeName).eql('DIV')
    })
});