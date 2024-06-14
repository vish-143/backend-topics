const http = require("http")
const url = require("url")
const dotenv = require('dotenv');
dotenv.config();
const urlLink = "Products"

const server = http.createServer((req, res) => {
    const urlPath = url.parse(req.url, true)
    //POST
    if (urlPath.pathname === `/add${urlLink}` && req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const response = {
            status: "Success",
            message: `${urlLink} were added to the server`,
            time: `API was hit at the time of ${new Date().toLocaleTimeString()}`
        }
        res.end(JSON.stringify(response));
    }
    //GET
    else if (urlPath.pathname === `/get${urlLink}` && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const response = {
            status: "Success",
            message: `${urlLink} were displayed from the server`,
            time: `API was hit at the time of ${new Date().toLocaleTimeString()}`
        }
        res.end(JSON.stringify(response));
    }
    //GET:id
    else if (urlPath.path === `/edit${urlLink}/${urlPath.search}` && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const response = {
            status: "Success",
            message: `Individual ${urlLink} displayed from the server`,
            time: `API was hit at the time of ${new Date().toLocaleTimeString()}`
        }
        res.end(JSON.stringify(response));
    }
    //PUT:id
    else if (urlPath.path === `/edit${urlLink}/${urlPath.search}` && req.method === 'PUT') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const response = {
            status: "Success",
            message: `${urlLink} was edited successfully`,
            time: `API was hit at the time of ${new Date().toLocaleTimeString()}`
        }
        res.end(JSON.stringify(response));
    }
    //DELETE:id
    else if (urlPath.path === `/edit${urlLink}/${urlPath.search}` && req.method === 'DELETE') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const response = {
            status: "Success",
            message: `${urlLink} was deleted successfully`,
            time: `API was hit at the time of ${new Date().toLocaleTimeString()}`
        }
        res.end(JSON.stringify(response));
    }
    //Global error handler
    // else {
    //     res.writeHead(404, { 'Content-Type': 'application/json' });
    //     const response = {
    //         status: "Fail",
    //         message: `Invalid url ${urlPath.pathname}`,
    //         time: `API was hit at the time of ${new Date().toLocaleTimeString()}`
    //     }
    //     res.end(JSON.stringify(response));
    // }
})

const PORT = process.env.PORT || 3002
server.listen(PORT, error => {
    error ? console.log(error) : console.log(`Server runs in the port of ${PORT}`);
})
