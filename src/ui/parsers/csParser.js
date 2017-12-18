const rx = {
  namespaceAndClass: /namespace ([^ ]+)\s*\{\s*class *([^ ]+)/gm,
  element: /\[FindsBy\(How *= *How\.([^,]+), *Using *= *"([^"]+)"\)\]\s+(?:internal)? *(?:IList<)?IWebElement>? *([^;{]+)/gm
};

exports.parse = function(content) {
  const [ namespace, name ] = findNamespaceAndClass(content);
  const elements = findElements(content);
  return { namespace, name, elements };
};

function findNamespaceAndClass(content) {
  const m = rx.namespaceAndClass.exec(content);
  return m ? [ m[1].trim(), m[2].trim() ] : [];
}

function findElements(content) {
  const elements = [];
  let m = rx.element.exec(content);
  while (m) {
    elements.push({
      name: m[3].trim(),
      selector: {
        type: m[1].trim().toLowerCase(),
        value: m[2]
      }
    });
    m = rx.element.exec(content);
  }
  return elements;
}
