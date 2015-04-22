var clopp  = require('../../lib/clopp.js');
var grunt  = require('grunt');
var expect = require('chai').expect;

describe("Clopp library tests", function() {

    describe("setContext", function() {

        it("test testcase :-)", function () {
            var output = clopp.setContext({}, grunt);

            expect(output).to.equal(undefined);
        });
    });
});