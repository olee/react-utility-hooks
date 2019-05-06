const fs = require('fs');

const packageJson = require('./package.json');
delete packageJson.private;
delete packageJson.scripts;
delete packageJson.devDependencies;

fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, undefined, 2));
