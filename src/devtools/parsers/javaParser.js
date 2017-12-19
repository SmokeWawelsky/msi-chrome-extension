const japa = require('java-parser');

exports.parse = function(content) {
  const result = japa.parse(content);
  if (result.node !== 'CompilationUnit') {
    throw new Error('Unexpected parsing result: ' + JSON.stringify(result, null, 2));
  }
  const typeNode = findPublicType(result.types);
  if (!typeNode) {
    throw new Error('No public class found: ' + JSON.stringify(result, null, 2));
  }
  return {
    namespace: parsePackage(result.package),
    name: parseClassName(typeNode),
    elements: findFindByFields(typeNode.bodyDeclarations).map((node) => {
      const findByAnnotation = findFindByAnnotation(node).values[0];
      const selector = findByAnnotation.value.escapedValue;
      return {
        name: findFieldName(node),
        selector: {
          type: findByAnnotation.name.identifier,
          value: selector.substring(1, selector.length - 1)
        }
      };
    })
  };
};

function parsePackage(packageNode) {
  const tokens = [];
  const parseNode = (node) => {
    tokens.unshift(node.name.identifier);
    if (node.qualifier) {
      if (node.qualifier.node !== 'SimpleName')  parseNode(node.qualifier);
      else tokens.unshift(node.qualifier.identifier);
    }
  }
  parseNode(packageNode.name);
  return tokens.join('.');
}

function findPublicType(typeNodes) {
  return typeNodes.find((node) => {
    return !node.interface &&
      node.modifiers.some((mod) => mod.keyword === 'public');
  });
}

function parseClassName(typeNode) {
  return typeNode.name.identifier;
}

function findFindByFields(bodyDeclarations) {
  return bodyDeclarations.filter((node) => {
    return node.node === 'FieldDeclaration' && findFindByAnnotation(node);
  });
}

function findFieldName(fieldNode) {
  return fieldNode.fragments.find((fragment) => {
    return fragment.node === 'VariableDeclarationFragment';
  }).name.identifier;
}

function findFindByAnnotation(fieldNode) {
  return fieldNode.modifiers.find((mod) => {
    return mod.node === 'NormalAnnotation' &&
      mod.typeName.identifier === 'FindBy';
  });
}
