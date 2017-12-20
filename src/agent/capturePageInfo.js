module.exports = function capturePageInfo(data) {
  // const originalBodyOverflowYStyle = document.body ? document.body.style.overflowY : '';
  // const originalOverflowStyle = document.documentElement.style.overflow;

  const info = measure();
  const elements = {};

  measureElements(data.elements).forEach(([ name, coords ]) => {
    elements[name] = {
      x: Math.round(coords.x + info.originalX),
      y: Math.round(coords.y + info.originalY),
      width: Math.round(coords.width),
      height: Math.round(coords.height)
    };
  });

  const response = { info, elements };

  // document.documentElement.style.overflow = originalOverflowStyle;
  // if (document.body) document.body.style.overflowY = originalBodyOverflowYStyle;

  return response;
};

function measure() {
  const doc = document.documentElement;
  const body = document.body;
  const originalX = window.scrollX;
  const originalY = window.scrollY;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const fullWidth = Math.max(
    doc.clientWidth,
    body ? body.scrollWidth : 0,
    doc.scrollWidth,
    body ? body.offsetWidth : 0,
    doc.offsetWidth
  );
  const fullHeight = Math.max(
    doc.clientHeight,
    body ? body.scrollHeight : 0,
    doc.scrollHeight,
    body ? body.offsetHeight : 0,
    doc.offsetHeight
  );

  return {
    uri: window.location.href,
    fullWidth, fullHeight,
    windowWidth, windowHeight,
    devicePixelRatio: window.devicePixelRatio,
    originalX, originalY,
  };
}

function measureElements(elements) {
  return elements
    .map((e) => [ e.name, findElementCoords(e.selector) ])
    .filter(([ , coords ]) => coords);
}

const findBy = {
  css(cssSelector) {
    return document.querySelector(cssSelector);
  },
  xpath(xpathSelector) {
    return document.evaluate(xpathSelector, document, null, XPathResult.ANY_TYPE, null).iterateNext();
  }
};

function findElementCoords(selector) {
  const element = findBy[selector.type](selector.value);
  return element && element.getBoundingClientRect();
}
