import {
    Associativity,
    DynamicLexer,
    DynamicParser,
    StringType,
    PrologLexer,
    PrologParser,
    PrologParserListener,
    PrologParserVisitor,
} from "../index.js"


if (Associativity === undefined) {
    throw "missing reference to Associativity";
}

if (DynamicLexer === undefined) {
    throw "missing reference to DynamicLexer";
}

if (DynamicParser === undefined) {
    throw "missing reference to DynamicParser";
}

if (StringType === undefined) {
    throw "missing reference to StringType";
}

if (PrologLexer === undefined) {
    throw "missing reference to PrologLexer";
}

if (PrologParser === undefined) {
    throw "missing reference to PrologParser";
}

if (PrologParserListener === undefined) {
    throw "missing reference to PrologParserListener";
}

if (PrologParserVisitor === undefined) {
    throw "missing reference to PrologParserVisitor";
}
