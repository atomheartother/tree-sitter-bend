(comment) @comment @spell

[
  "-"
  "="
  "!="
  "*"
  "**"
  "&&"
  "+"
  "<"
  "<="
  ">="
  "=="
  ">"
  "||"
] @operator

[
 "("
 ")"
 "{"
 "}"
 "["
 "]"
] @punctuation.bracket

"." @delimiter


"def" @keyword
"return" @keyword
"object" @keyword
"if" @keyword
"else" @keyword
"switch" @keyword
"case" @keyword
"type" @keyword
"open" @keyword
"when" @keyword
"lambda" @keyword

"match" @keyword
"fold" @keyword
"bend" @keyword

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
(enum (identifier) @type)
(enum value: (identifier) @property)
