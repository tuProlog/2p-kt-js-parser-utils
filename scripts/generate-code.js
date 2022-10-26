import fs from 'fs';
import https from 'https';
import { spawnSync } from 'child_process';

function getAntlrUrl() {
    const packageJson = JSON.parse(fs.readFileSync('./package.json'));
    let antlrVersion = packageJson['dependencies']['antlr4'];
    const versionPattern = /(\d+).(\d+).(\d+)/;
    if (versionPattern.test(antlrVersion)) {
        const versionNumbers = antlrVersion.match(versionPattern).slice(1);
        antlrVersion = versionNumbers.join(".");
    } else {
        throw new Error("Invalid ANTLR4 version: " + antlrVersionRaw);
    }
    return antlrVersion;
}

function downloadAntlr(version, path, continuation) {
    const url = `https://www.antlr.org/download/antlr-${version}-complete.jar`
    const actualPath = path.replace(".", "-" + version + ".")
    if (fs.existsSync(actualPath)) {
        console.log(`File ${actualPath} already exists!`)
        continuation(actualPath);
    } else {
        const file = fs.createWriteStream(actualPath);
        https.get(url, res => {
            res.pipe(file);
            res.on('end', () => {
                console.log(`Downloaded ${actualPath}`)
                continuation(actualPath);
            });
        });
    }
}

function runAntlr(path) {
    const args = ['-jar', path, '-visitor', '-o', 'src-gen', '-Dlanguage=JavaScript'];
    var result = spawnSync('java', args.concat(['antlr/PrologLexer.g4']), { shell: true });
    if (result.error != null) {
        throw error;
    }
    console.log(result.stdout.toString('utf8'));
    result = spawnSync('java', args.concat(['-lib', 'src-gen/antlr', 'antlr/PrologParser.g4']), { shell: true });
    if (result.error != null) {
        throw error;
    }
    console.log(result.stdout.toString('utf8'));
    result = spawnSync('mv', ['src-gen/antlr/*', 'src-gen/'], { shell: true });
    if (result.error != null) {
        throw error;
    }
    console.log(result.stdout.toString('utf8'));
}

downloadAntlr(getAntlrUrl(), "antlr.jar", runAntlr);
