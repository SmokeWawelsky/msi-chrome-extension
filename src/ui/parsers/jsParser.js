const RX = /this\.([^ =]+) *= *element\(by\.([A-Za-z]+)\("([^"]+)"\)\)/mg;

exports.parse = function(content, file) {
  const elements = findElements(content);
  adjustSelectors(elements);
  return {
    // namespace: parsePackage(result.package),
    name: file.name.substring(0, file.name.length - 3),
    elements
  };
};

function findElements(content) {
  const elements = [];
  let m = RX.exec(content);
  while (m) {
    elements.push({
      name: m[1],
      selector: {
        type: m[2],
        value: m[3]
      }
    });
    m = RX.exec(content);
  }
  return elements;
}

function adjustSelectors(elements) {
  elements.forEach((element) => {
    if (element.selector.type === 'id') {
      element.selector.type = 'css';
      element.selector.value = `#${element.selector.value}`;
    }
  });
}
