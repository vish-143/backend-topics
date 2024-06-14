const fs = require("fs")
let readContent = fs.readFileSync("./files/input.txt","utf8")
console.log(readContent)

let contentForOutput=`I can use the input file to write the content ${readContent} is created on ${new Date()}`
fs.writeFileSync("./files/input.txt",contentForOutput)
