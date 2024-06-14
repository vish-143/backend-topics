module.exports = (request, response) => {
    if (request.url === `/editProducts/id`) {
        response.statusCode = 200
        response.write("Product edited successfully")
        response.end()
    }
    else {
        response.statusCode = 400
        response.write(`Cannot EDIT ${request.url} from the server.Enter valid Url`)
        response.end()
    }
}