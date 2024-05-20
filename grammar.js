
function make_list(rule, canBeEmpty = true) {
  if (canBeEmpty)
    return seq(optional(rule), repeat(seq(',', rule)))
  else
    return seq(rule, repeat(seq(',', rule)))
}

module.exports = grammar({
  name: 'bend',

  rules: {
    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.function_declaration,
      $.object_declaration,
      $.type_declaration,
      $.assignment_operation,
      $.function_call,
    ),

    type_declaration: $ => prec.right(seq(
      'type',
      field('name', $.identifier),
      ':',
      repeat1($.object_details)
    )),

    function_declaration: $ => seq(
      'def',
      field('name', $.identifier),
      optional(field('parameters', $.parameter_list)),
      field('body', $.block)
    ),


    parameter_list: $ => seq(
      token.immediate('('),
        make_list($.identifier),
      ')'
    ),

    object_declaration: $ => seq(
      'object',
      $.object_details
    ),

    object_details: $ => seq(
      $.type_name,
      optional($._object_attributes_declaration)
    ),

    _object_attributes_declaration: $ => seq(
      '{',
      make_list($.object_property),
      '}'
    ),

    block: $ => prec.right(seq(
      ':',
      repeat($._statement),
    )),

    _statement: $ => choice(
      $.return_statement,
      $.assignment_operation,
      $.condition,
      $.function_call,
      $.switch,
      $.match,
      $.bend,
      $.open
    ),

    assignment_operation: $ => seq($._lValue, '=', $._rValue),

    condition: $ => prec.right(seq(
      'if',
      $._rValue,
      $.block,
      optional(seq('else', $.block))
    )),

    return_statement: $ => seq(
      'return',
      $._rValue,
    ),

    // You can assign to a variable or destructure to a tuple
    _lValue: $ => choice(
      $.variable,
      seq('(', make_list($.variable, false), ')')
    ),

    _rValue: $ => prec(10, choice(
      $.variable,
      $.string,
      $.number,
      $.object_definition,
      $.enum,
      seq('(', $._rValue, ')'),
      $._binaryOperation,
      $.builtin_function_call,
      $.function_call,
      $.list,
      $.lambda,
      $.tuple,
    )),

    builtin_function_call: $ => seq(
      $.builtin_function,
      token.immediate('('),
      make_list($._rValue),
      ')',
    ),

    builtin_function: $ => choice('fork'),

    function_call: $ => seq(
      field('name', $.identifier),
      token.immediate('('),
      make_list($._rValue),
      ')',
    ),

    bend: $ => seq(
      'bend',
      make_list($.assignment_operation, false),
      ':',
      $.bend_when,
      $.bend_else,
    ),

    lambda: $ => seq(
      'lambda',
      $.identifier,
      repeat(seq(',', $.identifier)),
      ':',
      choice($._statement, $._rValue)
    ),

    bend_when: $ => seq(
      'when',
      $._rValue,
      $.block
    ),
    bend_else: $ => seq(
      'else',
      $.block
    ),

    open: $ => seq(
      'open',
      $.type_name,
      ':',
      $.variable
    ),

    switch: $ => prec.right(seq(
      'switch',
      $._rValue,
      ':',
      repeat1($.switch_case)
    )),

    switch_case: $ => prec.right(seq(
      'case',
      $._rValue,
      $.block
    )),

    match: $ => prec.right(seq(
      choice('match', 'fold'),
      $.identifier,
      ':',
      repeat1($.match_case),
    )),

    match_case: $ => prec.right(seq(
      'case',
      $.type_name,
      $.block,
    )),

    _binaryOperation: $ => choice(
      prec.left(11, seq($._rValue, '&&', $._rValue)),
      prec.left(11, seq($._rValue, '||', $._rValue)),
      prec.left(10, seq($._rValue, '==', $._rValue)),
      prec.left(10, seq($._rValue, '!=', $._rValue)),
      prec.left(10, seq($._rValue, '<', $._rValue)),
      prec.left(10, seq($._rValue, '<=', $._rValue)),
      prec.left(10, seq($._rValue, '>', $._rValue)),
      prec.left(10, seq($._rValue, '>=', $._rValue)),
      prec.right(3, seq($._rValue, '**', $._rValue)),
      prec.left(2, seq($._rValue, '%', $._rValue)),
      prec.left(2, seq($._rValue, '*', $._rValue)),
      prec.left(2, seq($._rValue, '/', $._rValue)),
      prec.left(1, seq($._rValue, '+', $._rValue)),
      prec.left(1, seq($._rValue, '-', $._rValue)),
    ),

    object_definition: $ => prec.right(choice(
      seq(
       $.type_name,
        '{',
          make_list($.field_assignment),
        '}'
      ),
      seq(
        $.type_name,
        '(',
          make_list($._rValue),
        ')'
      )
    )),

    field_assignment: $ => seq(
      field('name', $.identifier),
      ':',
      $._rValue,
    ),

    object_property: $ => choice(
      $.identifier,
      seq(
        field('tilde', '\~'),
        $.identifier
      )
    ),

    variable: $ => seq($.identifier, repeat(seq(token.immediate('.'), field('property', $.identifier)))),

    type_name: $ => seq($.identifier, repeat(seq(token.immediate('/'), $.identifier))),

    enum: $ => seq(repeat1(seq($.identifier, token.immediate('/'))), field('value', $.identifier)),

    string: () => /".*"/,

    identifier: () => /[a-zA-Z_][a-zA-Z0-9_]*/,

    number: () => choice(
      /-?\d+/,
      /-?\d+.\d+/
    ),

    list: $ => seq(
      '[',
        make_list($._rValue),
      ']'
    ),

    tuple: $ => seq(
      '(',
        make_list($._rValue),
      ')'
    ),

    comment: () => token(seq('\#', /(\\+(.|\r?\n)|[^\\\n])*/))
  },

  // This and the comment regex were stolen from:
  // https://github.com/tree-sitter/tree-sitter-c/blob/master/grammar.js#L38
  extras: $ => [
    /\s|\\\r?\n/,
    $.comment
  ],

  conflicts: $ => [
    [$.type_name, $.enum],
    [$.type_name, $.variable],
  ],

});

