import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json'));
console.log(packageJson['version']);
