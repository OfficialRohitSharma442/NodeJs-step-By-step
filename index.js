const http = require("http");
const fs = require("fs");
const indexpage = fs.readFileSync('./index.html', 'utf-8');
const Products = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const Productsupdate = Products.products;

const server = http.createServer((req, res) => {
    // case '/products':
    // res.setHeader('Content-Type', 'text/html');

    // break
    console.log(req.url)
    if (req.url.startsWith("/products")) {
        let index = req.url.split("/")[2];
        let myProduct = Productsupdate.find(p => p.id == +index)
        const updatedindex = indexpage.replace(/\*\*(\w+)\*\*/g, (match, key) => myProduct[key] || match);
        res.end(updatedindex);
        return
    }
    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html')
            res.end(indexpage);
            break;
        case '/api':
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(Products))
            break;



        default:
            res.writeHead(404, "Not Found ");
            res.end();

    }

    // res.setHeader('Rohitsharma', 'Header')
    // res.setHeader('Content-Type', 'application/json')
})
server.listen(8080)