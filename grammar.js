
function make_list(rule) {
  return seq(repeat(seq(rule, ',')), optional(rule))
}

module.exports = grammar({
  name: 'Bend',

  rules: {
    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.function_declaration,
      $.object_declaration,
      // $.type_declaration,
      $.assignment_operation,
      $.function_call,
    ),

    function_declaration: $ => seq(
      'def',
      field('name', $.identifier),
      optional(field('parameters', $.parameter_list)),
      field('body', $.block)
    ),


    parameter_list: $ => seq(
      '(',
        make_list($.identifier),
      ')'
    ),

    object_declaration: $ => seq(
      'object',
      $.object_details
    ),

    object_details: $ => seq(
      $.type_name,
      '{',
      make_list($.identifier),
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
      $.open
    ),

    assignment_operation: $ => prec.right(10, seq($.identifier, '=', $._rValue)),

    condition: $ => prec.right(100, seq(
      'if',
      $._rValue,
      $.block,
      optional(seq('else', $.block))
    )),

    return_statement: $ => seq(
      'return',
      $._rValue,
    ),

    _rValue: $ => prec(10, choice(
      $.variable,
      $.string,
      $.number,
      $.object_definition,
      seq('(', $._rValue, ')'),
      $._binaryOperation,
      $.function_call,
      $.list,
    )),

    function_call: $ => seq(
      field('name', $.identifier),
      '(',
      make_list($._rValue),
      ')',
    ),

    open: $ => seq(
      'open',
      $.type_name,
      ':',
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

    variable: $ => choice(
      $.identifier,
      seq(repeat1(seq($.identifier, token.immediate('.'))), $.identifier),
    ),

    match: $ => prec.right(seq(
      'match',
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
      prec.left(1, seq($._rValue, '==', $._rValue)),
      prec.left(1, seq($._rValue, '<', $._rValue)),
      prec.left(1, seq($._rValue, '<=', $._rValue)),
      prec.left(1, seq($._rValue, '>', $._rValue)),
      prec.left(1, seq($._rValue, '>=', $._rValue)),
      prec.right(3, seq($._rValue, '**', $._rValue)),
      prec.left(2, seq($._rValue, '%', $._rValue)),
      prec.left(2, seq($._rValue, '*', $._rValue)),
      prec.left(2, seq($._rValue, '/', $._rValue)),
      prec.left(1, seq($._rValue, '+', $._rValue)),
      prec.left(1, seq($._rValue, '-', $._rValue)),
    ),

    object_definition: $ => prec.right(seq(
     $.type_name,
      '{',
      make_list($.field_assignment),
      '}'
    )),

    field_assignment: $ => seq(
      $.identifier,
      ':',
      $._rValue,
    ),

    type_name: $ => seq(repeat(seq($.identifier, token.immediate('/'))),$.identifier),

    string: $ => /".*"/,

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    number: $ => choice(
      /-?\d+/,
      /-?\d+.\d+/
    ),

    list: $ => seq(
      '[',
        make_list($._rValue),
      ']'
    )
  }
});

