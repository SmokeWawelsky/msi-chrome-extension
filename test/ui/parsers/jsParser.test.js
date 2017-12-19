const fs = require('fs');
const expect = require('chai').expect;
const debug = require('debug')('msi:test:jsParser');

const parsers = require('../../../src/devtools/parsers');
const jsParser = require('../../../src/devtools/parsers/jsParser');

const JS_FILE_NAME = 'TestPageObject.js';
const JS_FILE = `${__dirname}/${JS_FILE_NAME}`;

describe('devtools/parsers', function() {
  describe('jsParser', function() {

    it('should find javascript parser', function(done) {
      parsers.findFor(JS_FILE_NAME).then((parser) => {
        expect(parser.parse).to.be.a('Function');
        done();
      });
    });

    it('should parse javascript page object file', function() {
      const object = jsParser.parse(readFile(JS_FILE), { name: JS_FILE_NAME });
      debug(JSON.stringify(object, null, 2));
      // expect(object.namespace).to.equal('com.bank.app.pageObject.msuite');
      expect(object.name).to.equal('TestPageObject');
      expect(object.elements).to.have.lengthOf(4);
      expect(object.elements[0].name).to.equal('userMresearch');
      expect(object.elements[0].selector.type).to.equal('css');
      expect(object.elements[0].selector.value).to.equal('#p_Username');
      expect(object.elements[3].name).to.equal('clientLogoMresearch');
      expect(object.elements[3].selector.type).to.equal('xpath');
      expect(object.elements[3].selector.value).to.equal("//div[contains(@class,'app-logo')]");
    });

  });
});

function readFile(name) {
  return fs.readFileSync(name, { encoding: 'utf8' });
}
