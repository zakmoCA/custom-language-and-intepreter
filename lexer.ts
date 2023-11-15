export enum TokenType {
  Number,
  Identifier,
  Equals,
  OpenParen, 
  CloseParen,
  BinaryOperator,
  Let,
  
}

export interface Token {
  value: string,
  type: TokenType
}

function token (value: string, type: TokenType): Token {
  return { value, type }
}

export function tokenize (sourceCode: string): Token[] {

  const operators = ['+', '-', '*', '/']

  const tokens = new Array<Token>()
  const src = sourceCode.split("")

  // build each token until end of file
  while (src.length > 0) {
    if (src[0] == "(") {
      tokens.push(token(src.shift()!, TokenType.OpenParen))
    } else if (src[0] == ")") {
      tokens.push(token(src.shift()!, TokenType.CloseParen))
    } else if (operators.includes(src[0])) {
      tokens.push(token(src.shift()!, TokenType.BinaryOperator))
    } else if (src[0] == '=') {
      tokens.push(token(src.shift()!, TokenType.Equals))
    } else {

      // handle multi-character tokens
    }
  }

  return tokens
}