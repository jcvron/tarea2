const http = require("http");
const fs = require("fs");
const path = require("path");

const directorio = __dirname;

const tipos = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8"
};

http.createServer((req, res) => {
  let ruta = decodeURIComponent(req.url.split("?")[0]);

  if (ruta === "/") ruta = "/index.html";

  const archivo = path.join(directorio, ruta);

  if (!archivo.startsWith(directorio + path.sep)) {
    res.writeHead(403);
    return res.end("Acceso denegado");
  }

  fs.readFile(archivo, (error, contenido) => {
    if (error) {
      res.writeHead(404);
      return res.end("Archivo no encontrado");
    }

    res.writeHead(200, {
      "Content-Type":
        tipos[path.extname(archivo)] || "application/octet-stream"
    });

    res.end(contenido);
  });

}).listen(process.env.PORT || 3000);
