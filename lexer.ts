import * as fs from 'fs/promises'


export enum TokenType {
  Number,
  Identifier,
  Equals,
  OpenParen, 
  CloseParen,
  BinaryOperator,
  Let,
  EOF,
}

const KEYWORDS: Record<string, TokenType> = {
  "let": TokenType.Let
}

export interface Token {
  value: string,
  type: TokenType
}

function token (value: string, type: TokenType): Token {
  return { value, type }
}

function isAlpha (src: string) {
  return src.toUpperCase() != src.toLowerCase()
} 

function isInt (str: string) {
  const unicode_value = str.charCodeAt(0)
  const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)] // tuple containing unicode characters 0 and 9
  
  return (unicode_value >= bounds[0] && unicode_value <= bounds[1])
}

function isSkipable (str: string) {
  return str == ' ' || str == '\n' || str == '\t'
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

      // build number token
      if (isInt(src[0])) {
        let num = ''
        while (src.length > 0 && isInt(src[0])) {
          num += src.shift()
        }

        tokens.push(token(num, TokenType.Number))
      } else if (isAlpha(src[0])) {
        let ident = ''
        while (src.length > 0 && isAlpha(src[0])) {
          ident += src.shift()
        }

        // check for reserved keywords
        const reserved = KEYWORDS[ident]
        if (reserved == undefined) {
          tokens.push(token(ident, TokenType.Identifier))
        } else {
          tokens.push(token(ident, reserved))
        }
      } else if (isSkipable(src[0])) {
        src.shift() // skip the skippable char
      } else {
        console.log("Unrecognised character found in source: ", src[0])
      }
    }
  }

  tokens.push({ type: TokenType.EOF, value: "EndOfFile" })
  return tokens
}

async function readTextFile(filePath: string) {
  try {
      const data = await fs.readFile(filePath, 'utf-8')
      console.log(data)
      for (const token of tokenize(data)) {
        console.log(token)
      }
  } catch (err) {
      console.error('Error reading file:', err)
  }
}

readTextFile('./test.txt')



// const source = await Deno.readTextFile("./test.txt")
// for (const token of tokenize(source)) {
//   console.log(token)
// }

