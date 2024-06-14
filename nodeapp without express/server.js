// const http = require("http")

// const server=http.createServer((req,res)=>{
//     if(req.url==="/addProducts"){
//         res.writeHead(200,{"Content-type":"text/plain"})
//         res.end("Products were added")
//     }else if(req.url==="/getProducts"){
//         res.writeHead(200,{"Content-type":"text/plain"})
//         res.end("Products were displayed")
//     }else if(req.url==="/getProducts/:id"){
//         res.writeHead(200,{"Content-type":"text/plain"})
//         res.end(`Individual Products were displayed from the id of ${id}`)
//     }else if(req.url==="/editProducts/:id"){
//         res.writeHead(200,{"Content-type":"text/plain"})
//         res.end("Products were edited")
//     }else if(req.url==="/deleteProducts/:id"){
//         res.writeHead(200,{"Content-type":"text/plain"})
//         res.end("Products were deleted")
//     }else{
//         res.writeHead(404,{"Content-type":"text/plain"})
//         res.end("Invalid Url Address")
//     }
// })

// const port=3002
// server.listen(port,()=>{
//     console.log(`Server runs from the port ${port}`);
// })


// Import http library
const http = require("http")
// use env variable to define port with default
const PORT = process.env.PORT || 3002

// Import our routers
const get = require("./get")
const post = require("./post")
const put = require("./put")
// add an extra R since delete is a reserved word
const deleteR = require("./delete")

//create our server object, pass server function as callback argument
const server = http.createServer((request, response) => {
  // handle request based on method then URL
  switch (request.method) {
    case "GET":
      get(request, response)
      break

    case "POST":
      post(request, response)
      break

    case "PUT":
      put(request, response)
      break

    case "DELETE":
      deleteR(request, response)
      break

    default:
      // Send response for requests with no other response
      response.statusCode = 400
      response.write("No Response")
      response.end()
  }
})

// get the server to start listening
server.listen(PORT, err => {
  // error checking
  err ? console.error(err) : console.log(`listening on port ${PORT}`)
})
