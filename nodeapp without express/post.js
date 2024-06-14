module.exports = (request, response) => {
    if (request.url === "/addProducts") {
        response.statusCode = 200
        response.write("Products were added")
        response.end()
    }
    else {
        response.statusCode = 400
        response.write(`Cannot POST ${request.url} to the server.Enter valid Url`)
        response.end()
    }
}