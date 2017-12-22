const { readFile, saveFile } = require('./fileOperations');

exports.openProject = function(file) {
  return readFile(file)
    .then((content) => JSON.parse(content));
};

exports.saveProject = function(project) {
  const { name, pages } = project;
  const json = JSON.stringify({ name, pages }, null, 2);
  return saveFile(`${project.name}.json`, 'application/json', json);
};
