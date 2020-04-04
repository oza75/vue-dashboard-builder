const fs = require('fs');
const path = require('path');
const csso = require('csso');
const main = fs.readFileSync(path.join(__dirname, '/assets/main.css'), 'utf-8');
const generator = fs.readFileSync(path.join(__dirname, '/dist/generator.css'), 'utf-8');
const content = generator + main;
const css = csso.minify(content).css;
if (!fs.existsSync(path.join(__dirname, '/dist/css'))) {
  fs.mkdirSync(path.join(__dirname, '/dist/css'));
}
fs.writeFileSync(path.join(__dirname, '/dist/css/generator.min.css'), css, { flag: 'w+' });
