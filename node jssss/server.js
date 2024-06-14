const http = require("http")
const fs = require("fs")
const url = require("url")
const event = require("events")
const readJson = JSON.parse(fs.readFileSync("./files/products.json", "utf-8"))
const html = fs.readFileSync("./files/index.html", "utf-8")

function replacementArray(template, product) {
    let productHtml = template.replace("{{%%Name}}", product.name)
    productHtml = productHtml.replace("{{%%Price}}", product.price)
    productHtml = productHtml.replace("{{%%Model}}", product.model)
    productHtml = productHtml.replace("{{%%Year}}", product.releasedYear)
    return productHtml
}
// let productListArray=readJson.map((product) => {
//     let productHtml = html.replace("{{%%Name}}", product.name)
//     productHtml = productHtml.replace("{{%%Price}}", product.price)
//     productHtml = productHtml.replace("{{%%Model}}", product.model)
//     productHtml = productHtml.replace("{{%%Year}}", product.releasedYear)
//     return productHtml
// })


http.createServer((req, res) => {
    // let path = req.url.toLowerCase()
    let { query, pathname: path } = url.parse(req.url, true)
    if (path === "/" || path === "/home") {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("U are in Home page")
    }
    else if (path === "/about") {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("U are in About page")
    }
    else if (path === "/contact") {
        res.writeHead(200, { "Content-Type": "text/plain" })
        res.end("U are in Contact page")
    }
    else if (path === "/products") {
        let productListArray = readJson.map((prod) => {
            return replacementArray(html, prod)
        })
        if (!query.id) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(productListArray.join(","))
        }
        else {
            res.end()
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.end("Error 404 Page not found")
    }
}).listen(3000, () => {
    console.log("server started")
})

let myEmitter = new event.EventEmitter
myEmitter.on("CreateEvent", () => {
    console.log("Event created")
})
myEmitter.on("CreateEvent", () => {
    console.log("Event two created")
})
myEmitter.emit("CreateEvent")