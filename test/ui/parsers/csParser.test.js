const fs = require('fs');
const expect = require('chai').expect;
const debug = require('debug')('msi:test:csParser');

const parsers = require('../../../src/devtools/parsers');
const csParser = require('../../../src/devtools/parsers/csParser');

const CS_FILE_NAME = 'TestPageObject.cs';
const CS_FILE = `${__dirname}/${CS_FILE_NAME}`;

describe('devtools/parsers', function() {
  describe('csParser', function() {

    it('should find c# parser', function(done) {
      parsers.findFor(CS_FILE_NAME).then((parser) => {
        expect(parser.parse).to.be.a('Function');
        done();
      });
    });

    it('should parse c# page object file', function() {
      const object = csParser.parse(readFile(CS_FILE), { name: CS_FILE_NAME });
      debug(JSON.stringify(object, null, 2));
      expect(object.namespace).to.equal('ModernSurvey.Tests.Regression.Pages.Heat');
      expect(object.name).to.equal('FilterGroupPage');
      expect(object.elements).to.have.lengthOf(22);
      expect(object.elements[0].name).to.equal('TimeTrendSelection');
      expect(object.elements[0].selector.type).to.equal('xpath');
      expect(object.elements[0].selector.value).to.equal("//div[@tour-target-id='FilterTimeFrame']");
      expect(object.elements[21].name).to.equal('SelectItemsOnly');
      expect(object.elements[21].selector.type).to.equal('xpath');
      expect(object.elements[21].selector.value).to.equal("(//input[@name='selectAllDescendants'])[2]");
    });

  });
});

function readFile(name) {
  return fs.readFileSync(name, { encoding: 'utf8' });
}
