module.exports = function capturePageInfo(data) {
  const doc = window.document.documentElement;
  const body = window.document.body;
  const originalX = window.scrollX;
  const originalY = window.scrollY;

  // const originalBodyOverflowYStyle = body ? body.style.overflowY : '';
  // const originalOverflowStyle = doc.style.overflow;

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

  const response = {
    dimensions: {
      fullWidth, fullHeight,
      windowWidth, windowHeight,
      devicePixelRatio: window.devicePixelRatio,
      originalX, originalY,
    },
    elements: data.selectors.map((selector) => {
      const element = window.document.querySelector(selector);
      if (element) {
        let { x, y, width, height } = element.getBoundingClientRect();
        x += originalX;
        y += originalY;
        return { selector, x, y, width, height };
      } else {
        return { selector };
      }
    })
  };

  // doc.style.overflow = originalOverflowStyle;
  // if (body) body.style.overflowY = originalBodyOverflowYStyle;

  return response;
};
