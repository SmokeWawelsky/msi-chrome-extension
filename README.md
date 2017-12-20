# MSI Chrome DevTools Extension

## Requirements

 * node.js v6
 * npm v3

## Installing

    npm install

## Testing

    npm run test
    npm run test:watch

## Building

    npm run build
    npm run dev

Then load the `chrome-extension` folder as an unpacked extension
([see this guide](https://developer.chrome.com/extensions/getstarted#unpacked)).

If it worked, you should see a "MSI" tab in your developer tools when you next open them.

## Bundles

### `devtools`

The one that provides React UI that is added to a Chrome Devtools.
It is aware of other bundles and orchestrates their function,
i.e. it injects the `agent` bundle into target page
and uses `documentation` bundle to build a html documentation page during export.

### `agent`

The one that is injected into target page.
It performs target page measurements and scrolling requested by the `devtools`.

### `documentation`

The one that ends up in an exported documentation page.
It provides React UI that facilitates navigation of captured screenshots & elements.
