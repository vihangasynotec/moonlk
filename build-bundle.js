const fs = require('fs');
const path = require('path');

// 1. Read CSS files
const mainCss = fs.readFileSync(path.join(__dirname, 'css', 'main.css'), 'utf8');
const compCss = fs.readFileSync(path.join(__dirname, 'css', 'components.css'), 'utf8');
const sectCss = fs.readFileSync(path.join(__dirname, 'css', 'sections.css'), 'utf8');
const respCss = fs.readFileSync(path.join(__dirname, 'css', 'responsive.css'), 'utf8');
const bundledCss = [mainCss, compCss, sectCss, respCss].join('\n\n');

// 2. Read logo as Base64 Data URI
const logoBuffer = fs.readFileSync(path.join(__dirname, 'assets', 'logo.jpeg'));
const logoDataUri = `data:image/jpeg;base64,${logoBuffer.toString('base64')}`;

// 3. Read JS files
const dataJs = fs.readFileSync(path.join(__dirname, 'js', 'data.js'), 'utf8');
const stateJs = fs.readFileSync(path.join(__dirname, 'js', 'state.js'), 'utf8');
const uiJs = fs.readFileSync(path.join(__dirname, 'js', 'ui.js'), 'utf8');
const shopJs = fs.readFileSync(path.join(__dirname, 'js', 'shop.js'), 'utf8');
const checkoutJs = fs.readFileSync(path.join(__dirname, 'js', 'checkout.js'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf8');
const bundledJs = [dataJs, stateJs, uiJs, shopJs, checkoutJs, appJs].join('\n\n');

// 4. Read index.html
let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Replace logo references with data URI + fallback
html = html.split('src="assets/logo.jpeg"').join(`src="${logoDataUri}"`);
html = html.split('href="assets/logo.jpeg"').join(`href="${logoDataUri}"`);

// Replace <link rel="stylesheet" ...> with <style>
const cssLinkRegex = /<!-- Stylesheets -->[\s\S]*?<link rel="stylesheet" href="css\/responsive\.css">/;
const inlineStyleBlock = `<!-- Embedded Self-Contained Stylesheet for 100% Server Compatibility -->
  <style>
${bundledCss}
  </style>`;

if (cssLinkRegex.test(html)) {
  html = html.replace(cssLinkRegex, inlineStyleBlock);
} else {
  // If not found, insert before </head>
  html = html.replace('</head>', `${inlineStyleBlock}\n</head>`);
}

// Replace external <script src="js/..."> with <script>
const jsScriptsRegex = /<!-- JavaScript Modules -->[\s\S]*?<script src="js\/app\.js"><\/script>/;
const inlineJsBlock = `<!-- Embedded Self-Contained Application Scripts -->
  <script>
${bundledJs}
  </script>`;

if (jsScriptsRegex.test(html)) {
  html = html.replace(jsScriptsRegex, inlineJsBlock);
} else {
  html = html.replace('</body>', `${inlineJsBlock}\n</body>`);
}

fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('Successfully bundled self-contained index.html! All styles, scripts, and logos are embedded directly.');
