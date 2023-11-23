import { Statement, Program, Expression, BinaryExpression, NumericLiteral, Identifier } from "./ast"
import { tokenize, Token, TokenType } from "./lexer"

export default class Parser {
  private tokens: Token[] = []

  private notEof (): boolean {
    return this.tokens[0].type != TokenType.EOF
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

}