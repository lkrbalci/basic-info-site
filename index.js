const http = require("http");
const url = require("url");
const fs = require("fs");

const htmlFiles = fs
  .readdirSync("./")
  .filter((file) => file.includes(".html"))
  .map((file) => file.replace(".html", ""));

let file = "";

http
  .createServer(function (req, res) {
    if (req.url === "/") {
      fs.readFile("index.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        console.log(req.url)
        res.write(data);
        return res.end();
      });
    } 
    if (htmlFiles.includes(req.url.replace("/", ""))) {
      fs.readFile(`${req.url.replace("/", "")}.html`, function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      })
    } 
    if (!htmlFiles.includes(req.url.replace("/", ""))) {
        fs.readFile("404.html", function (err, data) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
          });
    }
  })
  .listen(8030);
