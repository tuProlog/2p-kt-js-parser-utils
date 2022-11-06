const ParsingUtils = require("../index.js");


if (ParsingUtils.Associativity === undefined) {
    throw "missing reference to Associativity";
}

if (ParsingUtils.DynamicLexer === undefined) {
    throw "missing reference to DynamicLexer";
}

if (ParsingUtils.DynamicParser === undefined) {
    throw "missing reference to DynamicParser";
}

if (ParsingUtils.StringType === undefined) {
    throw "missing reference to StringType";
}

if (ParsingUtils.PrologLexer === undefined) {
    throw "missing reference to PrologLexer";
}

if (ParsingUtils.PrologParser === undefined) {
    throw "missing reference to PrologParser";
}

if (ParsingUtils.PrologParserListener === undefined) {
    throw "missing reference to PrologParserListener";
}

if (ParsingUtils.PrologParserVisitor === undefined) {
    throw "missing reference to PrologParserVisitor";
}
