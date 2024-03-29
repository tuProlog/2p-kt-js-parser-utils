import antlr4 from 'antlr4';
import {
    PrologLexer,
    PrologParser,
} from "../index.js";
const CommonTokenStream = antlr4.CommonTokenStream;


let input = "f(X)";
let chars = antlr4.CharStreams.fromString(input);
console.log(chars);
let lexer = new PrologLexer(chars);
console.log(lexer);
let tokens = new CommonTokenStream(lexer);
console.log(tokens);
let parser = new PrologParser(tokens);
parser.buildParseTrees = true;
console.log(parser);
let t = parser.singletonTerm();
console.log(t);
