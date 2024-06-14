module.exports = (request, response) => {
    if (request.url === "/getProducts") {
        response.statusCode = 200
        response.write("Products were get from server")
        response.end()
    }
    else {
        response.statusCode = 400
        response.write(`Cannot GET ${request.url} from the server.Enter valid Url`)
        response.end()
    }
}