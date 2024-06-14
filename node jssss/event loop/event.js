const fs = require("fs")

console.log("Program to be started");

fs.readFile("./stream/txtFile.txt", () => {
    console.log("File has been readed")

    setTimeout(() => {
        console.log("set time out to be called");
    }, 0)
    
    setImmediate(() => console.log("set Immediate to be called"))

    process.nextTick(()=>console.log("Next tick to be called"))
})


console.log("Program to be ended");
