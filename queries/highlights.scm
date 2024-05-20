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
"bend" @keyword
"when" @keyword
"lambda" @keyword

(function_declaration name: (identifier) @function)
(function_call name: (identifier) @function)
(builtin_function) @function.builtin
(type_declaration name: (identifier) @type)
(type_name (identifier) @type)
(string) @string
(number) @number
(field_assignment name: (identifier) @attribute)
(object_property) @attribute
(variable property: (identifier) @property)

"-" @operator
"=" @operator
"!=" @operator
"*" @operator
"**" @operator
"&&" @operator
"+" @operator
"<" @operator
"<=" @operator
">=" @operator
"==" @operator
">" @operator
"||" @operator

"." @delimiter

(comment) @comment
