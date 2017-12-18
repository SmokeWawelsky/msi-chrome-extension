const parsers = {
  java: require('./javaParser')
};

exports.findFor = function(fileName) {
  const type = ext(fileName);
  const parser = parsers[type];
  return parser
    ? Promise.resolve(parser)
    : Promise.reject(`No parser for '${type}' (${fileName})`);
};

const extRx = /^.+\.([^.]+)$/;
function ext(fileName) {
  const m = extRx.exec(fileName);
  return m ? m[1] : fileName;
}
