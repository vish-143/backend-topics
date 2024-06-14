const http=require("http")
const server=http.createServer((req,res)=>{
    res.writeHead(200,{"Content-type":"text/plain"})
    res.end("I'm from the server")
})

server.listen(8000,()=>{
    console.log("Server runs on the port number 8000")
})