const http = require("http")
const fs = require("fs")
const server = http.createServer()
server.listen(4000, () => {
    console.log("Server started");
})

// server.on("request", (req, res) => {
    //loads the whole data at once
    // fs.readFile("./txtFile.txt", (err, data) => {
    //     if (err) {
    //         res.end("Something went wrong")
    //         return
    //     }
    //     res.end(data)
    // })

    //read the data by piece by piece
    // let rs = fs.createReadStream("./txtFile.txt")
    // rs.on("data", (chunk) => {
    //     res.write(chunk)

    // })
    // rs.on("end", () => {
    //     res.end()
    // })
    // rs.on("error", (err) => {
    //     res.end(err.message)
    // })

// })

//pipe is used
server.on("request",(req,res)=>{
    let rs = fs.createReadStream("./txtFile.txt")
    rs.pipe(res)
})

