//Synchronous action
const fs=require("fs")
let readFile=fs.readFileSync("./files/input.txt","utf-8")
console.log(readFile)
console.log("Synchronous action")

//Async action
const fs=require("fs")
fs.readFile("./files/input.txt","utf-8",(err,data)=>{
    console.log("data",data)
})
console.log("Synchronous action")