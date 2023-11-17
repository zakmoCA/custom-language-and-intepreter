export type NodeType = 
| "Program" 
| "NumericLiteral" 
| "Identifier" 
| "BinaryExpression"

// won't be returning values
export interface Statement {
  kind: NodeType
}

export interface Program extends Statement {
  kind: "Program",
  body: Statement[]
}