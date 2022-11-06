import fs from 'fs';
import https from 'https';
import { spawnSync } from 'child_process';

function getAntlrVersion() {
    const packageJson = JSON.parse(fs.readFileSync('./package.json'));
    let antlrVersion = ("x-versions" in packageJson && "antlr" in packageJson["x-versions"])
        ? packageJson['x-versions']['antlr']
        : packageJson['dependencies']['antlr4'];
    const versionPattern = /(\d+).(\d+).(\d+)/;
    if (versionPattern.test(antlrVersion)) {
        const versionNumbers = antlrVersion.match(versionPattern).slice(1);
        antlrVersion = versionNumbers.join(".");
    } else {
        throw new Error("Invalid ANTLR4 version: " + antlrVersionRaw);
    }
    if (antlrVersion.endsWith(".0")) {
        return antlrVersion.substring(0, antlrVersion.length - 2);
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

function runInShell(cmd, args) {
    const result = spawnSync(cmd, args, { shell: true });
    console.log(`Running \`${cmd} ${args.join(" ")}\`: ${result.status}`)
    if (result.error != null) {
        throw error;
    }
    const output = result.stdout.toString('utf8').trimEnd();
    if (output.length > 0) {
        console.log(`  > ${output.replace("\n", "\n  > ")}`);
    }
    const error = result.stderr.toString('utf8').trimEnd();
    if (error.length > 0) {
        console.log(`  > ${error.replace("\n", "\n  > ")}`);
    }
}

function runAntlr(path) {
    const args = ['-jar', path, '-visitor', '-o', 'src-gen', '-Dlanguage=JavaScript'];
    runInShell('java', args.concat(['antlr/PrologLexer.g4']));
    runInShell('java', args.concat(['-lib', 'src-gen/antlr', 'antlr/PrologParser.g4']));
    runInShell('mv', ['src-gen/antlr/*', 'src-gen/']);
}

downloadAntlr(getAntlrVersion(), "antlr.jar", runAntlr);
