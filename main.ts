import Parser from "./parser"

repl()

function repl() {
  const parser = new Parser()
  console.log("\nRepl v0.1")

  while (true) {
    const input = prompt("> ")

    if (!input || input.includes("exit")) {
      process.exit(1)
    }

    const program = parser.produceAST(input)
    console.log(program)
  }
}