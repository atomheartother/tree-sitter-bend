"def" @keyword
"return" @keyword
"object" @keyword
"if" @keyword
"else" @keyword
"switch" @keyword
"match" @keyword
"case" @keyword
"type" @keyword
"open" @keyword
"fold" @keyword
"bend" @keyword
"when" @keyword

(function_declaration name: (identifier) @function)
(function_call name: (identifier) @function)
(type_declaration name: (identifier) @type)
(type_name (identifier) @type)
(string) @string
(number) @number
