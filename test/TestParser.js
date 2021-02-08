import antlr4 from "antlr4";
import { PrologLexer } from "../index.js";
import { PrologParser } from "../index.js";
const CommonTokenStream = antlr4.CommonTokenStream
const CharStreams = antlr4.CharStreams

let input = "f(X)";
let chars = CharStreams.fromString(input);
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
