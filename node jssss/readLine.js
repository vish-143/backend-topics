const readline=require("readline")
const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
rl.question("Enter your name : ",(answer)=>{
    console.log("My name is " + answer)
    rl.close()
})
rl.on("close",()=>{
    console.log("Interface closed")
})