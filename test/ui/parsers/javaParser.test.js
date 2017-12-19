const fs = require('fs');
const expect = require('chai').expect;
const debug = require('debug')('msi:test:javaParser');

const parsers = require('../../../src/devtools/parsers');
const javaParser = require('../../../src/devtools/parsers/javaParser');

const JAVA_FILE_NAME = 'TestPageObject.java';
const JAVA_FILE = `${__dirname}/${JAVA_FILE_NAME}`;

describe('devtools/parsers', function() {
  describe('javaParser', function() {

    it('should find java parser', function(done) {
      parsers.findFor(JAVA_FILE_NAME).then((parser) => {
        expect(parser.parse).to.be.a('Function');
        done();
      });
    });

    it('should parse java page object file', function() {
      const object = javaParser.parse(readFile(JAVA_FILE));
      debug(JSON.stringify(object, null, 2));
      expect(object.namespace).to.equal('com.bank.app.pageObject.msuite');
      expect(object.name).to.equal('AdminPage');
      expect(object.elements).to.have.lengthOf(18);
      expect(object.elements[0].name).to.equal('m360AdminLink');
      expect(object.elements[0].selector.type).to.equal('xpath');
      expect(object.elements[0].selector.value).to.equal("//ul[@class='app-nav__primary']//li//a[contains(@href,'/m360Admin')]");
    });

  });
});

function readFile(name) {
  return fs.readFileSync(name, { encoding: 'utf8' });
}
