const fs = require('fs');
const path = require('path');
const csso = require('csso');
const main = fs.readFileSync(path.resolve(__dirname + '/assets/main.css'), 'utf-8');
const generator = fs.readFileSync(path.resolve(__dirname + '/dist/generator.css'), 'utf-8');
const content = generator + main;
let css = csso.minify(content).css;
if (!fs.existsSync(__dirname + "/dist/css")){
  fs.mkdirSync(__dirname + "/dist/css");
}
fs.writeFileSync(path.resolve(__dirname + '/dist/css/generator.min.css'), css, { flag: 'w+' });
