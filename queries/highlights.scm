"def" @keyword
"return" @keyword
"object" @keyword
"if" @keyword
"else" @keyword
"switch" @keyword
"match" @keyword
"case" @keyword

(function_declaration name: (identifier) @function)
(function_call name: (identifier) @function)
(type_name (identifier) @type)
(string) @string
