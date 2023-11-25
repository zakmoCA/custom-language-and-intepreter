import { Statement, Program, Expression, BinaryExpression, NumericLiteral, Identifier } from "./ast"
import { tokenize, Token, TokenType } from "./lexer"

export default class Parser {
  private tokens: Token[] = []

  private notEof (): boolean {
    return this.tokens[0].type != TokenType.EOF
  }

  private at () {
    return this.tokens[0] as Token
  }

  private eat () {
    const prev = this.tokens.shift() as Token
    return prev
  }

  public produceAST (sourceCode: string): Program {
    this.tokens = tokenize(sourceCode)
    const program: Program = {
      kind: "Program",
      body: [],
    }

    // we want to keep parsing until end of file ofcourse
    // append every statement we find to body
    while (this.notEof()) {
      program.body.push(this.parseStatement())
    }

    return program
  }

  private parseStatement (): Statement {
    // no statements as of yet just expressions
    // skip to parseEexpression
    return this.parseExpression()
  }

  private parseExpression (): Expression {

  }

  private parsePrimaryExpression (): Expression {
    const tk = this.at().type

    switch (tk) {
      case TokenType.Identifier: 
        return { kind: "Identifier", symbol: this.eat().value } as Identifier
      case TokenType.Number:
        return { kind: "NumericLiteral", value: parseFloat(this.eat().value) } as NumericLiteral

      default:
        console.error("Unexpected token found during parsing!", this.at())
        process.exit(1)
    }
  }

}